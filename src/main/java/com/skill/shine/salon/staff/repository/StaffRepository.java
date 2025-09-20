// src/main/java/com/skill/shine/salon/staff/repository/StaffRepository.java
package com.skill.shine.salon.staff.repository;

import com.skill.shine.salon.staff.model.StaffModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface StaffRepository extends JpaRepository<StaffModel, Long> {
    Optional<StaffModel> findByUserId(Long userId);
    List<StaffModel> findByIsActiveTrue();
}