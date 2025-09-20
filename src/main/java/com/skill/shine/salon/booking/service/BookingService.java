package com.skill.shine.salon.booking.service;

import com.skill.shine.salon.booking.dto.BookingRequest;
import com.skill.shine.salon.booking.dto.BookingResponse;

import java.util.List;

public interface BookingService {
    BookingResponse createBooking(BookingRequest request);
    BookingResponse getBookingById(Long id);
    List<BookingResponse> getBookingsByUser(String userId);
    List<BookingResponse> getAllBookings();
    BookingResponse updateBooking(Long id, BookingRequest request);
    void deleteBooking(Long id);
}
