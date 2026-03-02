/*
 * Copyright (c) 2026
 * Washington State University
 * CptS 322 - Software Engineering Principles
 *
 * Author: Paramveer Singh
 * Project: Tickr
 *
 * Description:
 * Service class responsible for loading user details from the Supabase
 * database for Spring Security authentication. Implements the UserDetailsService
 * interface and retrieves users using the UsersRepository based on their
 * email address. The retrieved UsersEntity is wrapped in DbUsersDetails
 * to provide Spring Security with the required authentication information.
 */

package edu.wsu.cpts322.project.backend.database.users;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class DbUsersDetailsService implements UserDetailsService {

    private final UsersRepository usersRepository;

    public DbUsersDetailsService(UsersRepository usersRepository) {
        this.usersRepository = usersRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        UsersEntity user = usersRepository.findByEmailId(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found: " + email));
        return new DbUsersDetails(user);
    }
}
