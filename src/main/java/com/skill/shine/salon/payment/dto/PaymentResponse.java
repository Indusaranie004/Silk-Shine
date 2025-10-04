package com.skill.shine.salon.payment.dto;

import com.skill.shine.salon.payment.model.PaymentMethod;
import lombok.*;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PaymentResponse {
    private Long id;
    private Long bookingId;
    private String userId; // new
    private String bookingName;
    private String email;
    private Double amount;
    private PaymentMethod method;
    private String status;
    private String transactionId;
    private String paymentDate;
}
