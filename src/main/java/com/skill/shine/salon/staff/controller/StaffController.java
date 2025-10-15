// src/main/java/com/skill/shine/salon/staff/controller/StaffController.java
package com.skill.shine.salon.staff.controller;

import com.skill.shine.salon.user.dto.ProfileRequest;
import com.skill.shine.salon.user.dto.ProfileResponse;
import com.skill.shine.salon.user.service.ProfileService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class StaffController {

    private final ProfileService profileService;

    // Register new staff

    @PostMapping("staff/register")
    @ResponseStatus(HttpStatus.CREATED)
    public ProfileResponse register(@RequestBody ProfileRequest request) {
        if (!"STAFF".equals(request.getRole())) {
            throw new IllegalArgumentException("Invalid role for staff registration");
        }
        ProfileResponse response = profileService.createProfile(request);
        return response;
    }
}