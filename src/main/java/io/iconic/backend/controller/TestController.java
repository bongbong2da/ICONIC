package io.iconic.backend.controller;

import io.iconic.backend.security.JwtUtils;
import io.iconic.backend.security.account.ERole;
import io.iconic.backend.security.account.Role;
import io.iconic.backend.security.account.User;
import io.iconic.backend.security.payload.request.SignUpRequest;
import io.iconic.backend.security.repository.RoleRepository;
import io.iconic.backend.security.repository.UserRepository;
import io.iconic.backend.security.service.UserDetailsServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.Enumeration;
import java.util.HashSet;
import java.util.Iterator;
import java.util.Set;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping(value = "/test/*")
public class TestController {

    @PutMapping("/put")
    public ResponseEntity testPut(HttpServletRequest request) {
        System.out.println("Requested URI : " + request.getRequestURI());
        System.out.println("=======HEADERS=======");
        Enumeration enumeration = request.getHeaderNames();
        while (enumeration.hasMoreElements()) {
            String headerName = (String)enumeration.nextElement();
            System.out.println(headerName + " : " + request.getHeader(headerName));
        }

        return ResponseEntity.ok().body("PUT METHOD CALLED OK...");
    }

}
