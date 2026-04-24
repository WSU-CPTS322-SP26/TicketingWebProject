package edu.wsu.cpts322.project.backend.database.bookings;

import edu.wsu.cpts322.project.backend.database.booking_seats.BookingSeatEntity;
import edu.wsu.cpts322.project.backend.database.showtimes.ShowtimeEntity;
import edu.wsu.cpts322.project.backend.database.users.UsersEntity;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

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
    @JsonIgnoreProperties({"password", "rewardPoints"})
    private UsersEntity user;

    @ManyToOne
    @JoinColumn(name = "showtime_id", nullable = false)
    @JsonIgnoreProperties({"availableSeats", "screen"})
    private ShowtimeEntity showtime;

    @Column(name = "booking_date")
    private LocalDateTime bookingDate;

    @Column(name = "status")
    private String status;

    @Column(name = "total_amount", precision = 10, scale = 2)
    private BigDecimal totalAmount;

    @Column(name = "is_offline")
    private Boolean isOffline;

    @Column(name = "rewards_earned")
    private Integer rewardsEarned;

    @OneToMany(mappedBy = "booking", cascade = CascadeType.ALL)
    @JsonIgnore
    @Builder.Default
    private Set<BookingSeatEntity> bookingSeats = new HashSet<>();

    /**
     * Human-readable seat labels for the frontend.
     */
    public List<String> getSeatLabels() {
        if (bookingSeats == null) return Collections.emptyList();
        return bookingSeats.stream()
                .map(BookingSeatEntity::getSeat)
                .filter(seat -> seat != null)
                .map(seat -> {
                    if (seat.getSeatRow() != null && seat.getSeatNumber() != null) {
                        return seat.getSeatRow() + "-" + seat.getSeatNumber();
                    }
                    return "Seat " + seat.getSeatId();
                })
                .sorted()
                .collect(Collectors.toList());
    }
}