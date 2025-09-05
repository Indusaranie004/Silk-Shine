package com.skill.shine.salon.client.dto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor



public class ClientProfileResponse {
    private String name;
    private String email;
    private String role;



}
