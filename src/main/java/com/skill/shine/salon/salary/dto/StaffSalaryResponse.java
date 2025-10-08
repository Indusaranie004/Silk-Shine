package com.skill.shine.salon.salary.dto;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class StaffSalaryResponse {
    private Long id;
    private String staffId;
    private Double dailyPayment;
    private Integer workingDays;
    private Double bonus;
    private Double etfPercentage;
    private Double epfPercentage;
    private Integer month;
    private Integer year;
    private Double totalSalary;
    private Double etfAmount;
    private Double epfAmount;
    private String notes;

}
