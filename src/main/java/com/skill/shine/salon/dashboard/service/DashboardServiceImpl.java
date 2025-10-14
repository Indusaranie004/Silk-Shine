package com.skill.shine.salon.dashboard.service;

import com.skill.shine.salon.booking.repository.BookingRepository;
import com.skill.shine.salon.dashboard.dto.DashboardSummaryResponse;
import com.skill.shine.salon.dashboard.dto.IncomeTrendResponse;
import com.skill.shine.salon.payment.model.PaymentEntity;
import com.skill.shine.salon.payment.repository.PaymentRepository;
import com.skill.shine.salon.services.repository.ServiceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.format.TextStyle;
import java.util.*;
import java.util.stream.Collectors;
import java.time.LocalDate;
import java.time.Month;
import java.util.Locale;

@Service
@RequiredArgsConstructor
public class DashboardServiceImpl implements DashboardService {

    private final ServiceRepository serviceRepository;
    private final BookingRepository bookingRepository;
    private final PaymentRepository paymentRepository;

    /** TOTAL COUNTS + INCOME */
    @Override
    public DashboardSummaryResponse getDashboardSummary() {
        long totalServices = serviceRepository.count();
        long totalBookings = bookingRepository.count();
        double totalIncome = paymentRepository.findAll().stream()
                .mapToDouble(PaymentEntity::getAmount)
                .sum();

        return DashboardSummaryResponse.builder()
                .totalServices(totalServices)
                .totalBookings(totalBookings)
                .totalIncome(totalIncome)
                .build();
    }

    /** INCOME TREND (by date, month, or year) */
    @Override
    public List<IncomeTrendResponse> getIncomeTrend(String filter) {
        List<PaymentEntity> payments = paymentRepository.findAll();

        if (payments.isEmpty()) return List.of();

        Map<String, Double> grouped = new LinkedHashMap<>();

        switch (filter.toLowerCase()) {
            case "date" -> grouped = payments.stream()
                    .collect(Collectors.groupingBy(
                            p -> p.getPaymentDate().toLocalDate().toString(),
                            LinkedHashMap::new,
                            Collectors.summingDouble(PaymentEntity::getAmount)
                    ));

            case "month" -> grouped = payments.stream()
                    .collect(Collectors.groupingBy(
                            p -> p.getPaymentDate().getMonth()
                                    .getDisplayName(TextStyle.SHORT, Locale.ENGLISH), // e.g. JAN, FEB
                            LinkedHashMap::new,
                            Collectors.summingDouble(PaymentEntity::getAmount)
                    ));

            case "year" -> grouped = payments.stream()
                    .collect(Collectors.groupingBy(
                            p -> String.valueOf(p.getPaymentDate().getYear()),
                            LinkedHashMap::new,
                            Collectors.summingDouble(PaymentEntity::getAmount)
                    ));

            default -> throw new IllegalArgumentException("Invalid filter type. Use date, month, or year.");
        }

        return grouped.entrySet().stream()
                .map(e -> new IncomeTrendResponse(e.getKey(), e.getValue()))
                .toList();
    }
}
