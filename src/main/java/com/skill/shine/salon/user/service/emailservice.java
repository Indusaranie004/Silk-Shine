package com.skill.shine.salon.user.service;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class emailservice {

    private final JavaMailSender mailSender;

    @Value("${spring.mail.properties.mail.smtp.from}")
    private String fromEmail;

    public void sendWelcomeEmail(String toEmail, String name){

        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(fromEmail);
        message.setTo(toEmail);
        message.setSubject("Welcome to Silk&Shine !");
        message.setText(String.format(
                "Dear %s,\n\n" +
                        "Welcome to Silk&Shine - Where Beauty Meets Excellence!\n\n" +
                        "Thank you for joining Silk&Shine family. We're excited to help you look and feel your absolute best.\n\n" +
                        "Our expert stylists are ready to provide you with premium hair care, styling, and beauty services in a relaxing environment.\n\n" +
                        "We look forward to be serving you soon!\n\n" +
                        "Best regards,\n" +
                        "The Silk&Shine Team", name));

        mailSender.send(message);
    }

}
