package com.skill.shine.salon.promotion.dto;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder



public class PromotionalMessageResponse {

    private Long id;
    private String title;
    private String content;
    private String targetAudience;

    private String sentAt;
    private boolean sentSuccessfully;




}
