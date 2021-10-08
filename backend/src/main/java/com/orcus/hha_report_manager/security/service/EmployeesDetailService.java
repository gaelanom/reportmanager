package com.orcus.hha_report_manager.security.service;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmployeesDetailService implements UserDetailsService {
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        //Todo: hook into jpa
        final var pw = new BCryptPasswordEncoder().encode("12345");
        return new User(username, pw,
                true, true, true, true,
                List.of(new SimpleGrantedAuthority("DEPARTMENT_HEAD")));
    }
}
