package io.iconic.backend.repository;

import io.iconic.backend.model.Channel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;

@Repository
public interface ChannelRespository extends JpaRepository<Channel, Integer> {

    Optional<Channel> findChannelByChanIdx(int chanIdx);

    Optional<List<Channel>> findAllByChanType(String type);

    Optional<Channel> findChannelByChanCode(String code);

}
