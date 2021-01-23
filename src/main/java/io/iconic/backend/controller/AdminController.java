package io.iconic.backend.controller;

import io.iconic.backend.security.account.User;
import io.iconic.backend.security.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/admin/*")
public class AdminController {

    @Autowired
    UserRepository userRepository;

    @GetMapping("getUsers")
    public ResponseEntity getUsers() {
        List<User> users = userRepository.findAll();

        return ResponseEntity.ok().body(users);
    }


}
