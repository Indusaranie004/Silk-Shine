package com.skill.shine.salon.client.service;
import com.skill.shine.salon.client.dto.ClientProfileResponse;
import com.skill.shine.salon.client.dto.ClientProfileUpdateRequest;
import com.skill.shine.salon.user.model.UserEntity;
import com.skill.shine.salon.user.repositary.UserRepositary;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor

public class ClientProfileService {

    private final UserRepositary userRepositary;

    // Get client profile
    public ClientProfileResponse getProfile(String userId) {
        UserEntity user = userRepositary.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!"CLIENT".equals(user.getRole())) {
            throw new RuntimeException("Not a client");
        }

        return new ClientProfileResponse(
                user.getName(),
                user.getEmail(),
                user.getRole()
        );

    }

    // Update client profile
    public ClientProfileResponse updateProfile(String userId, ClientProfileUpdateRequest request) {
        UserEntity user = userRepositary.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!"CLIENT".equals(user.getRole())) {
            throw new RuntimeException("Not a client");
        }

        // Check email uniqueness
        if (userRepositary.existsByEmailAndUserIdNot(request.getEmail(), userId)) {
            throw new RuntimeException("Email is already in use");
        }

        user.setName(request.getName());
        user.setEmail(request.getEmail());

        UserEntity updated = userRepositary.save(user);

        return new ClientProfileResponse(
                updated.getName(),
                updated.getEmail(),
                updated.getRole()
        );
    }
    // Delete client profile (permanent delete)
    public void deleteProfile(String userId) {
        UserEntity user = userRepositary.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!"CLIENT".equals(user.getRole())) {
            throw new RuntimeException("Not a client");
        }

        userRepositary.delete(user);
    }






}
