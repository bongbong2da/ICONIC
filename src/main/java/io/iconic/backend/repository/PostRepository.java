package io.iconic.backend.repository;

import io.iconic.backend.model.Posting;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PostRepository extends JpaRepository<Posting, Integer> {

    Optional<List<Posting>> getAllByPostingChanIdxOrderByPostingRegDesc(int posting_chan_idx);

}
