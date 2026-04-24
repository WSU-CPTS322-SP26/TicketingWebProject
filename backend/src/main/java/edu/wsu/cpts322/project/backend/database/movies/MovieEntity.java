package edu.wsu.cpts322.project.backend.database.movies;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "movies")
@Data
public class MovieEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "movie_id")
    private Integer movieId;

    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "description", columnDefinition = "text")
    private String description;

    @Column(name = "genre")
    private String genre;

    @Column(name = "duration_minutes")
    private Integer durationMinutes;

    @Column(name = "rating")
    private String rating;

    @Column(name = "poster_url", columnDefinition = "text")
    private String posterUrl;
}