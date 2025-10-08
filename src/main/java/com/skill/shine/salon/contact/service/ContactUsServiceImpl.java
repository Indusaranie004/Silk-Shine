package com.skill.shine.salon.contact.service;

import com.skill.shine.salon.contact.dto.ContactUsRequest;
import com.skill.shine.salon.contact.dto.ContactUsResponse;
import com.skill.shine.salon.contact.model.ContactUs;
import com.skill.shine.salon.contact.repository.ContactUsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ContactUsServiceImpl implements ContactUsService {

    private final ContactUsRepository contactRepository;

    @Override
    public ContactUsResponse createContact(ContactUsRequest request) {
        ContactUs contact = ContactUs.builder()
                .name(request.getName())
                .email(request.getEmail())
                .phoneNumber(request.getPhoneNumber())
                .description(request.getDescription())
                .build();

        contact = contactRepository.save(contact);
        return mapToResponse(contact);
    }

    @Override
    public List<ContactUsResponse> getAllContacts() {
        return contactRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    public ContactUsResponse getContactById(Long id) {
        ContactUs contact = contactRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Contact not found with ID: " + id));
        return mapToResponse(contact);
    }

    @Override
    public ContactUsResponse updateContact(Long id, ContactUsRequest request) {
        ContactUs contact = contactRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Contact not found with ID: " + id));

        contact.setName(request.getName());
        contact.setEmail(request.getEmail());
        contact.setPhoneNumber(request.getPhoneNumber());
        contact.setDescription(request.getDescription());

        contact = contactRepository.save(contact);
        return mapToResponse(contact);
    }

    @Override
    public void deleteContact(Long id) {
        if (!contactRepository.existsById(id)) {
            throw new RuntimeException("Contact not found with ID: " + id);
        }
        contactRepository.deleteById(id);
    }

    private ContactUsResponse mapToResponse(ContactUs contact) {
        return ContactUsResponse.builder()
                .id(contact.getId())
                .name(contact.getName())
                .email(contact.getEmail())
                .phoneNumber(contact.getPhoneNumber())
                .description(contact.getDescription())
                .submittedAt(contact.getSubmittedAt() != null ? contact.getSubmittedAt().toString() : null)
                .build();
    }
}
