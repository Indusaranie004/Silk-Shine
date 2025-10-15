package com.skill.shine.salon.payment.service;

import com.skill.shine.salon.booking.model.BookingEntity;
import com.skill.shine.salon.booking.repository.BookingRepository;
import com.skill.shine.salon.payment.dto.*;
import com.skill.shine.salon.payment.model.*;
import com.skill.shine.salon.payment.repository.PaymentRepository;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class PaymentService {

    private final PaymentRepository paymentRepository;
    private final BookingRepository bookingRepository;
    private final PaymentEmailService emailService;
    private final PaymentEmailService paymentEmailService;

    /** CREATE PAYMENT */
    public PaymentResponse createPayment(PaymentRequest request) {
        BookingEntity booking = bookingRepository.findById(request.getBookingId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Booking not found"));

        LocalDateTime now = LocalDateTime.now();
        PaymentEntity payment = PaymentEntity.builder()
                .booking(booking)
                .userId(request.getUserId() != null ? request.getUserId() : booking.getUserId())
                .method(request.getMethod())
                .status(PaymentStatus.SUCCESS)
                .amount(booking.getPrice())
                .transactionId(UUID.randomUUID().toString())
                .paymentDate(now)
                .cardLast4(request.getMethod() == PaymentMethod.CARD
                        ? request.getCardNumber().substring(request.getCardNumber().length() - 4)
                        : null)
                .build();

        paymentRepository.save(payment);

        // Send email with only payment details
        paymentEmailService.sendPaymentSuccessEmail(
                booking.getEmail(),
                booking.getName(),
                payment.getAmount(),
                payment.getPaymentDate(),
                payment.getMethod()
        );

        return mapToResponse(payment);
    }



    /** GET PAYMENT BY ID */
    public PaymentResponse getPayment(Long id) {
        PaymentEntity payment = paymentRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Payment not found"));
        return mapToResponse(payment);
    }

    /** GET ALL PAYMENTS FOR A BOOKING */
    public List<PaymentResponse> getPaymentsByBooking(Long bookingId) {
        List<PaymentEntity> payments = paymentRepository.findByBooking_Id(bookingId);
        if (payments.isEmpty()) throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No payments found for booking");
        return payments.stream().map(this::mapToResponse).toList();
    }

    /** GET ALL PAYMENTS */
    public List<PaymentResponse> getAllPayments() {
        return paymentRepository.findAll().stream().map(this::mapToResponse).toList();
    }

    /** GET ALL UserID */
    public List<PaymentResponse> getPaymentsByUser(String userId) {
        List<PaymentEntity> payments = paymentRepository.findByUserId(userId);
        if (payments.isEmpty()) throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No payments found for user");
        return payments.stream().map(this::mapToResponse).toList();
    }



    /** DELETE PAYMENT */
    public void deletePayment(Long id) {
        paymentRepository.deleteById(id);
    }



    private PaymentResponse mapToResponse(PaymentEntity p) {
        return PaymentResponse.builder()
                .id(p.getId())
                .bookingId(p.getBooking().getId())
                .userId(p.getUserId()) // new
                .bookingName(p.getBooking().getName())
                .email(p.getBooking().getEmail())
                .amount(p.getAmount())
                .method(p.getMethod())
                .status(p.getStatus().toString())
                .transactionId(p.getTransactionId())
                .paymentDate(p.getPaymentDate().toString())
                .build();
    }
}
