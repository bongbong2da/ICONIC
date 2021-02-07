package io.iconic.backend.repository;

import io.iconic.backend.model.UserChannel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserChannelRepository extends JpaRepository<UserChannel, Long> {

    Optional<List<UserChannel>> getUserChannelsByUsername(String username);

}
