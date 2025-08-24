// LoginResponse.java

package com.skill.shine.salon.user.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class LoginResponse {

    private String userId;
    private String name;
    private String email;
    private String role;
    private String redirectUrl;
    private String welcomeMessage;// frontend decides where to navigate
}
