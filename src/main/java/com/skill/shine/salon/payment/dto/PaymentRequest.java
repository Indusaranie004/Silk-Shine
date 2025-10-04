package com.skill.shine.salon.payment.dto;

import com.skill.shine.salon.payment.model.PaymentMethod;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PaymentRequest {
    private Long bookingId;
    private String userId; // new
    private PaymentMethod method;
    private String cardNumber;   // only for CARD
    private String cardHolder;   // only for CARD
    private String expiry;       // only for CARD
}


