package com.skill.shine.salon.booking.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "tbl_bookings")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class BookingEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String userId;   // logged-in user
    private Long serviceId;  // booked service

    private String name;
    private String email;
    private String phone;
    private String address;
    private String gender;   // MALE / FEMALE
    private String date;     // yyyy-MM-dd
    private String time;     // HH:mm

    private Double price;    // service price at booking time

    // Add this field to BookingEntity
    @Column(name = "assigned_staff_id")
    private Long assignedStaffId;

    @Column(name = "assignment_status")
    @Enumerated(EnumType.STRING)
    private AssignmentStatus assignmentStatus = AssignmentStatus.UNASSIGNED;

    // Add getters and setters

    public Long getAssignedStaffId() { return assignedStaffId; }
    public void setAssignedStaffId(Long assignedStaffId) { this.assignedStaffId = assignedStaffId; }

    public AssignmentStatus getAssignmentStatus() { return assignmentStatus; }
    public void setAssignmentStatus(AssignmentStatus assignmentStatus) { this.assignmentStatus = assignmentStatus; }





}
