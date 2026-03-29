/*
 * Copyright (c) 2026
 * Washington State University
 * CptS 322 - Software Engineering Principles
 *
 * Author: Surakanti Srishanth Reddy
 * Project: Tickr
 *
 * Description:
 * REST controller for movie-related API endpoints.
 * Provides public endpoints to retrieve movie listings,
 * search by genre, and look up individual movies by ID.
 *
 * Endpoints:
 * GET /api/public/movies                       - Get all movies
 * GET /api/public/movies/{id}                  - Get movie by ID
 * GET /api/public/movies/genre/{genre}         - Get movies by genre
 * GET /api/public/movies/search?title=value    - Search movies by title
 */

package edu.wsu.cpts322.project.backend.controllers.movies;

import edu.wsu.cpts322.project.backend.database.movies.MovieEntity;
import edu.wsu.cpts322.project.backend.database.movies.MovieRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/public/movies")
public class MovieController {

    private final MovieRepository movieRepository;

    public MovieController(MovieRepository movieRepository) {
        this.movieRepository = movieRepository;
    }

    /*
     * GET /api/public/movies
     * Returns a list of all movies in the database.
     */
    @GetMapping
    public List<MovieEntity> getAllMovies() {
        return movieRepository.findAll();
    }

    /*
     * GET /api/public/movies/{id}
     * Returns a single movie by its ID.
     * Returns 404 if the movie does not exist.
     */
    @GetMapping("/{id}")
    public ResponseEntity<MovieEntity> getMovieById(@PathVariable Integer id) {
        return movieRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    /*
     * GET /api/public/movies/genre/{genre}
     * Returns all movies matching the given genre.
     */
    @GetMapping("/genre/{genre}")
    public List<MovieEntity> getMoviesByGenre(@PathVariable String genre) {
        return movieRepository.findByGenre(genre);
    }

    /*
     * GET /api/public/movies/search?title=value
     * Returns all movies whose title contains the search term (case-insensitive).
     */
    @GetMapping("/search")
    public List<MovieEntity> searchMovies(@RequestParam String title) {
        return movieRepository.findByTitleContainingIgnoreCase(title);
    }
}
