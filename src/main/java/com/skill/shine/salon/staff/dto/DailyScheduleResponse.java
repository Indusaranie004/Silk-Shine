package com.skill.shine.salon.staff.dto;

import com.skill.shine.salon.staff.model.SpecializationType;

import java.time.LocalTime;
import java.util.Map;

public class DailyScheduleResponse {
    private Integer dayOfWeek;
    private String dayName;
    private LocalTime startTime;
    private LocalTime endTime;
    private Integer slotDurationMinutes;
    private boolean isWorkingDay;

    private Map<SpecializationType, Long> staffAssignments;
    private SpecializationType specializationType;
    private StaffSummary staffInfo;

    public Integer getDayOfWeek() {
        return dayOfWeek;
    }

    public void setDayOfWeek(Integer dayOfWeek) {
        this.dayOfWeek = dayOfWeek;
    }

    public String getDayName() {
        return dayName;
    }

    public void setDayName(String dayName) {
        this.dayName = dayName;
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

    public boolean isWorkingDay() {
        return isWorkingDay;
    }

    public void setWorkingDay(boolean workingDay) {
        isWorkingDay = workingDay;
    }

    public Map<SpecializationType, Long> getStaffAssignments() {
        return staffAssignments;
    }

    public void setStaffAssignments(Map<SpecializationType, Long> staffAssignments) {
        this.staffAssignments = staffAssignments;
    }

    public SpecializationType getSpecializationType() {
        return specializationType;
    }

    public void setSpecializationType(SpecializationType specializationType) {
        this.specializationType = specializationType;
    }

    public StaffSummary getStaffInfo() {
        return staffInfo;
    }

    public void setStaffInfo(StaffSummary staffInfo) {
        this.staffInfo = staffInfo;
    }
}
