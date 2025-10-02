package com.skill.shine.salon.booking.service;
import com.skill.shine.salon.booking.dto.*;

import java.util.List;




public interface StaffAssignmentService {

    AvailableStaffResponse getAvailableStaffForBooking(Long bookingId);
    BookingResponse assignStaffToBooking(StaffAssignmentRequest request);
    BookingResponse unassignStaffFromBooking(Long bookingId);
    List<BookingResponse> getBookingsByStaff(Long staffId);
    boolean isStaffAvailableForBooking(Long staffId, String date, String time);




}
