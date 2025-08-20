// ClientController.java
package com.skill.shine.salon.client.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ClientController {

    @GetMapping("/test")
    public String test() {
        return "Client module is working!";
    }
}