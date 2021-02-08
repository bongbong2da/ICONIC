package io.iconic.backend.repository;

import io.iconic.backend.model.PublicChannel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PublicChannelRepository extends JpaRepository<PublicChannel, Integer> {

    Optional<PublicChannel> findPublicChannelBypChanIdx(int pChanIdx);

}
