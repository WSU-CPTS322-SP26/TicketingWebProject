package edu.wsu.cpts322.project.backend.dto.bookings;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BookingResponseDto {
    private Integer bookingId;
    private String status;
    private BigDecimal totalAmount;
    private LocalDateTime bookingDate;
    private Boolean isOffline;
    private Integer rewardsEarned;

    // User info
    private Long userId;
    private String userName;
    private String userEmail;

    // Showtime info
    private Integer showtimeId;
    private String movieTitle;
    private String showDate;        // e.g. "2026-04-24"
    private String showTime;        // e.g. "15:30:00"
    private String theaterName;
    private String screenName;

    // Seat info
    private List<String> seatLabels;   // e.g. ["A-3", "B-7"]
}