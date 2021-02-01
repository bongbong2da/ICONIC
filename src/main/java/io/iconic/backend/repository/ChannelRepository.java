package io.iconic.backend.repository;

import io.iconic.backend.model.CreatedChannel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChannelRepository extends JpaRepository<CreatedChannel, Integer> {


}
