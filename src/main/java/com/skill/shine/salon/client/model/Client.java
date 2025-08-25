// src/main/java/com/skill/shine/salon/client/model/ClientModel.java
package com.skill.shine.salon.client.model;

/**
 * This is a placeholder for client models.
 *
 * Example: User entity (for login, registration)
 */

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "client_entity")
public class Client {
    // Placeholder
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String email;

    private String role;

    private LocalDateTime createdDate;

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }

    public LocalDateTime getCreatedDate() { return createdDate; }
    public void setCreatedDate(LocalDateTime createdDate) { this.createdDate = createdDate; }
}
