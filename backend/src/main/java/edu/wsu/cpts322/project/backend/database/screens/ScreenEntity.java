package edu.wsu.cpts322.project.backend.database.screens;

import edu.wsu.cpts322.project.backend.database.theaters.TheaterEntity;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
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

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "theater_id", nullable = false)
    @JsonIgnoreProperties("screens")    // prevent theater -> screens loop
    private TheaterEntity theater;

    @Column(name = "screen_name")
    private String screenName;

    @Column(name = "total_seats")
    private Integer totalSeats;
}