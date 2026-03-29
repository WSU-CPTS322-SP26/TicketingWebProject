/*
 * Copyright (c) 2026
 * Washington State University
 * CptS 322 - Software Engineering Principles
 *
 * Author: Surakanti Srishanth Reddy
 * Project: Tickr
 *
 * Description:
 * REST controller for showtime-related API endpoints.
 * Provides public endpoints to retrieve showtimes by movie,
 * by date, and by screen.
 *
 * Endpoints:
 * GET /api/public/showtimes                             - Get all showtimes
 * GET /api/public/showtimes/{id}                        - Get showtime by ID
 * GET /api/public/showtimes/movie/{movieId}             - Get showtimes for a movie
 * GET /api/public/showtimes/date?date=YYYY-MM-DD        - Get showtimes by date
 * GET /api/public/showtimes/movie/{movieId}/date?date=  - Get showtimes for movie on date
 */

package edu.wsu.cpts322.project.backend.controllers.showtimes;

import edu.wsu.cpts322.project.backend.database.showtimes.ShowtimeEntity;
import edu.wsu.cpts322.project.backend.database.showtimes.ShowtimeRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/public/showtimes")
public class ShowtimeController {

    private final ShowtimeRepository showtimeRepository;

    public ShowtimeController(ShowtimeRepository showtimeRepository) {
        this.showtimeRepository = showtimeRepository;
    }

    /*
     * GET /api/public/showtimes
     * Returns all showtimes in the database.
     */
    @GetMapping
    public List<ShowtimeEntity> getAllShowtimes() {
        return showtimeRepository.findAll();
    }

    /*
     * GET /api/public/showtimes/{id}
     * Returns a single showtime by its ID.
     * Returns 404 if not found.
     */
    @GetMapping("/{id}")
    public ResponseEntity<ShowtimeEntity> getShowtimeById(@PathVariable Integer id) {
        return showtimeRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    /*
     * GET /api/public/showtimes/movie/{movieId}
     * Returns all showtimes for a specific movie.
     */
    @GetMapping("/movie/{movieId}")
    public List<ShowtimeEntity> getShowtimesByMovie(@PathVariable Integer movieId) {
        return showtimeRepository.findByMovie_MovieId(movieId);
    }

    /*
     * GET /api/public/showtimes/date?date=YYYY-MM-DD
     * Returns all showtimes on a specific date.
     */
    @GetMapping("/date")
    public List<ShowtimeEntity> getShowtimesByDate(@RequestParam LocalDate date) {
        return showtimeRepository.findByShowDate(date);
    }

    /*
     * GET /api/public/showtimes/movie/{movieId}/date?date=YYYY-MM-DD
     * Returns all showtimes for a specific movie on a specific date.
     */
    @GetMapping("/movie/{movieId}/date")
    public List<ShowtimeEntity> getShowtimesByMovieAndDate(
            @PathVariable Integer movieId,
            @RequestParam LocalDate date) {
        return showtimeRepository.findByMovie_MovieIdAndShowDate(movieId, date);
    }
}
