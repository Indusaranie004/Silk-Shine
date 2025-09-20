package com.skill.shine.salon.staff.service;

// Spring Framework imports
import com.skill.shine.salon.staff.dto.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

// Java Time API imports
import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.TextStyle;
import java.time.temporal.ChronoUnit;

// Java Collections imports
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Set;
import java.util.function.Function;
import java.util.stream.Collectors;

// Your custom domain/entity imports
import com.skill.shine.salon.staff.model.StaffModel;
import com.skill.shine.salon.staff.model.StaffAvailability;
import com.skill.shine.salon.staff.model.StaffSpecialization;
import com.skill.shine.salon.staff.model.WeeklySchedule;

// Your custom repository imports
import com.skill.shine.salon.staff.repository.StaffRepository;
import com.skill.shine.salon.staff.repository.StaffAvailabilityRepository;
import com.skill.shine.salon.staff.repository.StaffSpecializationRepository;
import com.skill.shine.salon.staff.repository.WeeklyScheduleRepository;

// Your custom enum import
import com.skill.shine.salon.staff.model.SpecializationType;

@Service
@Transactional
public class WeeklyScheduleService {

    @Autowired
    private StaffSpecializationRepository staffSpecializationRepository;

    @Autowired
    private WeeklyScheduleRepository weeklyScheduleRepository;

    @Autowired
    private StaffAvailabilityRepository staffAvailabilityRepository;

    @Autowired
    private StaffRepository staffRepository;

    public StaffBySpecializationResponse getStaffBySpecialization() {
        System.out.println("=== GETTING STAFF BY SPECIALIZATION ===");
        Map<SpecializationType, List<StaffSummary>> result = new HashMap<>();

        for (SpecializationType type : SpecializationType.values()) {
            System.out.println("Checking specialization: " + type);
            List<StaffSpecialization> specializations = staffSpecializationRepository.findActiveStaffBySpecialization(type);
            System.out.println("Type: " + type + " - Found: " + specializations.size() + " staff members");

            List<StaffSummary> staffSummaries = specializations.stream()
                    .map(spec -> {
                        System.out.println("  Staff: " + spec.getStaff().getUser().getName() + " (ID: " + spec.getStaff().getId() + ")");
                        return new StaffSummary(
                                spec.getStaff().getId(),
                                spec.getStaff().getUser().getName(),
                                spec.getStaff().getEmployeeId()
                        );
                    })
                    .collect(Collectors.toList());
            result.put(type, staffSummaries);
        }

        System.out.println("Final result size: " + result.size());
        System.out.println("Result map keys: " + result.keySet());

        StaffBySpecializationResponse response = new StaffBySpecializationResponse(result);
        System.out.println("Response created: " + (response != null ? "SUCCESS" : "NULL"));
        return response;
    }

    public ValidationResult validateScheduleAssignment(WeeklyScheduleRequest request) {
        ValidationResult result = new ValidationResult();
        List<String> warnings = new ArrayList<>();
        List<String> errors = new ArrayList<>();

        for (DailyAssignmentRequest daily : request.getDailyAssignments()) {
            // FIX 1: Check daily hours ONCE per day (moved outside staff loop)
            long dailyHours = ChronoUnit.HOURS.between(daily.getStartTime(), daily.getEndTime());
            if (dailyHours > 10) {
                errors.add("Daily hours exceed 10 hours for " + getDayName(daily.getDayOfWeek()));
            }

            // FIX 2: Check all 4 specializations covered
            if (daily.getStaffAssignments().size() != 4) {
                errors.add("Must assign exactly 1 staff per specialization for " + getDayName(daily.getDayOfWeek()));
            }

            // FIX 3: Check staff working days (avoid duplicate warnings with Set)
            Set<Long> checkedStaff = new HashSet<>();
            for (Long staffId : daily.getStaffAssignments().values()) {
                if (!checkedStaff.contains(staffId)) {
                    // Check max 6 days per week
                    int currentWorkingDays = staffAvailabilityRepository.countWorkingDaysByStaffAndWeek(staffId, request.getWeekStartDate());
                    if (currentWorkingDays >= 6) {
                        warnings.add("Staff ID " + staffId + " already working 6+ days this week");
                    }
                    checkedStaff.add(staffId);
                }
            }
        }

        result.setValid(errors.isEmpty());
        result.setWarnings(warnings);
        result.setErrors(errors);
        return result;
    }

