package com.skill.shine.salon.salary.dto;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class StaffSalaryRequest {
    private String staffId;
    private Double dailyPayment;
    private Integer workingDays;
    private Double bonus;
    private Double etfPercentage;
    private Double epfPercentage;
    private Integer month;
    private Integer year;
    private String notes;

}
