/*
 * Copyright (c) 2026
 * Washington State University
 * CptS 322 - Software Engineering Principles
 *
 * Author: Surakanti Srishanth Reddy
 * Project: Tickr
 *
 * Description:
 * Entity class representing the BOOKING_SEATS junction table in the Supabase database.
 * Links a booking to the specific seats reserved in that booking.
 */

package edu.wsu.cpts322.project.backend.database.booking_seats;

import edu.wsu.cpts322.project.backend.database.bookings.BookingEntity;
import edu.wsu.cpts322.project.backend.database.seats.SeatEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "booking_seats")
@Data
public class BookingSeatEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "booking_id", nullable = false)
    private BookingEntity booking;

    @ManyToOne
    @JoinColumn(name = "seat_id", nullable = false)
    private SeatEntity seat;
}