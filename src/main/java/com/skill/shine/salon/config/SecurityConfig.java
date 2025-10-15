package com.skill.shine.salon.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/auth/login", "/auth/forgot-password", "/auth/reset-password", "/*/register").permitAll()
                        .requestMatchers("/staff/").permitAll()          // display + register open for now
                        .requestMatchers("/client/").permitAll()// display + register open for now
                        .requestMatchers("/admin/").authenticated()       // tighten as you build auth
                        .requestMatchers("/services/**").permitAll()
                        .requestMatchers("/bookings/**").permitAll() // Bookings (optional: allow all for now, can secure later)
                        .requestMatchers("/payments/**").permitAll() // ✅ open for now
                        .requestMatchers("/contact/**").permitAll() // Contact Us
                        .requestMatchers("/dashboard/**").permitAll()  // ✅ allow dashboard APIs
                        .requestMatchers("/staff-salary/**").permitAll() // or add proper staff authentication later

                        .anyRequest().permitAll()
                );
        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}