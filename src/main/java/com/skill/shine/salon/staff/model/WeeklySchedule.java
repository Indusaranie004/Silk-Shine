package com.skill.shine.salon.staff.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Entity
public class WeeklySchedule {
    @Id
    @GeneratedValue
    private Long id;

    private LocalDate weekStartDate;
    private Long createdByAdminId;
    private LocalDateTime createdAt;

    @OneToMany(mappedBy = "weeklySchedule")
    private List<StaffAvailability> staffAvailabilities;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getWeekStartDate() {
        return weekStartDate;
    }

    public void setWeekStartDate(LocalDate weekStartDate) {
        this.weekStartDate = weekStartDate;
    }

    public Long getCreatedByAdminId() {
        return createdByAdminId;
    }

    public void setCreatedByAdminId(Long createdByAdminId) {
        this.createdByAdminId = createdByAdminId;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public List<StaffAvailability> getStaffAvailabilities() {
        return staffAvailabilities;
    }

    public void setStaffAvailabilities(List<StaffAvailability> staffAvailabilities) {
        this.staffAvailabilities = staffAvailabilities;
    }
}
