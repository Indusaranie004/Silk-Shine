package com.skill.shine.salon.admin.service;
import com.skill.shine.salon.client.model.Client;
import com.skill.shine.salon.client.repository.ClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;



@Service
public class AdminClientService {

    @Autowired
    private ClientRepository clientRepository;

    // Get all regular clients
    public List<Client> getRegularClients() {
        return clientRepository.findAll()
                .stream()
                .filter(c -> "CLIENT".equals(c.getRole()))
                .collect(Collectors.toList());
    }

    // Search clients by name
    public List<Client> searchClientsByName(String name) {
        return clientRepository.findByNameContainingIgnoreCaseAndRole(name, "CLIENT");
    }

    //Add clients by ID
    public void deleteClient(Long id) {
        clientRepository.deleteById(id);
    }

}
