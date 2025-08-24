// src/main/java/com/skill/shine/salon/admin/controller/AdminController.java
package com.skill.shine.salon.admin.controller;

import com.skill.shine.salon.user.dto.ProfileRequest;
import com.skill.shine.salon.user.dto.ProfileResponse;
import com.skill.shine.salon.user.service.ProfileService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class AdminController {

    private final ProfileService profileService;

    // Register new admin

    @PostMapping("admin/register")
    @ResponseStatus(HttpStatus.CREATED)
    public ProfileResponse register(@RequestBody ProfileRequest request) {
        // Role already set by frontend, just validate its ADMIN
        if (!"ADMIN".equals(request.getRole())) {
            throw new IllegalArgumentException("Invalid role for admin registration");
        }
        ProfileResponse response = profileService.createProfile(request);
        return response;
    }
}