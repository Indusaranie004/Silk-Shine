package com.skill.shine.salon.salary.service;

import com.skill.shine.salon.salary.dto.StaffSalaryRequest;
import com.skill.shine.salon.salary.dto.StaffSalaryResponse;
import com.skill.shine.salon.salary.model.StaffSalaryEntity;
import com.skill.shine.salon.salary.repository.StaffSalaryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class StaffSalaryService {

    private final StaffSalaryRepository repository;

    /** CREATE OR UPDATE SALARY */
    public StaffSalaryResponse createOrUpdateSalary(StaffSalaryRequest request) {
        StaffSalaryEntity salary = repository.findByStaffIdAndMonthAndYear(
                request.getStaffId(), request.getMonth(), request.getYear()
        ).orElse(new StaffSalaryEntity());

        salary.setStaffId(request.getStaffId());
        salary.setDailyPayment(request.getDailyPayment());
        salary.setWorkingDays(request.getWorkingDays());
        salary.setBonus(request.getBonus() != null ? request.getBonus() : 0.0);
        salary.setEtfPercentage(request.getEtfPercentage());
        salary.setEpfPercentage(request.getEpfPercentage());
        salary.setMonth(request.getMonth());
        salary.setYear(request.getYear());
        salary.setNotes(request.getNotes());
        salary.setCreatedAt(LocalDate.now());

        // SALARY CALCULATION
        double baseSalary = salary.getDailyPayment() * salary.getWorkingDays();
        double totalSalary = baseSalary + salary.getBonus()  ;
        double etfAmount = totalSalary * (salary.getEtfPercentage() / 100);
        double epfAmount = totalSalary * (salary.getEpfPercentage() / 100);

        salary.setTotalSalary(totalSalary);
        salary.setEtfAmount(etfAmount);
        salary.setEpfAmount(epfAmount);

        repository.save(salary);

        return mapToResponse(salary);
    }

    /** GET SALARY BY STAFF ID */
    public List<StaffSalaryResponse> getByStaffId(String staffId) {
        List<StaffSalaryEntity> salaries = repository.findByStaffId(staffId);
        if (salaries.isEmpty())
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No salary found for staffId: " + staffId);
        return salaries.stream().map(this::mapToResponse).collect(Collectors.toList());
    }

    /** GET ALL SALARIES */
    public List<StaffSalaryResponse> getAllSalaries() {
        return repository.findAll().stream().map(this::mapToResponse).collect(Collectors.toList());
    }

    /** DELETE SALARY */
    public void deleteSalary(Long id) {
        repository.deleteById(id);
    }

    /** ENTITY -> DTO */
    private StaffSalaryResponse mapToResponse(StaffSalaryEntity s) {
        return StaffSalaryResponse.builder()
                .id(s.getId())
                .staffId(s.getStaffId())
                .dailyPayment(s.getDailyPayment())
                .workingDays(s.getWorkingDays())
                .bonus(s.getBonus())
                .etfPercentage(s.getEtfPercentage())
                .epfPercentage(s.getEpfPercentage())
                .month(s.getMonth())
                .year(s.getYear())
                .totalSalary(s.getTotalSalary())
                .etfAmount(s.getEtfAmount())
                .epfAmount(s.getEpfAmount())
                .notes(s.getNotes())
                .build();
    }
}
