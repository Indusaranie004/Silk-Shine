//Base Login Backend

package com.skill.shine.salon.user.service;

import com.skill.shine.salon.user.dto.ForgotPasswordRequest;
import com.skill.shine.salon.user.dto.LoginRequest;
import com.skill.shine.salon.user.dto.LoginResponse;
import com.skill.shine.salon.user.dto.ResetPasswordRequest;
import com.skill.shine.salon.user.model.UserEntity;
import com.skill.shine.salon.user.repositary.UserRepositary;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;

import java.time.Instant;
import java.util.Random;


@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepositary userRepositary;
    private final PasswordEncoder passwordEncoder;
    private final JavaMailSender mailSender; // ✅ inject mail sender

    // Login
    public LoginResponse login(LoginRequest request) {
        UserEntity user = userRepositary.findByEmail(request.getEmail())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Incorrect email or password"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Incorrect email or password");
        }

        String redirectUrl;
        String welcomeMessage;

        switch (user.getRole()) {
            case "ADMIN" -> {
                redirectUrl = "/admin/home";
                welcomeMessage = "Welcome to Admin Home Page!";
            }
            case "STAFF" -> {
                redirectUrl = "/staff/home";
                welcomeMessage = "Welcome to Staff Home Page!";
            }
            case "CLIENT" -> {
                redirectUrl = "/client/home";
                welcomeMessage = "Welcome to Client Home Page!";
            }
            default -> throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Unknown role");
        }

        return LoginResponse.builder()
                .userId(user.getUserId())
                .name(user.getName())
                .email(user.getEmail())
                .role(user.getRole())
                .redirectUrl(redirectUrl)
                .welcomeMessage(welcomeMessage)
                .build();
    }

    // Forgot Password (send OTP)
    public void sendResetOtp(ForgotPasswordRequest request) {
        UserEntity user = userRepositary.findByEmail(request.getEmail())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));

        String otp = String.format("%06d", new Random().nextInt(999999));
        long expiry = Instant.now().getEpochSecond() + 600; // 10 minutes

        user.setResetOtp(otp);
        user.setResetOtpExpireAt(expiry);
        userRepositary.save(user);

        // Send email
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("cikhewa@gmail.com"); // Must match verified sender in Brevo
        message.setTo(user.getEmail());
        message.setSubject("Password Reset OTP");
        message.setText("Hello " + user.getName() + ",\n\nYour OTP is: " + otp + "\n\nValid for 10 minutes.");

        mailSender.send(message); // ✅ this actually sends the email
    }

    // Reset Password
    public void resetPassword(ResetPasswordRequest request) {
        UserEntity user = userRepositary.findByEmail(request.getEmail())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));

        long now = Instant.now().getEpochSecond();

        if (user.getResetOtp() == null || !user.getResetOtp().equals(request.getOtp())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid OTP");
        }
        if (user.getResetOtpExpireAt() < now) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "OTP expired");
        }

        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        user.setResetOtp(null);
        user.setResetOtpExpireAt(0L);
        userRepositary.save(user);
    }


}
