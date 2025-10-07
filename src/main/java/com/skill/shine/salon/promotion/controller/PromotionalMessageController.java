package com.skill.shine.salon.promotion.controller;

import com.skill.shine.salon.promotion.dto.PromotionalMessageRequest;
import com.skill.shine.salon.promotion.dto.PromotionalMessageResponse;
import com.skill.shine.salon.promotion.service.PromotionalMessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/promotions")
@RequiredArgsConstructor



public class PromotionalMessageController {

    private final PromotionalMessageService promotionService;

    @PostMapping("/send")
    public ResponseEntity<PromotionalMessageResponse> sendPromotionalMessage(
            @RequestBody PromotionalMessageRequest request) {

        PromotionalMessageResponse response = promotionService.sendPromotionalMessage(request);
        return ResponseEntity.ok(response);
    }


    // Get all promotional messages
    @GetMapping("/all")
    public ResponseEntity<List<PromotionalMessageResponse>> getAllMessages() {
        List<PromotionalMessageResponse> messages = promotionService.getAllPromotionalMessages();
        return ResponseEntity.ok(messages);
    }


    // Delete a message by ID
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteMessage(@PathVariable Long id) {
        promotionService.deletePromotionalMessage(id);
        return ResponseEntity.ok("Promotional message deleted successfully");
    }

}
