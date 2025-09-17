package com.skill.shine.salon.staff.dto;

public class StaffSummary {
    private Long staffId;
    private String fullName;
    private String employeeId;

    // Fixed constructor - now actually assigns the values!
    public StaffSummary(Long id, String name, String employeeId) {
        this.staffId = id;
        this.fullName = name;
        this.employeeId = employeeId;
    }

    // Default constructor for Jackson serialization
    public StaffSummary() {
    }

    public Long getStaffId() {
        return staffId;
    }

    public void setStaffId(Long staffId) {
        this.staffId = staffId;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(String employeeId) {
        this.employeeId = employeeId;
    }
}