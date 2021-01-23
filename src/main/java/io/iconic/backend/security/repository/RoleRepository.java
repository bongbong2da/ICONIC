package io.iconic.backend.security.repository;

import io.iconic.backend.security.account.ERole;
import io.iconic.backend.security.account.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {

    Optional<Role> findByName(ERole name);

}
