package com.skill.shine.salon.user.repositary;


import com.skill.shine.salon.user.model.UserEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface UserRepositary extends JpaRepository<UserEntity, Long> {

    // Get all clients
    List<UserEntity> findByRole(String role);

    // Search by name (partial match) and role
    List<UserEntity> findByNameContainingIgnoreCaseAndRole(String name, String role);

    // Search by userId and role
    List<UserEntity> findByUserIdAndRole(String userId, String role);


    Optional<UserEntity> findByEmail(String email);

    Boolean existsByEmail(String email);

    // NEW: fetch a single user by public userId
    Optional<UserEntity> findByUserId(String userId);

    // NEW: page through staff
    Page<UserEntity> findByRole(String role, Pageable pageable);

    // NEW: search staff by name or email (case-insensitive)
    @Query("""
           select u 
           from UserEntity u 
           where u.role = :role 
             and (
                  :q is null 
                  or lower(u.name) like lower(concat('%', :q, '%')) 
                  or lower(u.email) like lower(concat('%', :q, '%'))
                 )
           """)



    Page<UserEntity> searchStaff(String role, String q, Pageable pageable);

    // NEW - used when updating email to ensure uniqueness
    boolean existsByEmailAndUserIdNot(String email, String userId);


    // NEW: Find user by UUID string
    @Query("SELECT u FROM UserEntity u WHERE u.id = :userId")
    Optional<UserEntity> findUserByUserId(@Param("userId") String userId);

    // NEW: Get client emails
    @Query("SELECT u.email FROM UserEntity u WHERE u.role = 'CLIENT'")
    List<String> findClientEmails();;





}
