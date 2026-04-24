package edu.wsu.cpts322.project.backend.database.seats;

import edu.wsu.cpts322.project.backend.database.screens.ScreenEntity;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
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
    @JsonIgnoreProperties({"theater", "totalSeats"})
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