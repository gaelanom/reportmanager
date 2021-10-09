package com.orcus.hha_report_manager.controller;

import com.orcus.hha_report_manager.security.JWSHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthenticationController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserDetailsService userDetailsService;

    @PostMapping("/authenticate")
    public AuthResponse authenticate(@RequestBody AuthRequest authRequest) throws Exception{
        try{
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword()));
            //If users can't be found, throw exception.
            var userDetails = userDetailsService.loadUserByUsername(authRequest.getUsername());
            return new AuthResponse(JWSHelper.makeJwt(userDetails),"tbd");
        }catch (AuthenticationException e){
        //     Todo: throw 403 with message
            throw  new Exception("Authentication failed");
        }
    }

    public static class AuthRequest{
        private String username;
        private String password;

        public AuthRequest(String username, String password) {
            this.username = username;
            this.password = password;
        }

        public String getUsername() {
            return username;
        }

        public void setUsername(String username) {
            this.username = username;
        }

        public String getPassword() {
            return password;
        }

        public void setPassword(String password) {
            this.password = password;
        }
    }

    public static class AuthResponse{
        private final String jwt;
        private final String department;

        public String getJwt() {
            return jwt;
        }

        public String getDepartment() {
            return department;
        }

        public AuthResponse(String jwt, String department) {
            this.jwt = jwt;
            this.department = department;
        }
    }
}
