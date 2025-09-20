package com.skill.shine.salon.services.dto;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ServiceResponse {
    private Long id;
    private String serviceName;
    private String category;
    private Double price;
    private String description;
    private String imageUrl;
}
