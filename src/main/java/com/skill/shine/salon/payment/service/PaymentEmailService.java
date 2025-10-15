package com.skill.shine.salon.payment.service;

import com.skill.shine.salon.payment.model.PaymentMethod;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.time.format.DateTimeFormatter;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class PaymentEmailService {

    private final JavaMailSender mailSender;

    @Value("${spring.mail.properties.mail.smtp.from}")
    private String fromEmail;

    public void sendPaymentSuccessEmail(
            String toEmail,
            String name,
            Double amount,
            LocalDateTime paymentDateTime,
            PaymentMethod method
    ) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(fromEmail);
            message.setTo(toEmail);
            message.setSubject("Payment Confirmation - Silk&Shine Booking");

            // Format payment date & time
            DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
            DateTimeFormatter timeFormatter = DateTimeFormatter.ofPattern("hh:mm a");

            String paymentDate = paymentDateTime.format(dateFormatter);
            String paymentTime = paymentDateTime.format(timeFormatter);

            message.setText(
                    "Dear " + name + ",\n\n" +
                            "Your payment of Rs: " + amount + " was successful.\n\n" +
                            "Payment Details:\n" +
                            "Payment Date: " + paymentDate + "\n" +
                            "Payment Time: " + paymentTime + "\n" +
                            "Payment Type: " + method + "\n\n" +
                            "Thank you for booking with Silk&Shine!\n\n" +
                            "Silk&Shine Team"
            );

            mailSender.send(message);
            System.out.println("Payment email sent to " + toEmail);

        } catch (Exception e) {
            System.err.println("Failed to send payment email: " + e.getMessage());
            e.printStackTrace();
        }
    }
}
