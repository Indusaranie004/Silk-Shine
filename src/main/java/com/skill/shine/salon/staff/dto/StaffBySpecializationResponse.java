package com.skill.shine.salon.staff.dto;

import com.skill.shine.salon.staff.model.SpecializationType;

import java.util.List;
import java.util.Map;

public class StaffBySpecializationResponse {
    private Map<SpecializationType, List<StaffSummary>> staffBySpecialization;

    public StaffBySpecializationResponse(Map<SpecializationType, List<StaffSummary>> result) {
        this.staffBySpecialization = result;
    }

    public Map<SpecializationType, List<StaffSummary>> getStaffBySpecialization() {
        return staffBySpecialization;
    }

    public void setStaffBySpecialization(Map<SpecializationType, List<StaffSummary>> staffBySpecialization) {
        this.staffBySpecialization = staffBySpecialization;
    }
}