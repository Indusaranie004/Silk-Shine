// ClientController.java
package com.skill.shine.salon.client.controller;

import com.skill.shine.salon.user.dto.ProfileRequest;
import com.skill.shine.salon.user.dto.ProfileResponse;
import com.skill.shine.salon.user.service.ProfileService;
import com.skill.shine.salon.user.service.emailservice;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class ClientController {

    private final ProfileService profileService;
    private final emailservice EmailService;

    // Register new client

    @PostMapping("client/register")
    @ResponseStatus(HttpStatus.CREATED)
    public ProfileResponse register(@RequestBody ProfileRequest request) {
        if (!"CLIENT".equals(request.getRole())) {
            throw new IllegalArgumentException("Invalid role for client registration");
        }
        ProfileResponse response = profileService.createProfile(request);
        EmailService.sendWelcomeEmail(response.getEmail(), response.getName());
        return response;
    }
}