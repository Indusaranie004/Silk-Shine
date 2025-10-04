package com.skill.shine.salon.payment.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "tbl_payments")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PaymentEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /** Link to booking (allow multiple payments) */
    @ManyToOne
    @JoinColumn(name = "booking_id", nullable = false)
    private com.skill.shine.salon.booking.model.BookingEntity booking;

    @Enumerated(EnumType.STRING)
    private PaymentMethod method; // CASH, CARD, ONLINE

    @Enumerated(EnumType.STRING)
    private PaymentStatus status; // PENDING, SUCCESS, FAILED, REFUNDED

    private Double amount; // Same as booking price
    private String transactionId; // For card/online payments
    private LocalDateTime paymentDate;

    // Add userId directly for easier query
    private String userId;
    // Card Details (only store minimal non-sensitive info!)
    private String cardLast4;  // Store only last 4 digits for security
}
