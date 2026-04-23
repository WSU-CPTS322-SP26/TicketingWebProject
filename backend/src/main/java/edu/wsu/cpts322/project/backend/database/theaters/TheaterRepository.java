/*
 * Copyright (c) 2026
 * Washington State University
 * CptS 322 - Software Engineering Principles
 *
 * Author: Surakanti Srishanth Reddy
 * Project: Tickr
 *
 * Description:
 * Repository interface for accessing and managing THEATERS table records.
 * Provides CRUD operations and custom queries through Spring Data JPA.
 */

package edu.wsu.cpts322.project.backend.database.theaters;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface TheaterRepository extends JpaRepository<TheaterEntity, Integer> {

    // Find all active theaters
    List<TheaterEntity> findByIsActiveTrue();

    // Find theaters by location
    List<TheaterEntity> findByLocation(String location);

    // Find theaters by pin code
    List<TheaterEntity> findByPinCode(String pinCode);
}