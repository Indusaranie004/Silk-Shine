package com.skill.shine.salon.dashboard.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class IncomeTrendResponse {

    private String label;       // e.g. "2025-10-08" or "OCTOBER" or "2025"
    private double totalAmount; // Sum of all payments for that date/month/year
}
