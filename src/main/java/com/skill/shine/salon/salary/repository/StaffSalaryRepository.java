package com.skill.shine.salon.salary.repository;

import com.skill.shine.salon.salary.model.StaffSalaryEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface StaffSalaryRepository extends JpaRepository<StaffSalaryEntity, Long> {
    List<StaffSalaryEntity> findByStaffId(String staffId);
    Optional<StaffSalaryEntity> findByStaffIdAndMonthAndYear(String staffId, Integer month, Integer year);
}
