/*
 * Copyright (c) 2026
 * Washington State University
 * CptS 322 - Software Engineering Principles
 *
 * Author: Surakanti Srishanth Reddy
 * Project: Tickr
 *
 * Description:
 * Repository interface for accessing and managing MOVIES table records.
 * Provides CRUD operations and custom queries through Spring Data JPA.
 */

package edu.wsu.cpts322.project.backend.database.movies;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface MovieRepository extends JpaRepository<MovieEntity, Integer> {

    // Find movies by genre
    List<MovieEntity> findByGenre(String genre);

    // Find movies by rating (e.g. PG, PG-13, R)
    List<MovieEntity> findByRating(String rating);

    // Search movies by title (case-insensitive partial match)
    List<MovieEntity> findByTitleContainingIgnoreCase(String title);
}