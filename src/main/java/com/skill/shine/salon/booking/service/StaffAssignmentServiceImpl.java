package com.skill.shine.salon.booking.service;
import com.skill.shine.salon.booking.dto.*;
import com.skill.shine.salon.booking.model.*;
import com.skill.shine.salon.booking.repository.BookingRepository;
import com.skill.shine.salon.staff.model.*;
import com.skill.shine.salon.staff.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.stream.Collectors;
@Service
@RequiredArgsConstructor




public class StaffAssignmentServiceImpl implements StaffAssignmentService {

    private final BookingRepository bookingRepository;
    private final BookingService bookingService;
    private final StaffAvailabilityRepository staffAvailabilityRepository;
    private final StaffSpecializationRepository staffSpecializationRepository;
    private final StaffRepository staffRepository;


    @Override
    public AvailableStaffResponse getAvailableStaffForBooking(Long bookingId) {
        // Get booking details
        BookingEntity booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        // Convert booking date to get day of week
        LocalDate bookingDate = LocalDate.parse(booking.getDate());
        LocalTime bookingTime = LocalTime.parse(booking.getTime());
        int dayOfWeek = bookingDate.getDayOfWeek().getValue();
        LocalDate weekStartDate = getWeekStartDate(bookingDate);

        // Get ALL staff available for this specific day (should be 4 staff members)
        List<StaffAvailability> dayAvailabilities = staffAvailabilityRepository
                .findByWeeklySchedule_WeekStartDateAndDayOfWeek(weekStartDate, dayOfWeek);

        // Convert to DTO format
        List<StaffSummaryDto> availableStaff = dayAvailabilities.stream()
                .map(availability -> StaffSummaryDto.builder()
                        .staffId(availability.getStaff().getId())
                        .fullName(availability.getStaff().getUser().getName())
                        .employeeId(availability.getStaff().getEmployeeId())
                        .specialization(availability.getSpecializationType().toString())
                        .build())
                .collect(Collectors.toList());

        return AvailableStaffResponse.builder()
                .bookingId(bookingId)
                .serviceType("ALL") // Since we're showing all available staff
                .bookingDate(booking.getDate())
                .bookingTime(booking.getTime())
                .availableStaff(availableStaff)
                .build();
    }

    @Override
    @Transactional
    public BookingResponse assignStaffToBooking(StaffAssignmentRequest request) {
        // Validate booking exists
        BookingEntity booking = bookingRepository.findById(request.getBookingId())
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        // Validate staff exists
        StaffModel staff = staffRepository.findById(request.getStaffId())
                .orElseThrow(() -> new RuntimeException("Staff not found"));

        // Check if staff is available
        if (!isStaffAvailableForBooking(request.getStaffId(), booking.getDate(), booking.getTime())) {
            throw new RuntimeException("Staff is not available for this time slot");
        }

        // Assign staff
        booking.setAssignedStaffId(request.getStaffId());
        booking.setAssignmentStatus(AssignmentStatus.ASSIGNED);
        bookingRepository.save(booking);

        // Return updated booking response
        return bookingService.getBookingById(request.getBookingId());
    }

    @Override
    @Transactional
    public BookingResponse unassignStaffFromBooking(Long bookingId) {
        BookingEntity booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        booking.setAssignedStaffId(null);
        booking.setAssignmentStatus(AssignmentStatus.UNASSIGNED);
        bookingRepository.save(booking);

        return bookingService.getBookingById(bookingId);
    }

    @Override
    public List<BookingResponse> getBookingsByStaff(Long staffId) {
        List<BookingEntity> bookings = bookingRepository.findByAssignedStaffId(staffId);
        return bookings.stream()
                .map(booking -> bookingService.getBookingById(booking.getId()))
                .collect(Collectors.toList());
    }

    @Override
    public boolean isStaffAvailableForBooking(Long staffId, String date, String time) {
        LocalDate bookingDate = LocalDate.parse(date);
        LocalTime bookingTime = LocalTime.parse(time);
        int dayOfWeek = bookingDate.getDayOfWeek().getValue();

        // Find staff availability for this day
        List<StaffAvailability> availabilities = staffAvailabilityRepository
                .findByStaffIdAndWeeklySchedule_WeekStartDate(staffId, getWeekStartDate(bookingDate));

        return availabilities.stream()
                .anyMatch(availability ->
                        availability.getDayOfWeek().equals(dayOfWeek) &&
                                !bookingTime.isBefore(availability.getStartTime()) &&
                                !bookingTime.isAfter(availability.getEndTime().minusMinutes(availability.getSlotDurationMinutes()))
                );
    }

    // ADD THIS MISSING METHOD
    private LocalDate getWeekStartDate(LocalDate date) {
        return date.with(DayOfWeek.MONDAY);
    }






}
