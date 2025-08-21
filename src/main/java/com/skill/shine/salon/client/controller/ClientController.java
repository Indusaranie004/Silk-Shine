// ClientController.java
package com.skill.shine.salon.client.controller;

import com.skill.shine.salon.user.dto.ProfileRequest;
import com.skill.shine.salon.user.dto.ProfileResponse;
import com.skill.shine.salon.user.service.ProfileService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1.0/client")
@RequiredArgsConstructor
public class ClientController {

    private final ProfileService profileService;

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public ProfileResponse register(@RequestBody ProfileRequest request) {
        if (!"CLIENT".equals(request.getRole())) {
            throw new IllegalArgumentException("Invalid role for client registration");
        }
        ProfileResponse response = profileService.createProfile(request);
        return response;
    }
}