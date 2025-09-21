package com.skill.shine.salon.staff.model;

import com.skill.shine.salon.staff.model.StaffAvailability;
import com.skill.shine.salon.staff.model.StaffSpecialization;
import com.skill.shine.salon.user.model.UserEntity;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.List;

@Entity
public class StaffModel {
    @Id
    @GeneratedValue
    private Long id;

    @OneToOne
    @JoinColumn(name = "user_id")
    private UserEntity user;

    private String employeeId;
    private LocalDate hireDate;
    private Boolean isActive;

    @OneToMany(mappedBy = "staff")
    private List<StaffSpecialization> specializations;

    @OneToMany(mappedBy = "staff")
    private List<StaffAvailability> availabilities;

    public StaffModel() {
    }

    public StaffModel(Long staffId) {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public UserEntity getUser() {
        return user;
    }

    public void setUser(UserEntity user) {
        this.user = user;
    }

    public String getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(String employeeId) {
        this.employeeId = employeeId;
    }

    public LocalDate getHireDate() {
        return hireDate;
    }

    public void setHireDate(LocalDate hireDate) {
        this.hireDate = hireDate;
    }

    public Boolean getActive() {
        return isActive;
    }

    public void setActive(Boolean active) {
        isActive = active;
    }

    public List<StaffSpecialization> getSpecializations() {
        return specializations;
    }

    public void setSpecializations(List<StaffSpecialization> specializations) {
        this.specializations = specializations;
    }

    public List<StaffAvailability> getAvailabilities() {
        return availabilities;
    }

    public void setAvailabilities(List<StaffAvailability> availabilities) {
        this.availabilities = availabilities;
    }

}