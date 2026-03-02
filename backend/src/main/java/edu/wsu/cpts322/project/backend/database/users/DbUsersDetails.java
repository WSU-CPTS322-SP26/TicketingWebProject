/*
 * Copyright (c) 2026
 * Washington State University
 * CptS 322 - Software Engineering Principles
 *
 * Author: Paramveer Singh
 * Project: Tickr
 *
 * Description:
 * Implementation of Spring Security's UserDetails interface for users stored
 * in the Supabase database. This class adapts the UsersEntity model to the
 * format required by Spring Security for authentication and authorization.
 * It exposes user credentials, roles, and account status information used
 * during the login and security verification process.
 */

package edu.wsu.cpts322.project.backend.database.users;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

public class DbUsersDetails implements UserDetails {

    private final UsersEntity user;
    public DbUsersDetails(UsersEntity user) {
        this.user = user;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        // Spring expects roles like ROLE_ADMIN, ROLE_USER
        String role = user.getRole(); // "ADMIN" or "USER"
        return List.of(new SimpleGrantedAuthority("ROLE_" + role));
    }

    @Override
    public String getPassword() {
        return user.getPassword();
    }

    @Override
    public String getUsername() {
        return user.getEmailId();
    }

    @Override public boolean isAccountNonExpired() { return true; }
    @Override public boolean isAccountNonLocked() { return true; }
    @Override public boolean isCredentialsNonExpired() { return true; }
    @Override public boolean isEnabled() { return true; }
}
