package com.skill.shine.salon.staff.dto;

import java.time.LocalDate;
import java.util.List;

public class WeeklyScheduleResponse {
    private Long scheduleId;
    private LocalDate weekStartDate;
    private List<DailyScheduleResponse> dailySchedules;

    // getters/setters


    public Long getScheduleId() {
        return scheduleId;
    }

    public void setScheduleId(Long scheduleId) {
        this.scheduleId = scheduleId;
    }

    public LocalDate getWeekStartDate() {
        return weekStartDate;
    }

    public void setWeekStartDate(LocalDate weekStartDate) {
        this.weekStartDate = weekStartDate;
    }

    public List<DailyScheduleResponse> getDailySchedules() {
        return dailySchedules;
    }

    public void setDailySchedules(List<DailyScheduleResponse> dailySchedules) {
        this.dailySchedules = dailySchedules;
    }
}