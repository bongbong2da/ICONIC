package io.iconic.backend.repository;

import io.iconic.backend.model.Posting;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;

@Repository
public interface PostingRepository extends JpaRepository<Posting, Integer> {

    Page<List<Posting>> getAllByPostingChanIdxOrderByPostingRegDesc(int posting_chan_idx, Pageable pageable);

    @Query(value = "SELECT p FROM Posting p WHERE p.postingTitle LIKE %:keyword% OR p.postingContent like %:keyword% or p.postingWriter like %:keyword% and p.postingChanIdx = :chanIdx",
            countQuery = "SELECT count(p) FROM Posting p WHERE p.postingTitle LIKE %:keyword% OR p.postingContent like %:keyword% or p.postingWriter like %:keyword% and p.postingChanIdx = :chanIdx")
    Page<List<Posting>> getAllBySearchInQuery(@Param("chanIdx") int chanIdx, @Param("keyword") String keyword, Pageable pageable);

    @Modifying
    @Transactional
    void deletePostingByPostingIdx(int idx);

    Page<List<Posting>> getAllByPostingWriterAndPostingChanIdxOrderByPostingRegDesc(String writer, int chanIdx, Pageable pageable);

    Long countPostingsByPostingChanIdxAndPostingRegBetween(int chanIdx, Date begin, Date end);

}
