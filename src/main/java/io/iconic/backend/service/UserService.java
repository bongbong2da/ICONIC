package io.iconic.backend.service;

import io.iconic.backend.security.account.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

@Service
public interface UserService extends JpaRepository<User, Long> {

}
