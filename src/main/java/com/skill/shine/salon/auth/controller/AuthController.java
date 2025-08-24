//Base Login Backend

package com.skill.shine.salon.auth.controller;

import com.skill.shine.salon.user.dto.ForgotPasswordRequest;
import com.skill.shine.salon.user.dto.LoginRequest;
import com.skill.shine.salon.user.dto.LoginResponse;
import com.skill.shine.salon.user.dto.ResetPasswordRequest;
import com.skill.shine.salon.user.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;

    // ------------------- LOGIN -------------------

    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest request) {
        return authService.login(request);
    }

    // ------------------- FORGOT PASSWORD -------------------
    @PostMapping("/forgot-password")
    public ResponseEntity<String> forgotPassword(@RequestBody ForgotPasswordRequest request) {
        authService.sendResetOtp(request);
        return ResponseEntity.ok("OTP sent to your email");
    }

    // ------------------- RESET PASSWORD -------------------
    @PostMapping("/reset-password")
    public ResponseEntity<String> resetPassword(@RequestBody ResetPasswordRequest request) {
        authService.resetPassword(request);
        return ResponseEntity.ok("Password reset successfully");
    }

}
