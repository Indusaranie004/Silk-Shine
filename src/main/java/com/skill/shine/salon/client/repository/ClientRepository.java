// src/main/java/com/skill/shine/salon/client/repository/ClientRepository.java
package com.skill.shine.salon.client.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.skill.shine.salon.client.model.Client;
import org.springframework.stereotype.Repository;
import java.util.List;
/**
 * This is a placeholder for client repositories.
 *
 * Example: UserRepository, AppointmentRepository
 */
@Repository
public interface ClientRepository extends JpaRepository<Client, Long> {
    // Method to search clients by name containing the given keyword (case-insensitive)
    List<Client> findByNameContainingIgnoreCaseAndRole(String name, String role);
}

