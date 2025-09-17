package com.skill.shine.salon.staff.controller;

import com.skill.shine.salon.staff.dto.StaffBySpecializationResponse;
import com.skill.shine.salon.staff.dto.ValidationResult;
import com.skill.shine.salon.staff.dto.WeeklyScheduleRequest;
import com.skill.shine.salon.staff.dto.WeeklyScheduleResponse;
import com.skill.shine.salon.staff.service.WeeklyScheduleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.http.ResponseEntity;

@RestController
@RequestMapping("/weekly-schedule")
@CrossOrigin(origins = "*")
public class WeeklyScheduleController {

    @Autowired
    private WeeklyScheduleService weeklyScheduleService;

    @GetMapping("/staff-by-specialization")
    public ResponseEntity<StaffBySpecializationResponse> getStaffBySpecialization() {
        StaffBySpecializationResponse response = weeklyScheduleService.getStaffBySpecialization();
        return ResponseEntity.ok(response);
    }

    @PostMapping("/validate")
    public ResponseEntity<ValidationResult> validateAssignment(@RequestBody WeeklyScheduleRequest request) {
        ValidationResult result = weeklyScheduleService.validateScheduleAssignment(request);
        return ResponseEntity.ok(result);
    }

    @PostMapping
    public ResponseEntity<WeeklyScheduleResponse> createWeeklySchedule(@RequestBody WeeklyScheduleRequest request) {
        try {
            WeeklyScheduleResponse response = weeklyScheduleService.createWeeklySchedule(request);
            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/staff/{staffId}/current")
    public ResponseEntity<WeeklyScheduleResponse> getStaffCurrentSchedule(@PathVariable Long staffId) {
        WeeklyScheduleResponse response = weeklyScheduleService.getStaffCurrentSchedule(staffId);
        return ResponseEntity.ok(response);
    }
}
