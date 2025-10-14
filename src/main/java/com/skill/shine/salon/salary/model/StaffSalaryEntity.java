package com.skill.shine.salon.salary.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "tbl_staff_salaries")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class StaffSalaryEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String staffId;          // Unique staff identifier (string)

    private Double dailyPayment;     // Daily wage
    private Integer workingDays;     // Worked days in month
    private Double bonus;            // Bonus

    private Double etfPercentage;    // ETF % (e.g., 3%)
    private Double epfPercentage;    // EPF % (e.g., 8%)

    private Integer month;           // Month (1-12)
    private Integer year;            // Year

    private Double totalSalary;      // Total salary (dailyPayment * workingDays + bonus)
    private Double etfAmount;        // ETF amount
    private Double epfAmount;        // EPF amount


    private String notes;
    private LocalDate createdAt;
}
