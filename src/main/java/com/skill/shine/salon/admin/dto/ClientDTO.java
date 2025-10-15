package com.skill.shine.salon.admin.dto;

public class ClientDTO {

    private String userId;
    private String name;
    private String email;

    // Constructor
    public ClientDTO(String userId, String name, String email) {
        this.userId = userId;
        this.name = name;
        this.email = email;
    }

    // Getters & Setters
    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }


}
