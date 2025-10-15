package com.skill.shine.salon.booking.repository;

import com.skill.shine.salon.booking.model.AssignmentStatus;
import com.skill.shine.salon.booking.model.BookingEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookingRepository extends JpaRepository<BookingEntity, Long> {
    List<BookingEntity> findByUserId(String userId);
    List<BookingEntity> findByAssignedStaffId(Long staffId);
    List<BookingEntity> findByAssignmentStatus(AssignmentStatus status);



}


