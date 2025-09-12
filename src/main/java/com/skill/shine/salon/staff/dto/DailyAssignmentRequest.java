package com.skill.shine.salon.staff.dto;

import com.skill.shine.salon.staff.model.SpecializationType;

import java.time.LocalTime;
import java.util.Map;

public class DailyAssignmentRequest {
    private Integer dayOfWeek;
    private LocalTime startTime;
    private LocalTime endTime;
    private Integer slotDurationMinutes;
    private Map<SpecializationType, Long> staffAssignments; // specialization -> staffId

    public Integer getDayOfWeek() {
        return dayOfWeek;
    }

    public void setDayOfWeek(Integer dayOfWeek) {
        this.dayOfWeek = dayOfWeek;
    }

    public LocalTime getStartTime() {
        return startTime;
    }

    public void setStartTime(LocalTime startTime) {
        this.startTime = startTime;
    }

    public LocalTime getEndTime() {
        return endTime;
    }

    public void setEndTime(LocalTime endTime) {
        this.endTime = endTime;
    }

    public Integer getSlotDurationMinutes() {
        return slotDurationMinutes;
    }

    public void setSlotDurationMinutes(Integer slotDurationMinutes) {
        this.slotDurationMinutes = slotDurationMinutes;
    }

    public Map<SpecializationType, Long> getStaffAssignments() {
        return staffAssignments;
    }

    public void setStaffAssignments(Map<SpecializationType, Long> staffAssignments) {
        this.staffAssignments = staffAssignments;
    }
}
