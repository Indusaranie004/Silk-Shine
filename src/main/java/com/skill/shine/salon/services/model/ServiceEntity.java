package com.skill.shine.salon.services.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "tbl_services")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ServiceEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String serviceName;

    @Column(nullable = false)
    private String category;

    @Column(nullable = false)
    private Double price;

    @Lob
    private String description;

    private String imageUrl; // store image path or URL
}
