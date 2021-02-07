package io.iconic.backend.repository;

import io.iconic.backend.model.CreatedChannel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CreatedChannelRepository extends JpaRepository<CreatedChannel, Integer> {

    Optional<CreatedChannel> findCreatedChannelBycChanIdx(int cChan_idx);

}
