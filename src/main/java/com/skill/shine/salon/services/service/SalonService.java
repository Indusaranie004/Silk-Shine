package com.skill.shine.salon.services.service;

import com.skill.shine.salon.services.dto.ServiceRequest;
import com.skill.shine.salon.services.dto.ServiceResponse;

import java.util.List;

public interface SalonService {
    ServiceResponse createService(ServiceRequest request);
    ServiceResponse updateService(Long id, ServiceRequest request);
    void deleteService(Long id);
    ServiceResponse getServiceById(Long id);
    List<ServiceResponse> getAllServices();
    List<ServiceResponse> getServicesByCategory(String category);
}
