package com.skill.shine.salon.admin.controller;
import com.skill.shine.salon.admin.dto.ClientDTO;
import com.skill.shine.salon.admin.service.AdminClientService;
import com.skill.shine.salon.user.model.UserEntity;
import com.skill.shine.salon.admin.service.AdminClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
@CrossOrigin(origins = "*")

public class AdminClientController {

    @Autowired
    private AdminClientService adminClientService;

    // GET all clients
    @GetMapping("/clients")
    public ResponseEntity<List<ClientDTO>> getAllClients() {
        return ResponseEntity.ok(adminClientService.getAllClients());
    }

    // GET search clients by name
    @GetMapping("/clients/search")
    public ResponseEntity<List<ClientDTO>> searchClientsByName(@RequestParam String name) {
        return ResponseEntity.ok(adminClientService.searchClientsByName(name));
    }

    // GET search clients by userId
    @GetMapping("/clients/searchById")
    public ResponseEntity<List<ClientDTO>> searchClientsByUserId(@RequestParam String userId) {
        return ResponseEntity.ok(adminClientService.searchClientsByUserId(userId));
    }


    // DELETE client by UserId
    @DeleteMapping("/clients/{userId}")
    public ResponseEntity<String> deleteClient(@PathVariable String userId) {
        adminClientService.deleteClientByUserId(userId);
        return ResponseEntity.ok("Client deleted successfully");
    }



}



