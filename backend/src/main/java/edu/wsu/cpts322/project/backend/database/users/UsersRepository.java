/*
 * Copyright (c) 2026
 * Washington State University
 * CptS 322 - Software Engineering Principles
 *
 * Author: Paramveer Singh
 * Project: Tickr
 *
 * Description:
 * Repository interface for accessing and managing USERS table records
 * in the Supabase database. Provides CRUD operations through Spring
 * Data JPA and custom query methods for user lookup.
 */

package edu.wsu.cpts322.project.backend.database.users;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UsersRepository extends JpaRepository<UsersEntity, Long> {
    Optional<UsersEntity> findByEmailId(String emailId);
}
