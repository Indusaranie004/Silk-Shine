// src/main/java/com/skill/shine/salon/staff/dto/StaffUpdateRequest.java
package com.skill.shine.salon.staff.dto;

import lombok.Data;

@Data
public class StaffUpdateRequest {
    // All optional; we’ll only update non-null values
    private String name;
    private String email;
    private Boolean isAccountVerified;

    // NOTE: Do NOT allow role changes here to keep STAFF safe
}
