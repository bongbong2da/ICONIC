package io.iconic.backend.repository;

import io.iconic.backend.model.UserChannel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserChannelRepository extends JpaRepository<UserChannel, Long> {

    Optional<List<UserChannel>> findUserChannelsByUsernameIsOrderByChannelIdxAsc(String username);

    @Modifying
    @Transactional
    @Query("delete from UserChannel uc where uc.username = :username and uc.channelIdx = :idx")
    void deleteByUsernameAndIdx(@Param("username") String username,@Param("idx") int idx);

}
