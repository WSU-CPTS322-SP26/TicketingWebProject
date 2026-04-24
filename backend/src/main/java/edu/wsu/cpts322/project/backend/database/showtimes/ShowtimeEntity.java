package edu.wsu.cpts322.project.backend.database.showtimes;

import edu.wsu.cpts322.project.backend.database.movies.MovieEntity;
import edu.wsu.cpts322.project.backend.database.screens.ScreenEntity;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "showtimes")
@Data
public class ShowtimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "showtime_id")
    private Integer showtimeId;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "movie_id", nullable = false)
    @JsonIgnoreProperties({"durationMinutes", "rating", "posterUrl", "description"})  // keep it light
    private MovieEntity movie;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "screen_id", nullable = false)
    @JsonIgnoreProperties({"theater"})   // don't drill into theater from screen
    private ScreenEntity screen;

    @Column(name = "show_date", nullable = false)
    private LocalDate showDate;

    @Column(name = "show_time", nullable = false)
    private LocalTime showTime;

    @Column(name = "available_seats")
    private Integer availableSeats;

    @JsonProperty("theaterName")
    public String getTheaterName() {
        return screen != null && screen.getTheater() != null
                ? screen.getTheater().getName()
                : null;
    }
}