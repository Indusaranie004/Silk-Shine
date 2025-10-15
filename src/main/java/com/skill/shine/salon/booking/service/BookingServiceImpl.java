package com.skill.shine.salon.booking.service;

import com.skill.shine.salon.booking.dto.BookingRequest;
import com.skill.shine.salon.booking.dto.BookingResponse;
import com.skill.shine.salon.booking.model.BookingEntity;
import com.skill.shine.salon.booking.repository.BookingRepository;
import com.skill.shine.salon.services.model.ServiceEntity;
import com.skill.shine.salon.services.repository.ServiceRepository;
import com.skill.shine.salon.staff.repository.StaffRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BookingServiceImpl implements BookingService {

    private final BookingRepository bookingRepository;
    private final ServiceRepository serviceRepository;
    private final StaffRepository staffRepository;

    @Override
    public BookingResponse createBooking(BookingRequest request) {
        ServiceEntity service = serviceRepository.findById(request.getServiceId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Service not found"));

        BookingEntity booking = BookingEntity.builder()
                .userId(request.getUserId())
                .serviceId(request.getServiceId())
                .name(request.getName())
                .email(request.getEmail())
                .phone(request.getPhone())
                .address(request.getAddress())
                .gender(request.getGender())
                .date(request.getDate())
                .time(request.getTime())
                .price(service.getPrice())
                .build();

        bookingRepository.save(booking);
        return mapToResponse(booking);
    }

    @Override
    public BookingResponse getBookingById(Long id) {
        BookingEntity booking = bookingRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Booking not found"));
        return mapToResponse(booking);
    }

    @Override
    public List<BookingResponse> getBookingsByUser(String userId) {
        return bookingRepository.findByUserId(userId)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    public List<BookingResponse> getAllBookings() {
        return bookingRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    public BookingResponse updateBooking(Long id, BookingRequest request) {
        BookingEntity booking = bookingRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Booking not found"));

        ServiceEntity service = serviceRepository.findById(request.getServiceId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Service not found"));

        booking.setUserId(request.getUserId());
        booking.setServiceId(request.getServiceId());
        booking.setName(request.getName());
        booking.setEmail(request.getEmail());
        booking.setPhone(request.getPhone());
        booking.setAddress(request.getAddress());
        booking.setGender(request.getGender());
        booking.setDate(request.getDate());
        booking.setTime(request.getTime());
        booking.setPrice(service.getPrice());

        bookingRepository.save(booking);
        return mapToResponse(booking);
    }

    @Override
    public void deleteBooking(Long id) {
        if (!bookingRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Booking not found");
        }
        bookingRepository.deleteById(id);
    }

    private BookingResponse mapToResponse(BookingEntity booking) {
        // Get staff name first if assigned
        String assignedStaffName = null;
        if (booking.getAssignedStaffId() != null) {
            assignedStaffName = staffRepository.findById(booking.getAssignedStaffId())
                    .map(staff -> staff.getUser().getName())
                    .orElse(null);
        }


        return BookingResponse.builder()
                .id(booking.getId())
                .userId(booking.getUserId())
                .serviceId(booking.getServiceId())
                .name(booking.getName())
                .email(booking.getEmail())
                .phone(booking.getPhone())
                .address(booking.getAddress())
                .gender(booking.getGender())
                .date(booking.getDate())
                .time(booking.getTime())
                .price(booking.getPrice())
                .assignedStaffId(booking.getAssignedStaffId())
                .assignmentStatus(booking.getAssignmentStatus())
                .assignedStaffName(assignedStaffName)

                .build();
    }
}
