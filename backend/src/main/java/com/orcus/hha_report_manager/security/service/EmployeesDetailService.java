package com.orcus.hha_report_manager.security.service;

import com.orcus.hha_report_manager.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmployeesDetailService implements UserDetailsService {

    //Todo: delete this.
    final String DEV_USERNAME = "dev";
    final String DEV_PASSWORD = "12345";

    @Autowired
    EmployeeRepository employeeRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        if (username.equals(DEV_USERNAME))
            return makeDevUser();

        var found = employeeRepository.findByUsername(username);
        if (found.isEmpty())
            throw new UsernameNotFoundException(username + " not found");
        var employee = found.get(0);
        return new User(employee.getUsername(), employee.accessPassword(),
                true, true, true, true,
                employee.isDepartmentHead() ?
                        List.of(new SimpleGrantedAuthority("DEPARTMENT_HEAD")) :
                        List.of(new SimpleGrantedAuthority("USER")));
    }

    private UserDetails makeDevUser() {
        return new User(DEV_USERNAME, passwordEncoder.encode(DEV_PASSWORD),
                true, true, true, true,
                List.of(new SimpleGrantedAuthority("DEPARTMENT_HEAD")));
    }
}
