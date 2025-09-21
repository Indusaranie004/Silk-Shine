package com.skill.shine.salon.booking.dto;

import com.skill.shine.salon.booking.model.AssignmentStatus;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class BookingResponse {
    private Long id;
    private String userId;
    private Long serviceId;
    private String name;
    private String email;
    private String phone;
    private String address;
    private String gender;
    private String date;
    private String time;
    private Double price;

    // Add these fields to BookingResponse
    private Long assignedStaffId;
    private String assignedStaffName;
    private AssignmentStatus assignmentStatus;

    // In BookingResponse class - add this method if missing
    public void setAssignedStaffName(String assignedStaffName) {
        this.assignedStaffName = assignedStaffName;
    }








}

