package com.skill.shine.salon.staff.repository;

import com.skill.shine.salon.staff.model.SpecializationType;
import com.skill.shine.salon.staff.model.StaffSpecialization;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StaffSpecializationRepository extends JpaRepository<StaffSpecialization, Long> {
    List<StaffSpecialization> findByType(SpecializationType type);
    List<StaffSpecialization> findByStaffId(Long staffId);

    @Query("SELECT s FROM StaffSpecialization s JOIN FETCH s.staff st JOIN FETCH st.user WHERE s.type = :type AND st.isActive = true")
    List<StaffSpecialization> findActiveStaffBySpecialization(@Param("type") SpecializationType type);
}
