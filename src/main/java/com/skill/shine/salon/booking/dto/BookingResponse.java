package com.skill.shine.salon.booking.dto;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class BookingResponse {
    private Long id;
    private String userId;
    private Long serviceId;
    private String name;
    private String email;
    private String phone;
    private String address;
    private String gender;
    private String date;
    private String time;
    private Double price;
}

