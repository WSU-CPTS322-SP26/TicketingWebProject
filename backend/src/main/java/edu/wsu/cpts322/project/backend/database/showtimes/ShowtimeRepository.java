/*
 * Copyright (c) 2026
 * Washington State University
 * CptS 322 - Software Engineering Principles
 *
 * Author: Surakanti Srishanth Reddy
 * Project: Tickr
 *
 * Description:
 * Repository interface for accessing and managing SHOWTIMES table records.
 * Provides CRUD operations and custom queries through Spring Data JPA.
 */

package edu.wsu.cpts322.project.backend.database.showtimes;

import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDate;
import java.util.List;

public interface ShowtimeRepository extends JpaRepository<ShowtimeEntity, Integer> {

    // Find all showtimes for a specific movie
    List<ShowtimeEntity> findByMovie_MovieId(Integer movieId);

    // Find all showtimes on a specific date
    List<ShowtimeEntity> findByShowDate(LocalDate showDate);

    // Find all showtimes for a movie on a specific date
    List<ShowtimeEntity> findByMovie_MovieIdAndShowDate(Integer movieId, LocalDate showDate);

    // Find all showtimes for a specific screen
    List<ShowtimeEntity> findByScreen_ScreenId(Integer screenId);

    // Find showtimes with available seats
    List<ShowtimeEntity> findByAvailableSeatsGreaterThan(Integer minSeats);
}