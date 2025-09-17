package com.skill.shine.salon.staff.dto;

import java.time.LocalDate;
import java.util.List;

public class WeeklyScheduleRequest {
    private LocalDate weekStartDate;
    private List<DailyAssignmentRequest> dailyAssignments;

    public LocalDate getWeekStartDate() {
        return weekStartDate;
    }

    public void setWeekStartDate(LocalDate weekStartDate) {
        this.weekStartDate = weekStartDate;
    }

    public List<DailyAssignmentRequest> getDailyAssignments() {
        return dailyAssignments;
    }

    public void setDailyAssignments(List<DailyAssignmentRequest> dailyAssignments) {
        this.dailyAssignments = dailyAssignments;
    }
}
