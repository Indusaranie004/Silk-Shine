package com.skill.shine.salon.user.service;

import com.skill.shine.salon.user.dto.ProfileRequest;
import com.skill.shine.salon.user.dto.ProfileResponse;

public interface ProfileService {

    public ProfileResponse createProfile(ProfileRequest request);
    public void validateProfileRequest(ProfileRequest request);



}
