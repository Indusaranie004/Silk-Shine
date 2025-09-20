package com.skill.shine.salon.booking.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "tbl_bookings")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class BookingEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String userId;   // logged-in user
    private Long serviceId;  // booked service

    private String name;
    private String email;
    private String phone;
    private String address;
    private String gender;   // MALE / FEMALE
    private String date;     // yyyy-MM-dd
    private String time;     // HH:mm

    private Double price;    // service price at booking time
}
