package com.skill.shine.salon.admin.controller;
import com.skill.shine.salon.admin.service.AdminClientService;
import com.skill.shine.salon.client.model.Client;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "*")

public class AdminClientController {

    @Autowired
    private AdminClientService adminClientService;

    // GET all regular clients
    @GetMapping("/clients/regular")
    public ResponseEntity<List<Client>> getRegularClients() {
        try {
            return ResponseEntity.ok(adminClientService.getRegularClients());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    // GET search clients by name
    @GetMapping("/clients/search")
    public ResponseEntity<List<Client>> searchClients(@RequestParam("name") String name) {
        try {
            return ResponseEntity.ok(adminClientService.searchClientsByName(name));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @DeleteMapping("/clients/{id}")
    public ResponseEntity<String> deleteClient(@PathVariable Long id) {
        try {
            adminClientService.deleteClient(id);
            return ResponseEntity.ok("User deleted successfully!");
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Error deleting user!");
        }
    }



}