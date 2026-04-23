/*
 * Copyright (c) 2026
 * Washington State University
 * CptS 322 - Software Engineering Principles
 *
 * Author: Surakanti Srishanth Reddy
 * Project: Tickr
 *
 * Description:
 * Entity class representing the SCREENS table in the Supabase database.
 * Each screen belongs to a theater and has a seating capacity.
 */

package edu.wsu.cpts322.project.backend.database.screens;

import edu.wsu.cpts322.project.backend.database.theaters.TheaterEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "screens")
@Data
public class ScreenEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "screen_id")
    private Integer screenId;

    @ManyToOne
    @JoinColumn(name = "theater_id", nullable = false)
    private TheaterEntity theater;

    @Column(name = "screen_name")
    private String screenName;

    @Column(name = "total_seats")
    private Integer totalSeats;
}