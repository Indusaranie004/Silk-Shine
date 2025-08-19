// src/main/java/com/skill/shine/salon/admin/controller/AdminController.java
package com.skill.shine.salon.admin.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AdminController {
    @GetMapping("/admin")
    public String admin() {
        return "Admin module is ready";
    }
}