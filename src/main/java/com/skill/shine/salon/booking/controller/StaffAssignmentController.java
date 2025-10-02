package com.skill.shine.salon.booking.controller;
import com.skill.shine.salon.booking.dto.*;
import com.skill.shine.salon.booking.service.StaffAssignmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/bookings")
@RequiredArgsConstructor

public class StaffAssignmentController {

    private final StaffAssignmentService staffAssignmentService;

    /** GET AVAILABLE STAFF FOR BOOKING */
    @GetMapping("/{bookingId}/available-staff")
    public ResponseEntity<AvailableStaffResponse> getAvailableStaff(@PathVariable Long bookingId) {
        return ResponseEntity.ok(staffAssignmentService.getAvailableStaffForBooking(bookingId));
    }
    /** ASSIGN STAFF TO BOOKING - IMPROVED VERSION */
    @PostMapping("/{bookingId}/assign-staff")
    public ResponseEntity<BookingResponse> assignStaff(
            @PathVariable Long bookingId,
            @RequestBody StaffAssignmentRequest request) {
        // Set the bookingId from path parameter
        request.setBookingId(bookingId);
        return ResponseEntity.ok(staffAssignmentService.assignStaffToBooking(request));
    }


    /** ASSIGN STAFF TO BOOKING */
    @PostMapping("/assign-staff")
    public ResponseEntity<BookingResponse> assignStaff(@RequestBody StaffAssignmentRequest request) {
        return ResponseEntity.ok(staffAssignmentService.assignStaffToBooking(request));
    }

    /** UNASSIGN STAFF FROM BOOKING */
    @DeleteMapping("/{bookingId}/unassign-staff")
    public ResponseEntity<BookingResponse> unassignStaff(@PathVariable Long bookingId) {
        return ResponseEntity.ok(staffAssignmentService.unassignStaffFromBooking(bookingId));
    }

    /** GET BOOKINGS BY STAFF */
    @GetMapping("/staff/{staffId}")
    public ResponseEntity<List<BookingResponse>> getBookingsByStaff(@PathVariable Long staffId) {
        return ResponseEntity.ok(staffAssignmentService.getBookingsByStaff(staffId));
    }











}
