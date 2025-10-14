package com.skill.shine.salon.payment.repository;

import com.skill.shine.salon.payment.model.PaymentEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PaymentRepository extends JpaRepository<PaymentEntity, Long> {
    List<PaymentEntity> findByBooking_Id(Long bookingId);

    List<PaymentEntity> findByUserId(String userId);


}

