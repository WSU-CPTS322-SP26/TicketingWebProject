/*
 * Copyright (c) 2026
 * Washington State University
 * CptS 322 - Software Engineering Principles
 *
 * Author: Surakanti Srishanth Reddy
 * Project: Tickr
 *
 * Description:
 * Entity class representing the SEATS table in the Supabase database.
 * Each seat belongs to a screen and has a type, status, and optional
 * block expiry timestamp for temporary seat holds during booking.
 */

package edu.wsu.cpts322.project.backend.database.seats;

import edu.wsu.cpts322.project.backend.database.screens.ScreenEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "seats")
@Data
public class SeatEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "seat_id")
    private Integer seatId;

    @ManyToOne
    @JoinColumn(name = "screen_id", nullable = false)
    private ScreenEntity screen;

    @Column(name = "seat_number")
    private String seatNumber;

    @Column(name = "seat_row")
    private String seatRow;

    @Column(name = "seat_type")
    private String seatType;

    @Column(name = "status")
    private String status;

    @Column(name = "block_expiry")
    private LocalDateTime blockExpiry;
}