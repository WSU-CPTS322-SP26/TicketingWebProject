/*
 * Copyright (c) 2026
 * Washington State University
 * CptS 322 - Software Engineering Principles
 *
 * Author: Surakanti Srishanth Reddy
 * Project: Tickr
 *
 * Description:
 * Repository interface for accessing and managing SEATS table records.
 * Provides CRUD operations and custom queries through Spring Data JPA.
 */

package edu.wsu.cpts322.project.backend.database.seats;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface SeatRepository extends JpaRepository<SeatEntity, Integer> {

    // Find all seats in a specific screen
    List<SeatEntity> findByScreen_ScreenId(Integer screenId);

    // Find all available seats in a screen
    List<SeatEntity> findByScreen_ScreenIdAndStatus(Integer screenId, String status);

    // Find seats by type in a screen (e.g. "vip", "standard")
    List<SeatEntity> findByScreen_ScreenIdAndSeatType(Integer screenId, String seatType);
}