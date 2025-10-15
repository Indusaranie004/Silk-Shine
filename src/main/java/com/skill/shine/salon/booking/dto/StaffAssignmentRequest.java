package com.skill.shine.salon.booking.dto;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder




public class StaffAssignmentRequest {
    private Long bookingId;
    private Long staffId;



}
