// src/main/java/com/skill/shine/salon/staff/service/StaffService.java
package com.skill.shine.salon.staff.service;

import com.skill.shine.salon.staff.dto.StaffResponse;
import com.skill.shine.salon.staff.dto.StaffUpdateRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface StaffService {
    Page<StaffResponse> listStaff(String q, Pageable pageable);
    StaffResponse getByUserId(String userId);

    // NEW
    StaffResponse updateStaff(String userId, StaffUpdateRequest request);
    void deleteStaff(String userId);
}
