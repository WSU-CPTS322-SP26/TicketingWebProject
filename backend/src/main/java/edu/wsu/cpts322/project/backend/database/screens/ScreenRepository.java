
/*
 * Copyright (c) 2026
 * Washington State University
 * CptS 322 - Software Engineering Principles
 *
 * Author: Surakanti Srishanth Reddy
 * Project: Tickr
 *
 * Description:
 * Repository interface for accessing and managing SCREENS table records.
 * Provides CRUD operations and custom queries through Spring Data JPA.
 */

package edu.wsu.cpts322.project.backend.database.screens;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ScreenRepository extends JpaRepository<ScreenEntity, Integer> {

    // Find all screens belonging to a specific theater
    List<ScreenEntity> findByTheater_TheaterId(Integer theaterId);
}