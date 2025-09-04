package com.skill.shine.salon.services.repository;

import com.skill.shine.salon.services.model.ServiceEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ServiceRepository extends JpaRepository<ServiceEntity, Long> {
    List<ServiceEntity> findByCategoryIgnoreCase(String category);
    boolean existsByServiceName(String serviceName);
}

