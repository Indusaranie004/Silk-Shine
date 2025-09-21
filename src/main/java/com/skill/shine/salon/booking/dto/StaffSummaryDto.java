package com.skill.shine.salon.booking.dto;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder

public class StaffSummaryDto {


    private Long staffId;
    private String fullName;
    private String employeeId;
    private String specialization;


}
