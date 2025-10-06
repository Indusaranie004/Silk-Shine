package com.skill.shine.salon.promotion.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "tbl_promotional_messages")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor



public class PromotionalMessage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String content;
    private String targetAudience;



    @Column(name = "sent_at")
    private LocalDateTime sentAt;

    private boolean sentSuccessfully;






}
