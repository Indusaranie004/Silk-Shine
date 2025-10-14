package com.skill.shine.salon.contact.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "tbl_contact_us")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ContactUs {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String email;
    private String phoneNumber;
    private String description;

    @Column(name = "submitted_at")
    private LocalDateTime submittedAt;

    /** Automatically set the timestamp before saving */
    @PrePersist
    public void onCreate() {
        this.submittedAt = LocalDateTime.now();
    }
}
