package edu.wsu.cpts322.project.backend.database.bookings;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface BookingRepository extends JpaRepository<BookingEntity, Integer> {

    List<BookingEntity> findByUser_UserId(Long userId);

    List<BookingEntity> findByShowtime_ShowtimeId(Integer showtimeId);

    List<BookingEntity> findByStatus(String status);

    List<BookingEntity> findByUser_UserIdAndStatus(Long userId, String status);

    // NEW: fetch seats eagerly to avoid lazy loading issues
    @Query("SELECT DISTINCT b FROM BookingEntity b " +
            "LEFT JOIN FETCH b.bookingSeats bs " +
            "LEFT JOIN FETCH bs.seat s " +
            "WHERE b.user.userId = :userId")
    List<BookingEntity> findByUser_UserIdWithSeats(@Param("userId") Long userId);
}