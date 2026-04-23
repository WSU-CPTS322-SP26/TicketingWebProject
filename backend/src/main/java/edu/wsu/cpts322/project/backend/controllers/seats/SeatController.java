/*
 * Copyright (c) 2026
 * Washington State University
 * CptS 322 - Software Engineering Principles
 *
 * Author: Surakanti Srishanth Reddy
 * Project: Tickr
 *
 * Description:
 * REST controller for seat-related API endpoints.
 * Provides public endpoints to retrieve seats by screen,
 * filter by availability status, and filter by seat type.
 *
 * Endpoints:
 * GET /api/public/seats/screen/{screenId}               - Get all seats for a screen
 * GET /api/public/seats/screen/{screenId}/available     - Get available seats only
 * GET /api/public/seats/screen/{screenId}/type/{type}   - Get seats by type
 */

package edu.wsu.cpts322.project.backend.controllers.seats;

import edu.wsu.cpts322.project.backend.database.seats.SeatEntity;
import edu.wsu.cpts322.project.backend.database.seats.SeatRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/public/seats")
public class SeatController {

    private final SeatRepository seatRepository;

    public SeatController(SeatRepository seatRepository) {
        this.seatRepository = seatRepository;
    }

    /*
     * GET /api/public/seats/screen/{screenId}
     * Returns all seats belonging to a specific screen.
     */
    @GetMapping("/screen/{screenId}")
    public List<SeatEntity> getSeatsByScreen(@PathVariable Integer screenId) {
        return seatRepository.findByScreen_ScreenId(screenId);
    }

    /*
     * GET /api/public/seats/screen/{screenId}/available
     * Returns only available seats for a specific screen.
     */
    @GetMapping("/screen/{screenId}/available")
    public List<SeatEntity> getAvailableSeats(@PathVariable Integer screenId) {
        return seatRepository.findByScreen_ScreenIdAndStatus(screenId, "available");
    }

    /*
     * GET /api/public/seats/screen/{screenId}/type/{type}
     * Returns seats filtered by type (e.g. "standard", "vip", "accessible").
     */
    @GetMapping("/screen/{screenId}/type/{type}")
    public List<SeatEntity> getSeatsByType(
            @PathVariable Integer screenId,
            @PathVariable String type) {
        return seatRepository.findByScreen_ScreenIdAndSeatType(screenId, type);
    }
}
