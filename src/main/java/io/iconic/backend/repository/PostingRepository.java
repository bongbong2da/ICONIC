package io.iconic.backend.repository;

import io.iconic.backend.model.Posting;
import org.springframework.boot.autoconfigure.data.web.SpringDataWebProperties;
import org.springframework.data.domain.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.QueryByExampleExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PostingRepository extends JpaRepository<Posting, Integer> {

    Page<List<Posting>> getAllByPostingChanIdxOrderByPostingRegDesc(int posting_chan_idx, Pageable pageable);

}
