package com.skill.shine.salon.client.controller;

import com.skill.shine.salon.client.dto.ClientProfileResponse;
import com.skill.shine.salon.client.dto.ClientProfileUpdateRequest;
import com.skill.shine.salon.client.service.ClientProfileService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("client/profile")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")


public class ClientProfileController {

    private final ClientProfileService clientProfileService;

    // Get profile
    @GetMapping("/{userId}")

    public ResponseEntity<ClientProfileResponse> getProfile(@PathVariable String userId) {
        return ResponseEntity.ok(clientProfileService.getProfile(userId));
    }

    // Update profile
    @PutMapping("/{userId}")
    public ResponseEntity<ClientProfileResponse> updateProfile(
            @PathVariable String userId,
            @RequestBody ClientProfileUpdateRequest request) {
        return ResponseEntity.ok(clientProfileService.updateProfile(userId, request));
    }

    // Delete profile
    @DeleteMapping("/{userId}")
    public ResponseEntity<String> deleteProfile(@PathVariable String userId) {
        clientProfileService.deleteProfile(userId);
        return ResponseEntity.ok("✅ Client profile deleted successfully!");
    }






}
