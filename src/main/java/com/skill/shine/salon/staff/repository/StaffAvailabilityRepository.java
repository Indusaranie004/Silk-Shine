package com.skill.shine.salon.staff.repository;

import com.skill.shine.salon.staff.model.StaffAvailability;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface StaffAvailabilityRepository extends JpaRepository<StaffAvailability, Long> {
    List<StaffAvailability> findByWeeklyScheduleId(Long weeklyScheduleId);
    List<StaffAvailability> findByStaffIdAndWeeklySchedule_WeekStartDate(Long staffId, LocalDate weekStart);

    @Query("SELECT COUNT(sa) FROM StaffAvailability sa WHERE sa.staff.id = :staffId AND sa.weeklySchedule.weekStartDate = :weekStart")
    int countWorkingDaysByStaffAndWeek(@Param("staffId") Long staffId, @Param("weekStart") LocalDate weekStart);

    @Query("SELECT sa FROM StaffAvailability sa WHERE sa.staff.id = :staffId AND sa.weeklySchedule.weekStartDate >= :weekStart ORDER BY sa.weeklySchedule.weekStartDate DESC, sa.dayOfWeek ASC")
    List<StaffAvailability> findRecentSchedulesByStaff(@Param("staffId") Long staffId, @Param("weekStart") LocalDate weekStart);

    @Query("SELECT sa FROM StaffAvailability sa WHERE sa.weeklySchedule.weekStartDate = :weekStart AND sa.dayOfWeek = :dayOfWeek")
    List<StaffAvailability> findByWeeklySchedule_WeekStartDateAndDayOfWeek(
            @Param("weekStart") LocalDate weekStart,
            @Param("dayOfWeek") Integer dayOfWeek
    );





}
