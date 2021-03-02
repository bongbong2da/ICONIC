package io.iconic.backend.repository;

import io.iconic.backend.model.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Integer> {

    Optional<List<Comment>> getAllByPostingIdxOrderByCommentIdxDesc(int idx);

    @Modifying
    @Transactional
    void deleteCommentByCommentIdx(int idx);

    Long countCommentsByPostingIdx(int idx);

}
