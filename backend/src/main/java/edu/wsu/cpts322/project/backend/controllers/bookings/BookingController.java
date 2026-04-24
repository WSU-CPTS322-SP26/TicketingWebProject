package edu.wsu.cpts322.project.backend.controllers.bookings;

import edu.wsu.cpts322.project.backend.database.booking_seats.BookingSeatEntity;
import edu.wsu.cpts322.project.backend.database.booking_seats.BookingSeatRepository;
import edu.wsu.cpts322.project.backend.database.bookings.BookingEntity;
import edu.wsu.cpts322.project.backend.database.bookings.BookingRepository;
import edu.wsu.cpts322.project.backend.database.seats.SeatEntity;
import edu.wsu.cpts322.project.backend.database.seats.SeatRepository;
import edu.wsu.cpts322.project.backend.database.showtimes.ShowtimeEntity;
import edu.wsu.cpts322.project.backend.database.showtimes.ShowtimeRepository;
import edu.wsu.cpts322.project.backend.database.users.UsersEntity;
import edu.wsu.cpts322.project.backend.database.users.UsersRepository;
import edu.wsu.cpts322.project.backend.dto.bookings.BookingRequest;
import edu.wsu.cpts322.project.backend.dto.bookings.BookingResponseDto;
import edu.wsu.cpts322.project.backend.services.bookings.BookingService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/user/bookings")
public class BookingController {

    private final BookingRepository bookingRepository;
    private final BookingService bookingService;
    private final UsersRepository usersRepository;
    private final BookingSeatRepository bookingSeatRepository;
    private final SeatRepository seatRepository;
    private final ShowtimeRepository showtimeRepository;

    public BookingController(BookingRepository bookingRepository,
                             BookingService bookingService,
                             UsersRepository usersRepository,
                             BookingSeatRepository bookingSeatRepository,
                             SeatRepository seatRepository,
                             ShowtimeRepository showtimeRepository) {
        this.bookingRepository = bookingRepository;
        this.bookingService = bookingService;
        this.usersRepository = usersRepository;
        this.bookingSeatRepository = bookingSeatRepository;
        this.seatRepository = seatRepository;
        this.showtimeRepository = showtimeRepository;
    }

    @PostMapping
    public ResponseEntity<?> createBooking(@RequestBody BookingRequest request) {
        try {
            String email = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            BookingEntity booking = bookingService.createBooking(email, request);
            return ResponseEntity.ok(booking);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    // This now returns DTOs, which contain seatLabels as plain strings
    @GetMapping("/user/{userId}")
    public List<BookingResponseDto> getBookingsByUser(@PathVariable Long userId) {
        return bookingService.getBookingsForUser(userId);
    }

    @GetMapping("/{id}")
    public ResponseEntity<BookingEntity> getBookingById(@PathVariable Integer id) {
        return bookingRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}/cancel")
    public ResponseEntity<?> cancelBooking(@PathVariable Integer id) {
        try {
            String email = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

            BookingEntity booking = bookingRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Booking not found"));

            UsersEntity currentUser = usersRepository.findByEmailId(email)
                    .orElseThrow(() -> new RuntimeException("User not found"));
            if (!booking.getUser().getUserId().equals(currentUser.getUserId())) {
                return ResponseEntity.status(403).body(Map.of("error", "You can only cancel your own bookings"));
            }

            if ("cancelled".equalsIgnoreCase(booking.getStatus())) {
                return ResponseEntity.badRequest().body(Map.of("error", "Booking already cancelled"));
            }

            List<BookingSeatEntity> seatLinks = bookingSeatRepository.findByBooking_BookingId(id);
            for (BookingSeatEntity link : seatLinks) {
                SeatEntity seat = link.getSeat();
                seat.setStatus("available");
                seat.setBlockExpiry(null);
                seatRepository.save(seat);
                bookingSeatRepository.delete(link);
            }

            ShowtimeEntity showtime = booking.getShowtime();
            showtime.setAvailableSeats(showtime.getAvailableSeats() + seatLinks.size());
            showtimeRepository.save(showtime);

            booking.setStatus("cancelled");
            bookingRepository.save(booking);

            return ResponseEntity.ok(Map.of("message", "Booking cancelled successfully"));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
}