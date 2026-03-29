/*
 * Copyright (c) 2026
 * Washington State University
 * CptS 322 - Software Engineering Principles
 *
 * Author: Surakanti Srishanth Reddy
 * Project: Tickr
 *
 * Description:
 * Repository interface for accessing and managing BOOKING_SEATS table records.
 * Provides CRUD operations and custom queries through Spring Data JPA.
 */

package edu.wsu.cpts322.project.backend.database.booking_seats;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface BookingSeatRepository extends JpaRepository<BookingSeatEntity, Integer> {

    // Find all seat entries for a specific booking
    List<BookingSeatEntity> findByBooking_BookingId(Integer bookingId);

    // Find all bookings that include a specific seat
    List<BookingSeatEntity> findBySeat_SeatId(Integer seatId);
}

