package com.skill.shine.salon.staff.model;

import jakarta.persistence.*;

@Entity
public class StaffSpecialization {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "staff_id")
    private StaffModel staff;

    @Enumerated(EnumType.STRING)
    private SpecializationType type;

    public StaffModel getStaff() {
        return staff;
    }

    public void setStaff(StaffModel staff) {
        this.staff = staff;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public SpecializationType getType() {
        return type;
    }

    public void setType(SpecializationType type) {
        this.type = type;
    }
}