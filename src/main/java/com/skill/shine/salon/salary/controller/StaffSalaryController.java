package com.skill.shine.salon.salary.controller;

import com.skill.shine.salon.salary.dto.StaffSalaryRequest;
import com.skill.shine.salon.salary.dto.StaffSalaryResponse;
import com.skill.shine.salon.salary.service.StaffSalaryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/staff-salary")
@RequiredArgsConstructor
public class StaffSalaryController {

    private final StaffSalaryService salaryService;

    /** CREATE OR UPDATE */
    @PostMapping
    public ResponseEntity<StaffSalaryResponse> createOrUpdate(@RequestBody StaffSalaryRequest request) {
        return ResponseEntity.ok(salaryService.createOrUpdateSalary(request));
    }

    /** GET BY STAFF ID */
    @GetMapping("/staff/{staffId}")
    public ResponseEntity<List<StaffSalaryResponse>> getByStaff(@PathVariable String staffId) {
        return ResponseEntity.ok(salaryService.getByStaffId(staffId));
    }

    /** GET ALL SALARIES */
    @GetMapping
    public ResponseEntity<List<StaffSalaryResponse>> getAll() {
        return ResponseEntity.ok(salaryService.getAllSalaries());
    }

    /** DELETE */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSalary(@PathVariable Long id) {
        salaryService.deleteSalary(id);
        return ResponseEntity.noContent().build();
    }
}
