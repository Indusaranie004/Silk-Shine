package com.skill.shine.salon.contact.service;

import com.skill.shine.salon.contact.dto.ContactUsRequest;
import com.skill.shine.salon.contact.dto.ContactUsResponse;
import java.util.List;

public interface ContactUsService {
    ContactUsResponse createContact(ContactUsRequest request);
    List<ContactUsResponse> getAllContacts();
    ContactUsResponse getContactById(Long id);
    ContactUsResponse updateContact(Long id, ContactUsRequest request);
    void deleteContact(Long id);
}
