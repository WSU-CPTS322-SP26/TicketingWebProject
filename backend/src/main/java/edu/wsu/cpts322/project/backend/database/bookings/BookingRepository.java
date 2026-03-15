/*
 * Copyright (c) 2026
 * Washington State University
 * CptS 322 - Software Engineering Principles
 *
 * Author: Surakanti Srishanth Reddy
 * Project: Tickr
 *
 * Description:
 * Repository interface for accessing and managing BOOKINGS table records.
 * Provides CRUD operations and custom queries through Spring Data JPA.
 */

package edu.wsu.cpts322.project.backend.database.bookings;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface BookingRepository extends JpaRepository<BookingEntity, Integer> {

    // Find all bookings for a specific user
    List<BookingEntity> findByUser_UserId(Long userId);

    // Find all bookings for a specific showtime
    List<BookingEntity> findByShowtime_ShowtimeId(Integer showtimeId);

    // Find bookings by status (e.g. "confirmed", "cancelled")
    List<BookingEntity> findByStatus(String status);

    // Find all bookings for a user filtered by status
    List<BookingEntity> findByUser_UserIdAndStatus(Long userId, String status);
}