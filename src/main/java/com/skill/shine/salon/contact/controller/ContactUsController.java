package com.skill.shine.salon.contact.controller;

import com.skill.shine.salon.contact.dto.ContactUsRequest;
import com.skill.shine.salon.contact.dto.ContactUsResponse;
import com.skill.shine.salon.contact.service.ContactUsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/contact")
@RequiredArgsConstructor
@CrossOrigin(origins = "*") // optional for frontend access
public class ContactUsController {

    private final ContactUsService contactService;

    // CREATE
    @PostMapping("/create")
    public ResponseEntity<ContactUsResponse> createContact(@RequestBody ContactUsRequest request) {
        return ResponseEntity.ok(contactService.createContact(request));
    }

    // READ ALL
    @GetMapping("/all")
    public ResponseEntity<List<ContactUsResponse>> getAllContacts() {
        return ResponseEntity.ok(contactService.getAllContacts());
    }

    // READ SINGLE
    @GetMapping("/{id}")
    public ResponseEntity<ContactUsResponse> getContactById(@PathVariable Long id) {
        return ResponseEntity.ok(contactService.getContactById(id));
    }

    // UPDATE
    @PutMapping("/update/{id}")
    public ResponseEntity<ContactUsResponse> updateContact(
            @PathVariable Long id,
            @RequestBody ContactUsRequest request) {
        return ResponseEntity.ok(contactService.updateContact(id, request));
    }

    // DELETE
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteContact(@PathVariable Long id) {
        contactService.deleteContact(id);
        return ResponseEntity.ok("Contact deleted successfully");
    }
}
