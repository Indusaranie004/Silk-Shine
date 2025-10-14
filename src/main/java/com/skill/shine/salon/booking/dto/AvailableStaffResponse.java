package com.skill.shine.salon.booking.dto;
import lombok.*;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder



public class AvailableStaffResponse {

    private Long bookingId;
    private String serviceType;
    private String bookingDate;
    private String bookingTime;
    private List<StaffSummaryDto> availableStaff;





}
