package edu.wsu.cpts322.project.backend.services.bookings;

import edu.wsu.cpts322.project.backend.database.bookings.BookingEntity;
import edu.wsu.cpts322.project.backend.database.bookings.BookingRepository;
import edu.wsu.cpts322.project.backend.database.booking_seats.BookingSeatEntity;
import edu.wsu.cpts322.project.backend.database.booking_seats.BookingSeatRepository;
import edu.wsu.cpts322.project.backend.database.seats.SeatEntity;
import edu.wsu.cpts322.project.backend.database.seats.SeatRepository;
import edu.wsu.cpts322.project.backend.database.showtimes.ShowtimeEntity;
import edu.wsu.cpts322.project.backend.database.showtimes.ShowtimeRepository;
import edu.wsu.cpts322.project.backend.database.users.UsersEntity;
import edu.wsu.cpts322.project.backend.database.users.UsersRepository;
import edu.wsu.cpts322.project.backend.dto.bookings.BookingRequest;
import edu.wsu.cpts322.project.backend.dto.bookings.BookingResponseDto;
import org.hibernate.Hibernate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class BookingService {

    private final BookingRepository bookingRepository;
    private final BookingSeatRepository bookingSeatRepository;
    private final SeatRepository seatRepository;
    private final ShowtimeRepository showtimeRepository;
    private final UsersRepository usersRepository;

    public BookingService(BookingRepository bookingRepository,
                          BookingSeatRepository bookingSeatRepository,
                          SeatRepository seatRepository,
                          ShowtimeRepository showtimeRepository,
                          UsersRepository usersRepository) {
        this.bookingRepository = bookingRepository;
        this.bookingSeatRepository = bookingSeatRepository;
        this.seatRepository = seatRepository;
        this.showtimeRepository = showtimeRepository;
        this.usersRepository = usersRepository;
    }

    @Transactional
    public BookingEntity createBooking(String userEmail, BookingRequest request) {
        UsersEntity user = usersRepository.findByEmailId(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        ShowtimeEntity showtime = showtimeRepository.findById(request.getShowtimeId())
                .orElseThrow(() -> new RuntimeException("Showtime not found"));

        List<SeatEntity> seats = seatRepository.findAllById(request.getSeatIds());
        if (seats.size() != request.getSeatIds().size()) {
            throw new RuntimeException("One or more seats not found");
        }

        Integer screenId = showtime.getScreen().getScreenId();
        for (SeatEntity seat : seats) {
            if (!seat.getScreen().getScreenId().equals(screenId)) {
                throw new RuntimeException("Seat " + seat.getSeatId() + " does not belong to this screen");
            }
            if ("sold".equalsIgnoreCase(seat.getStatus()) || "booked".equalsIgnoreCase(seat.getStatus())) {
                throw new RuntimeException("Seat " + seat.getSeatId() + " is already booked");
            }
        }

        BookingEntity booking = BookingEntity.builder()
                .user(user)
                .showtime(showtime)
                .bookingDate(LocalDateTime.now())
                .status("confirmed")
                .totalAmount(calculateTotal(seats, request))
                .isOffline(request.getIsOffline() != null ? request.getIsOffline() : false)
                .rewardsEarned(0)
                .build();

        booking = bookingRepository.save(booking);

        for (SeatEntity seat : seats) {
            BookingSeatEntity bs = BookingSeatEntity.builder()
                    .booking(booking)
                    .seat(seat)
                    .build();
            bookingSeatRepository.save(bs);

            seat.setStatus("booked");
            seat.setBlockExpiry(null);
            seatRepository.save(seat);
        }

        int newAvailable = showtime.getAvailableSeats() - seats.size();
        if (newAvailable < 0) {
            throw new RuntimeException("Not enough available seats");
        }
        showtime.setAvailableSeats(newAvailable);
        showtimeRepository.save(showtime);

        return booking;
    }

    @Transactional(readOnly = true)
    public List<BookingResponseDto> getBookingsForUser(Long userId) {
        // Use the JOIN FETCH query – all seat data is already loaded
        List<BookingEntity> bookings = bookingRepository.findByUser_UserIdWithSeats(userId);

        return bookings.stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    private BookingResponseDto toDto(BookingEntity b) {
        List<String> seatLabels = b.getSeatLabels();    // now safe – collection already initialized

        // Showtime may be null if it was set to null on delete (but normally not)
        String movieTitle = "";
        String showDate = "";
        String showTime = "";
        String theaterName = "";
        String screenName = "";
        Integer showtimeId = null;

        if (b.getShowtime() != null) {
            showtimeId = b.getShowtime().getShowtimeId();
            if (b.getShowtime().getMovie() != null) {
                movieTitle = b.getShowtime().getMovie().getTitle();
            }
            showDate = b.getShowtime().getShowDate() != null ? b.getShowtime().getShowDate().toString() : "";
            showTime = b.getShowtime().getShowTime() != null ? b.getShowtime().getShowTime().toString() : "";
            if (b.getShowtime().getScreen() != null) {
                screenName = b.getShowtime().getScreen().getScreenName();
                if (b.getShowtime().getScreen().getTheater() != null) {
                    theaterName = b.getShowtime().getScreen().getTheater().getName();
                }
            }
        }

        return BookingResponseDto.builder()
                .bookingId(b.getBookingId())
                .status(b.getStatus())
                .totalAmount(b.getTotalAmount())
                .bookingDate(b.getBookingDate())
                .isOffline(b.getIsOffline())
                .rewardsEarned(b.getRewardsEarned())
                .userId(b.getUser().getUserId())
                .userName(b.getUser().getName())
                .userEmail(b.getUser().getEmailId())
                .showtimeId(showtimeId)
                .movieTitle(movieTitle)
                .showDate(showDate)
                .showTime(showTime)
                .theaterName(theaterName)
                .screenName(screenName)
                .seatLabels(seatLabels)
                .build();
    }

    private BigDecimal calculateTotal(List<SeatEntity> seats, BookingRequest request) {
        return BigDecimal.valueOf(seats.size() * 10.0);
    }
}