    public WeeklyScheduleResponse createWeeklySchedule(WeeklyScheduleRequest request) {
        System.out.println("=== CREATING WEEKLY SCHEDULE ===");

        ValidationResult validation = validateScheduleAssignment(request);
        if (!validation.isValid()) {
            throw new IllegalArgumentException("Validation failed: " + validation.getErrors());
        }

        // Create WeeklySchedule
        WeeklySchedule weeklySchedule = new WeeklySchedule();
        weeklySchedule.setWeekStartDate(request.getWeekStartDate());
        weeklySchedule.setCreatedAt(LocalDateTime.now());
        weeklySchedule = weeklyScheduleRepository.save(weeklySchedule);

        // Create StaffAvailability records with specialization tracking
        for (DailyAssignmentRequest daily : request.getDailyAssignments()) {

            // Get all staff IDs for this day
            Collection<Long> staffIds = daily.getStaffAssignments().values();
            System.out.println("Staff IDs to fetch: " + staffIds);

            // Batch fetch all staff entities to avoid TransientObjectException
            List<StaffModel> staffList = staffRepository.findAllById(staffIds);
            Map<Long, StaffModel> staffMap = staffList.stream()
                    .collect(Collectors.toMap(StaffModel::getId, Function.identity()));

            System.out.println("Found staff count: " + staffList.size());

            // Validate all staff exist
            for (Long staffId : staffIds) {
                if (!staffMap.containsKey(staffId)) {
                    throw new IllegalArgumentException("Staff not found with ID: " + staffId);
                }
            }

            // Create StaffAvailability records for each specialization
            for (Map.Entry<SpecializationType, Long> entry : daily.getStaffAssignments().entrySet()) {
                SpecializationType specialization = entry.getKey();
                Long staffId = entry.getValue();

                // Get the MANAGED entity from the map
                StaffModel staff = staffMap.get(staffId);

                StaffAvailability availability = new StaffAvailability();
                availability.setWeeklySchedule(weeklySchedule);
                availability.setStaff(staff);
                availability.setDayOfWeek(daily.getDayOfWeek());
                availability.setStartTime(daily.getStartTime());
                availability.setEndTime(daily.getEndTime());
                availability.setSlotDurationMinutes(daily.getSlotDurationMinutes());
                // Store the specialization for this assignment
                availability.setSpecializationType(specialization); // You need to add this field to StaffAvailability

                staffAvailabilityRepository.save(availability);
            }
        }

        // Fetch the fresh data for response
        List<StaffAvailability> availabilities = staffAvailabilityRepository.findByWeeklyScheduleId(weeklySchedule.getId());
        return buildCompleteWeeklyScheduleResponse(weeklySchedule, availabilities);
    }

    public WeeklyScheduleResponse getStaffCurrentSchedule(Long staffId) {
        LocalDate currentWeekStart = LocalDate.now().with(DayOfWeek.MONDAY);
        System.out.println("=== GETTING STAFF SCHEDULE ===");
        System.out.println("Looking for week: " + currentWeekStart + " for staff: " + staffId);

        List<StaffAvailability> availabilities = staffAvailabilityRepository.findByStaffIdAndWeeklySchedule_WeekStartDate(staffId, currentWeekStart);
        System.out.println("Found availabilities: " + availabilities.size());

        // Debug each availability record
        for (int i = 0; i < availabilities.size(); i++) {
            StaffAvailability av = availabilities.get(i);
            System.out.println("Availability " + (i+1) + ": Day=" + av.getDayOfWeek()
                    + ", Start=" + av.getStartTime()
                    + ", End=" + av.getEndTime()
                    + ", Specialization=" + av.getSpecializationType());
        }

        WeeklyScheduleResponse response = buildStaffScheduleResponse(availabilities, currentWeekStart);
        System.out.println("Response daily schedules count: " + (response.getDailySchedules() != null ? response.getDailySchedules().size() : "null"));

        return response;
    }

