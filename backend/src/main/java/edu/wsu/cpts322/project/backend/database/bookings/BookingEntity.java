/*
 * Copyright (c) 2026
 * Washington State University
 * CptS 322 - Software Engineering Principles
 *
 * Author: Surakanti Srishanth Reddy
 * Project: Tickr
 *
 * Description:
 * Entity class representing the BOOKINGS table in the Supabase database.
 * Stores ticket order information linking a user to a showtime,
 * including payment totals, booking status, and rewards earned.
 */

package edu.wsu.cpts322.project.backend.database.bookings;

import edu.wsu.cpts322.project.backend.database.showtimes.ShowtimeEntity;
import edu.wsu.cpts322.project.backend.database.users.UsersEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "bookings")
@Data
public class BookingEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "booking_id")
    private Integer bookingId;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private UsersEntity user;

    @ManyToOne
    @JoinColumn(name = "showtime_id", nullable = false)
    private ShowtimeEntity showtime;

    @Column(name = "booking_date")
    private LocalDateTime bookingDate;

    // Expected values: "pending", "confirmed", "cancelled"
    @Column(name = "status")
    private String status;

    @Column(name = "total_amount", precision = 10, scale = 2)
    private BigDecimal totalAmount;

    // True if booking was made at the counter, false if online
    @Column(name = "is_offline")
    private Boolean isOffline;

    @Column(name = "rewards_earned")
    private Integer rewardsEarned;
}