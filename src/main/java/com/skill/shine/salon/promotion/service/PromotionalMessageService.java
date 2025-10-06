package com.skill.shine.salon.promotion.service;


import com.skill.shine.salon.promotion.dto.PromotionalMessageRequest;
import com.skill.shine.salon.promotion.dto.PromotionalMessageResponse;


public interface PromotionalMessageService {


    PromotionalMessageResponse sendPromotionalMessage(PromotionalMessageRequest request, String adminUserId);





}
