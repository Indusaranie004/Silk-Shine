// src/main/java/com/skill/shine/salon/staff/controller/StaffController.java
package com.skill.shine.salon.staff.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class StaffController {
    @GetMapping("/staff")
    public String staff() {
        return "Staff module is ready";
    }
}