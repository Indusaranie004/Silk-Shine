package com.skill.shine.salon.config;

import com.skill.shine.salon.client.model.Client;
import com.skill.shine.salon.client.repository.ClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import java.time.LocalDateTime;


@Component
public class AdminDataLoader implements CommandLineRunner {

    @Autowired
    private ClientRepository clientRepository;

    @Override
    public void run(String... args) throws Exception {
        if (clientRepository.count() == 0) {
            System.out.println("Adding sample clients...");

            Client c1 = new Client();
            c1.setName("Emma Johnson");
            c1.setEmail("emma@email.com");
            c1.setRole("CLIENT");
            c1.setCreatedDate(LocalDateTime.now());

            Client c2 = new Client();
            c2.setName("William Smith");
            c2.setEmail("william@email.com");
            c2.setRole("CLIENT");
            c2.setCreatedDate(LocalDateTime.now());

            Client c3 = new Client();
            c3.setName("Olivia Brown");
            c3.setEmail("olivia@email.com");
            c3.setRole("CLIENT");
            c3.setCreatedDate(LocalDateTime.now());

            Client admin = new Client();
            admin.setName("Admin User");
            admin.setEmail("admin@salon.com");
            admin.setRole("ADMIN");
            admin.setCreatedDate(LocalDateTime.now());

            clientRepository.save(c1);
            clientRepository.save(c2);
            clientRepository.save(c3);
            clientRepository.save(admin);

            System.out.println("Sample data created!");
        }
    }
}




