/*
 * Copyright (c) 2026
 * Washington State University
 * CptS 322 - Software Engineering Principles
 *
 * Author: Surakanti Srishanth Reddy
 * Project: Tickr
 *
 * Description:
 * REST controller for booking-related API endpoints.
 * Provides authenticated endpoints to create bookings,
 * retrieve a user's bookings, and cancel bookings.
 *
 * Endpoints:
 * POST /api/user/bookings                  - Create a new booking
 * GET  /api/user/bookings/user/{userId}    - Get all bookings for a user
 * GET  /api/user/bookings/{id}             - Get booking by ID
 * PUT  /api/user/bookings/{id}/cancel      - Cancel a booking
 */

package edu.wsu.cpts322.project.backend.controllers.bookings;

import edu.wsu.cpts322.project.backend.database.bookings.BookingEntity;
import edu.wsu.cpts322.project.backend.database.bookings.BookingRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user/bookings")
public class BookingController {

    private final BookingRepository bookingRepository;

    public BookingController(BookingRepository bookingRepository) {
        this.bookingRepository = bookingRepository;
    }

    /*
     * POST /api/user/bookings
     * Creates a new booking. Requires authentication.
     * The booking object is passed in the request body as JSON.
     */
    @PostMapping
    public BookingEntity createBooking(@RequestBody BookingEntity booking) {
        return bookingRepository.save(booking);
    }

    /*
     * GET /api/user/bookings/user/{userId}
     * Returns all bookings for a specific user. Requires authentication.
     */
    @GetMapping("/user/{userId}")
    public List<BookingEntity> getBookingsByUser(@PathVariable Long userId) {
        return bookingRepository.findByUser_UserId(userId);
    }

    /*
     * GET /api/user/bookings/{id}
     * Returns a single booking by its ID. Requires authentication.
     * Returns 404 if the booking does not exist.
     */
    @GetMapping("/{id}")
    public ResponseEntity<BookingEntity> getBookingById(@PathVariable Integer id) {
        return bookingRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    /*
     * PUT /api/user/bookings/{id}/cancel
     * Cancels a booking by setting its status to "cancelled".
     * Returns 404 if the booking does not exist.
     */
    @PutMapping("/{id}/cancel")
    public ResponseEntity<BookingEntity> cancelBooking(@PathVariable Integer id) {
        return bookingRepository.findById(id)
                .map(booking -> {
                    booking.setStatus("cancelled");
                    return ResponseEntity.ok(bookingRepository.save(booking));
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
