package com.skill.shine.salon.dashboard.controller;

import com.skill.shine.salon.dashboard.dto.DashboardSummaryResponse;
import com.skill.shine.salon.dashboard.dto.IncomeTrendResponse;
import com.skill.shine.salon.dashboard.service.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/dashboard")
@RequiredArgsConstructor
public class DashboardController {

    private final DashboardService dashboardService;

    /** SUMMARY: Total Services, Bookings, Income */
    @GetMapping("/summary")
    public ResponseEntity<DashboardSummaryResponse> getSummary() {
        return ResponseEntity.ok(dashboardService.getDashboardSummary());
    }

    /** LINE GRAPH DATA: Income over Time */
    @GetMapping("/income-trend")
    public ResponseEntity<List<IncomeTrendResponse>> getIncomeTrend(
            @RequestParam(defaultValue = "month") String filter) {
        return ResponseEntity.ok(dashboardService.getIncomeTrend(filter));
    }
}
