// src/main/java/com/skill/shine/salon/staff/dto/StaffResponse.java
package com.skill.shine.salon.staff.dto;

import lombok.*;
import java.sql.Timestamp;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StaffResponse {
    private String userId;
    private String name;
    private String email;
    private String role;
    private Boolean isAccountVerified;
    private Timestamp createdAt;
    private Timestamp updatedAt;
}
