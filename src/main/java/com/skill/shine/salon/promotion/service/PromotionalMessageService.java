package com.skill.shine.salon.promotion.service;


import com.skill.shine.salon.promotion.dto.PromotionalMessageRequest;
import com.skill.shine.salon.promotion.dto.PromotionalMessageResponse;

import java.util.List;


public interface PromotionalMessageService {


    PromotionalMessageResponse sendPromotionalMessage(PromotionalMessageRequest request);


    List<PromotionalMessageResponse> getAllPromotionalMessages();


    void deletePromotionalMessage(Long id);


}
