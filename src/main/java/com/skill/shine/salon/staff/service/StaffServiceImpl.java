// src/main/java/com/skill/shine/salon/staff/service/StaffServiceImpl.java
package com.skill.shine.salon.staff.service;

import com.skill.shine.salon.staff.dto.StaffResponse;
import com.skill.shine.salon.staff.dto.StaffUpdateRequest;
import com.skill.shine.salon.user.model.UserEntity;
import com.skill.shine.salon.user.repositary.UserRepositary;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

@Service
@RequiredArgsConstructor
public class StaffServiceImpl implements StaffService {

    private final UserRepositary userRepositary;
    private static final String STAFF = "STAFF";

    @Override
    public Page<StaffResponse> listStaff(String q, Pageable pageable) {
        Page<UserEntity> page = (q == null || q.isBlank())
                ? userRepositary.findByRole(STAFF, pageable)
                : userRepositary.searchStaff(STAFF, q.trim(), pageable);

        return page.map(this::toResponse);
    }

    @Override
    public StaffResponse getByUserId(String userId) {
        UserEntity u = userRepositary.findByUserId(userId)
                .filter(it -> STAFF.equals(it.getRole()))
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Staff not found"));
        return toResponse(u);
    }
    @Transactional
    @Override
    public StaffResponse updateStaff(String userId, StaffUpdateRequest request) {
        UserEntity u = userRepositary.findByUserId(userId)
                .filter(it -> STAFF.equals(it.getRole()))
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Staff not found"));

        // Update name
        if (request.getName() != null && !request.getName().isBlank()) {
            u.setName(request.getName().trim());
        }

        // Update email (ensure unique among other users)
        if (request.getEmail() != null && !request.getEmail().isBlank()) {
            String newEmail = request.getEmail().trim();
            if (!newEmail.equalsIgnoreCase(u.getEmail())
                    && userRepositary.existsByEmailAndUserIdNot(newEmail, u.getUserId())) {
                throw new ResponseStatusException(HttpStatus.CONFLICT, "Email already in use");
            }
            u.setEmail(newEmail);
        }

        // Update verification flag
        if (request.getIsAccountVerified() != null) {
            u.setIsAccountVerified(request.getIsAccountVerified());
        }

        // Never allow role changes here (keep STAFF only)
        if (!STAFF.equals(u.getRole())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Only staff can be updated here");
        }

        userRepositary.save(u);
        return toResponse(u);
    }

    @Transactional
    @Override
    public void deleteStaff(String userId) {
        UserEntity u = userRepositary.findByUserId(userId)
                .filter(it -> STAFF.equals(it.getRole()))
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Staff not found"));

        userRepositary.delete(u);
    }


    private StaffResponse toResponse(UserEntity u) {
        return StaffResponse.builder()
                .userId(u.getUserId())
                .name(u.getName())
                .email(u.getEmail())
                .role(u.getRole())
                .isAccountVerified(Boolean.TRUE.equals(u.getIsAccountVerified()))
                .createdAt(u.getCreatedAt())
                .updatedAt(u.getUpdatedAt())
                .build();
    }
}
