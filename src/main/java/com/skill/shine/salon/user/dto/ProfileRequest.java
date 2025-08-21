package com.skill.shine.salon.user.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ProfileRequest {

    private String name;
    private String email;
    private String password;
    private String role;

}
