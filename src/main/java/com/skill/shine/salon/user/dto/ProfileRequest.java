package com.skill.shine.salon.user.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.antlr.v4.runtime.misc.NotNull;

@Data
@AllArgsConstructor
public class ProfileRequest {

    @NotBlank(message = "Name should not be empty.")
    private String name;
    @Email(message = "Enter valid email address")
    @NotNull(message = "Email should be not empty")
    private String email;
    @Min(value = 6, message = "Password must be at least 6 characters")
    private String password;
    private String role;

}
