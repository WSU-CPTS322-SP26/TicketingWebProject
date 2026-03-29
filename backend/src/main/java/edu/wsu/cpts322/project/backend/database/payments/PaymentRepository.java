/*
 * Copyright (c) 2026
 * Washington State University
 * CptS 322 - Software Engineering Principles
 *
 * Author: Surakanti Srishanth Reddy
 * Project: Tickr
 *
 * Description:
 * Repository interface for accessing and managing PAYMENTS table records.
 * Provides CRUD operations and custom queries through Spring Data JPA.
 */

package edu.wsu.cpts322.project.backend.database.payments;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface PaymentRepository extends JpaRepository<PaymentEntity, Integer> {

    // Find payment for a specific booking
    Optional<PaymentEntity> findByBooking_BookingId(Integer bookingId);

    // Find all payments by status (e.g. "paid", "refunded")
    List<PaymentEntity> findByPaymentStatus(String paymentStatus);

    // Find all payments by method (e.g. "credit_card", "cash")
    List<PaymentEntity> findByPaymentMethod(String paymentMethod);
}