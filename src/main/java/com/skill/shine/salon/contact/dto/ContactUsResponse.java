package com.skill.shine.salon.contact.dto;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ContactUsResponse {
    private Long id;
    private String name;
    private String email;
    private String phoneNumber;
    private String description;
    private String submittedAt;
}