    private WeeklyScheduleResponse buildCompleteWeeklyScheduleResponse(WeeklySchedule schedule, List<StaffAvailability> availabilities) {
        // Group availabilities by day
        Map<Integer, List<StaffAvailability>> availabilitiesByDay = availabilities.stream()
                .collect(Collectors.groupingBy(StaffAvailability::getDayOfWeek));

        List<DailyScheduleResponse> dailySchedules = availabilitiesByDay.entrySet().stream()
                .map(entry -> {
                    Integer dayOfWeek = entry.getKey();
                    List<StaffAvailability> dayAvailabilities = entry.getValue();

                    // Get basic schedule info (same for all staff on this day)
                    StaffAvailability first = dayAvailabilities.get(0);

                    DailyScheduleResponse dailyResponse = new DailyScheduleResponse();
                    dailyResponse.setDayOfWeek(dayOfWeek);
                    dailyResponse.setStartTime(first.getStartTime());
                    dailyResponse.setEndTime(first.getEndTime());
                    dailyResponse.setSlotDurationMinutes(first.getSlotDurationMinutes());

                    // Build staff assignments map
                    Map<SpecializationType, Long> staffAssignments = dayAvailabilities.stream()
                            .collect(Collectors.toMap(
                                    availability -> availability.getSpecializationType(),
                                    availability -> availability.getStaff().getId()
                            ));
                    dailyResponse.setStaffAssignments(staffAssignments); // You need to add this field to DailyScheduleResponse

                    return dailyResponse;
                })
                .collect(Collectors.toList());

        WeeklyScheduleResponse response = new WeeklyScheduleResponse();
        response.setScheduleId(schedule.getId());
        response.setWeekStartDate(schedule.getWeekStartDate());
        response.setDailySchedules(dailySchedules);

        return response;
    }

    private WeeklyScheduleResponse buildStaffScheduleResponse(List<StaffAvailability> availabilities, LocalDate weekStart) {
        System.out.println("Building response for " + availabilities.size() + " availability records");

        List<DailyScheduleResponse> dailySchedules = availabilities.stream()
                .map(availability -> {
                    System.out.println("Processing availability: Day=" + availability.getDayOfWeek() + ", Specialization=" + availability.getSpecializationType());

                    DailyScheduleResponse dailyResponse = new DailyScheduleResponse();
                    dailyResponse.setDayOfWeek(availability.getDayOfWeek());
                    dailyResponse.setStartTime(availability.getStartTime());
                    dailyResponse.setEndTime(availability.getEndTime());
                    dailyResponse.setSlotDurationMinutes(availability.getSlotDurationMinutes());
                    dailyResponse.setSpecializationType(availability.getSpecializationType()); // You need to add this field

                    // Staff info for this specific assignment
                    StaffSummary staffInfo = new StaffSummary(
                            availability.getStaff().getId(),
                            availability.getStaff().getUser().getName(),
                            availability.getStaff().getEmployeeId()
                    );
                    dailyResponse.setStaffInfo(staffInfo); // You need to add this field to DailyScheduleResponse

                    return dailyResponse;
                })
                .collect(Collectors.toList());

        System.out.println("Built " + dailySchedules.size() + " daily schedule responses");

        WeeklyScheduleResponse response = new WeeklyScheduleResponse();
        response.setScheduleId(availabilities.isEmpty() ? null : availabilities.get(0).getWeeklySchedule().getId());
        response.setWeekStartDate(weekStart);
        response.setDailySchedules(dailySchedules);

        return response;
    }

    private String getDayName(Integer dayOfWeek) {
        return DayOfWeek.of(dayOfWeek).getDisplayName(TextStyle.FULL, Locale.ENGLISH);
    }
}