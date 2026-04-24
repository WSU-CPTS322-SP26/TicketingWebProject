package edu.wsu.cpts322.project.backend.dto.bookings;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookingRequest {
    private Integer showtimeId;
    private List<Integer> seatIds;
    private Boolean isOffline;
    // could add payment info later
}
