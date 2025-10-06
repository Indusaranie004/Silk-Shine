package com.skill.shine.salon.promotion.dto;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder


public class PromotionalMessageRequest {


    private String title;
    private String content;
    private String targetAudience; // "ALL_CLIENTS" or "SINGLE_CLIENT:{userId}"





}
