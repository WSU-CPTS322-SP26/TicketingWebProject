/*
 * Copyright (c) 2026
 * Washington State University
 * CptS 322 - Software Engineering Principles
 *
 * Author: Paramveer Singh
 * Project: Tickr
 *
 * Description:
 * Entity class representing the USERS table in the SUPABASE database.
 * Stores authentication and profile information for system users.
 */

package edu.wsu.cpts322.project.backend.database.users;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "users")
@Data
public class UsersEntity {

    @Id
    @Column(name = "user_id")
    private Long userId;

    @Column(name = "email_id", nullable = false, unique = true)
    private String emailId;

    @Column(name = "password", nullable = false)
    private String password;

    // Expected values: "manager" or "user"
    @Column(name = "role", nullable = false)
    private String role;

    @Column(name = "name")
    private String name;

    @Column(name = "phone")
    private String phone;

    @Column(name = "reward_points")
    private Integer rewardPoints;
}