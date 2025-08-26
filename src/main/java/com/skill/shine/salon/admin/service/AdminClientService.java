package com.skill.shine.salon.admin.service;
import com.skill.shine.salon.user.model.UserEntity;
import com.skill.shine.salon.user.repositary.UserRepositary;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.skill.shine.salon.admin.dto.ClientDTO;
import java.util.stream.Collectors;
import java.util.List;


@Service
public class AdminClientService {

    @Autowired
    private UserRepositary userRepository;

    // Get all clients
    public List<ClientDTO> getAllClients() {
        return userRepository.findByRole("CLIENT")
                .stream()
                .map(user -> new ClientDTO(
                        user.getUserId(),
                        user.getName(),
                        user.getEmail()
                ))
                .collect(Collectors.toList());
    }


    // Search clients by name
    public List<ClientDTO> searchClientsByName(String name) {
        return userRepository.findByNameContainingIgnoreCaseAndRole(name, "CLIENT")
                .stream()
                .map(user -> new ClientDTO(
                        user.getUserId(),
                        user.getName(),
                        user.getEmail()
                ))
                .collect(Collectors.toList());
    }

    // Search clients by userId
    public List<ClientDTO> searchClientsByUserId(String userId) {
        return userRepository.findByUserIdAndRole(userId, "CLIENT")
                .stream()
                .map(user -> new ClientDTO(
                        user.getUserId(),
                        user.getName(),
                        user.getEmail()
                ))
                .collect(Collectors.toList());
    }


    // Delete client by UserId
    public void deleteClientByUserId(String userId) {
        List<UserEntity> users = userRepository.findByUserIdAndRole(userId, "CLIENT");
        if (users.isEmpty()) {
            throw new RuntimeException("Client not found");
        }
        userRepository.delete(users.get(0)); // delete the first match
    }





}
