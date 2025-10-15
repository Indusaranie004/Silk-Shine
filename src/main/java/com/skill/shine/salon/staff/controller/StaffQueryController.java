// src/main/java/com/skill/shine/salon/staff/controller/StaffQueryController.java
package com.skill.shine.salon.staff.controller;

import com.skill.shine.salon.staff.dto.StaffResponse;
import com.skill.shine.salon.staff.dto.StaffUpdateRequest;
import com.skill.shine.salon.staff.service.StaffService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/staff")
@RequiredArgsConstructor
public class StaffQueryController {

    private final StaffService staffService;

    /**wh
     * List staff with pagination, sorting, and an optional search query.
     * Examples:
     *   GET /staff?page=0&size=10&sort=name,asc
     *   GET /staff?q=john
     */
    @GetMapping
    public Page<StaffResponse> listStaff(
            @RequestParam(required = false, name = "q") String q,
            @PageableDefault(size = 10, sort = "createdAt") Pageable pageable
    ) {
        return staffService.listStaff(q, pageable);
    }

    /**
     * Get a single staff member by public userId.
     * Example:
     *   GET /staff/ca2a3a4b-...-0e3
     */
    @GetMapping("/{userId}")
    public StaffResponse getStaffByUserId(@PathVariable String userId) {
        return staffService.getByUserId(userId);
    }

    // NEW: Partial update (PATCH). Send only fields you want to change.
    @PutMapping("/{userId}")
    public StaffResponse updateStaff(
            @PathVariable String userId,
            @RequestBody StaffUpdateRequest request
    ) {
        return staffService.updateStaff(userId, request);
    }

    // NEW: Hard delete the staff user
    @DeleteMapping("/{userId}")
    public ResponseEntity<String> deleteStaff(@PathVariable String userId) {
        staffService.deleteStaff(userId);
        return ResponseEntity.ok("✅ Staff member deleted successfully!");
    }
}
