/*
 * Copyright (c) 2026
 * Washington State University
 * CptS 322 - Software Engineering Principles
 *
 * Author: Surakanti Srishanth Reddy
 * Project: Tickr
 *
 * Description:
 * Entity class representing the PAYMENTS table in the Supabase database.
 * Stores payment information tied to a booking, including method,
 * status, amount, and transaction timestamp.
 */

package edu.wsu.cpts322.project.backend.database.payments;

import edu.wsu.cpts322.project.backend.database.bookings.BookingEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "payments")
@Data
public class PaymentEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "payment_id")
    private Integer paymentId;

    @ManyToOne
    @JoinColumn(name = "booking_id", nullable = false)
    private BookingEntity booking;

    @Column(name = "amount", precision = 10, scale = 2)
    private BigDecimal amount;

    // Expected values: "credit_card", "debit_card", "cash", "online"
    @Column(name = "payment_method")
    private String paymentMethod;

    // Expected values: "paid", "pending", "refunded", "failed"
    @Column(name = "payment_status")
    private String paymentStatus;

    @Column(name = "transaction_date")
    private LocalDateTime transactionDate;
}