package com.skill.shine.salon.services.controller;

import com.skill.shine.salon.services.dto.ServiceRequest;
import com.skill.shine.salon.services.dto.ServiceResponse;
import com.skill.shine.salon.services.service.SalonService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Paths;
import java.util.List;

@RestController
@RequestMapping("/services")
@RequiredArgsConstructor
public class ServiceController {

    private final SalonService salonService;

    // Relative folder inside backend project
    private final String UPLOAD_DIR = "uploads/";

    /** CREATE SERVICE WITH IMAGE */
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ServiceResponse create(
            @RequestParam String serviceName,
            @RequestParam String category,
            @RequestParam Double price,
            @RequestParam String description,
            @RequestParam("imageFile") MultipartFile imageFile) throws IOException {

        String imageUrl = saveFile(imageFile);

        ServiceRequest request = ServiceRequest.builder()
                .serviceName(serviceName)
                .category(category)
                .price(price)
                .description(description)
                .imageUrl(imageUrl)
                .build();

        return salonService.createService(request);
    }

    /** UPDATE SERVICE WITH OPTIONAL IMAGE */
    @PutMapping("/{id}")
    public ServiceResponse update(
            @PathVariable Long id,
            @RequestParam String serviceName,
            @RequestParam String category,
            @RequestParam Double price,
            @RequestParam String description,
            @RequestParam(value = "imageFile", required = false) MultipartFile imageFile) throws IOException {

        String imageUrl = null;
        if (imageFile != null && !imageFile.isEmpty()) {
            imageUrl = saveFile(imageFile);
        }

        ServiceRequest request = ServiceRequest.builder()
                .serviceName(serviceName)
                .category(category)
                .price(price)
                .description(description)
                .imageUrl(imageUrl)
                .build();

        return salonService.updateService(id, request);
    }

    /** DELETE SERVICE */
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        salonService.deleteService(id);
    }

    /** GET SERVICE BY ID */
    @GetMapping("/{id}")
    public ServiceResponse getById(@PathVariable Long id) {
        return salonService.getServiceById(id);
    }

    /** GET ALL SERVICES */
    @GetMapping
    public List<ServiceResponse> getAll() {
        return salonService.getAllServices();
    }

    /** GET SERVICES BY CATEGORY */
    @GetMapping("/category/{category}")
    public List<ServiceResponse> getByCategory(@PathVariable String category) {
        return salonService.getServicesByCategory(category);
    }

    /** HELPER METHOD TO SAVE IMAGE FILE */
    private String saveFile(MultipartFile file) throws IOException {
        File directory = new File(UPLOAD_DIR);
        if (!directory.exists()) directory.mkdirs();

        // Unique filename to avoid overwrite
        String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
        file.transferTo(Paths.get(UPLOAD_DIR, fileName));

        return fileName; // store filename in DB
    }
}
