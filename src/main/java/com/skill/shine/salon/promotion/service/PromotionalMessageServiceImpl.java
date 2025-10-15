package com.skill.shine.salon.promotion.service;

import com.skill.shine.salon.promotion.dto.PromotionalMessageRequest;
import com.skill.shine.salon.promotion.dto.PromotionalMessageResponse;
import com.skill.shine.salon.promotion.model.PromotionalMessage;
import com.skill.shine.salon.promotion.repository.PromotionalMessageRepository;
import com.skill.shine.salon.user.model.UserEntity;
import com.skill.shine.salon.user.repositary.UserRepositary;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor


public class PromotionalMessageServiceImpl implements PromotionalMessageService {


    private final PromotionalMessageRepository messageRepository;
    private final UserRepositary userRepository;
    private final JavaMailSender mailSender;

    @Override
    @Transactional
    public PromotionalMessageResponse sendPromotionalMessage(PromotionalMessageRequest request) {
        // Create message without admin ID
        PromotionalMessage message = PromotionalMessage.builder()
                .title(request.getTitle())
                .content(request.getContent())
                .targetAudience(request.getTargetAudience())
                .sentAt(LocalDateTime.now())
                .sentSuccessfully(false)
                .build();

        message = messageRepository.save(message);

        try {
            List<String> emails = getRecipientEmails(request.getTargetAudience());
            for (String email : emails) {
                sendEmail(email, request.getTitle(), request.getContent());
            }
            message.setSentSuccessfully(true);
            messageRepository.save(message);
        } catch (Exception e) {
            System.err.println("Email failed: " + e.getMessage());
        }

        return PromotionalMessageResponse.builder()
                .id(message.getId())
                .title(message.getTitle())
                .content(message.getContent())
                .targetAudience(message.getTargetAudience())
                .sentAt(message.getSentAt().toString())
                .sentSuccessfully(message.isSentSuccessfully())
                .build();
    }

    private List<String> getRecipientEmails(String target) {
        if ("ALL_CLIENTS".equals(target)) {
            return userRepository.findClientEmails();
        } else if (target.startsWith("SINGLE_CLIENT:")) {
            String userId = target.split(":")[1];
            Optional<UserEntity> userOpt = userRepository.findUserByUserId(userId);
            if (userOpt.isPresent()) {
                return List.of(userOpt.get().getEmail());
            } else {
                throw new RuntimeException("User not found with ID: " + userId);
            }
        }
        throw new IllegalArgumentException("Invalid target audience: " + target);
    }

    private void sendEmail(String to, String subject, String content) {
        SimpleMailMessage msg = new SimpleMailMessage();
        msg.setTo(to);
        msg.setSubject(subject);
        msg.setText(content);
        msg.setFrom("cikhewa@gmail.com");
        mailSender.send(msg);
    }


    @Override
    public List<PromotionalMessageResponse> getAllPromotionalMessages() {
        return messageRepository.findAll()
                .stream()
                .map(msg -> PromotionalMessageResponse.builder()
                        .id(msg.getId())
                        .title(msg.getTitle())
                        .content(msg.getContent())
                        .targetAudience(msg.getTargetAudience())
                        .sentAt(msg.getSentAt().toString())
                        .sentSuccessfully(msg.isSentSuccessfully())
                        .build())
                .toList();
    }

    @Override
    public void deletePromotionalMessage(Long id) {
        if (!messageRepository.existsById(id)) {
            throw new RuntimeException("Promotional message not found with ID: " + id);
        }
        messageRepository.deleteById(id);
    }




}
