package com.skill.shine.salon.staff.repository;

import com.skill.shine.salon.staff.model.WeeklySchedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface WeeklyScheduleRepository extends JpaRepository<WeeklySchedule, Long> {
    Optional<WeeklySchedule> findByWeekStartDate(LocalDate weekStartDate);
    List<WeeklySchedule> findByWeekStartDateBetween(LocalDate startDate, LocalDate endDate);
}