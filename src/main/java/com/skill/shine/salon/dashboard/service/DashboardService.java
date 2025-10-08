package com.skill.shine.salon.dashboard.service;

import com.skill.shine.salon.dashboard.dto.DashboardSummaryResponse;
import com.skill.shine.salon.dashboard.dto.IncomeTrendResponse;

import java.util.List;

public interface DashboardService {
    DashboardSummaryResponse getDashboardSummary();
    List<IncomeTrendResponse> getIncomeTrend(String filter);
}
