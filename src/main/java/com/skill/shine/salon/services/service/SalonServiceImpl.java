package com.skill.shine.salon.services.service;

import com.skill.shine.salon.services.dto.ServiceRequest;
import com.skill.shine.salon.services.dto.ServiceResponse;
import com.skill.shine.salon.services.model.ServiceEntity;
import com.skill.shine.salon.services.repository.ServiceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SalonServiceImpl implements SalonService {

    private final ServiceRepository serviceRepository;

    @Override
    public ServiceResponse createService(ServiceRequest request) {
        if (serviceRepository.existsByServiceName(request.getServiceName())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Service already exists");
        }
        ServiceEntity entity = convertToEntity(request);
        serviceRepository.save(entity);
        return convertToResponse(entity);
    }

    @Override
    public ServiceResponse updateService(Long id, ServiceRequest request) {
        ServiceEntity entity = serviceRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Service not found"));

        entity.setServiceName(request.getServiceName());
        entity.setCategory(request.getCategory());
        entity.setPrice(request.getPrice());
        entity.setDescription(request.getDescription());
        entity.setImageUrl(request.getImageUrl());

        serviceRepository.save(entity);
        return convertToResponse(entity);
    }

    @Override
    public void deleteService(Long id) {
        if (!serviceRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Service not found");
        }
        serviceRepository.deleteById(id);
    }

    @Override
    public ServiceResponse getServiceById(Long id) {
        return serviceRepository.findById(id)
                .map(this::convertToResponse)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Service not found"));
    }

    @Override
    public List<ServiceResponse> getAllServices() {
        return serviceRepository.findAll()
                .stream().map(this::convertToResponse).collect(Collectors.toList());
    }

    @Override
    public List<ServiceResponse> getServicesByCategory(String category) {
        return serviceRepository.findByCategoryIgnoreCase(category)
                .stream().map(this::convertToResponse).collect(Collectors.toList());
    }

    private ServiceEntity convertToEntity(ServiceRequest request) {
        return ServiceEntity.builder()
                .serviceName(request.getServiceName())
                .category(request.getCategory())
                .price(request.getPrice())
                .description(request.getDescription())
                .imageUrl(request.getImageUrl())
                .build();
    }

    private ServiceResponse convertToResponse(ServiceEntity entity) {
        return ServiceResponse.builder()
                .id(entity.getId())
                .serviceName(entity.getServiceName())
                .category(entity.getCategory())
                .price(entity.getPrice())
                .description(entity.getDescription())
                .imageUrl(entity.getImageUrl())
                .build();
    }
}

