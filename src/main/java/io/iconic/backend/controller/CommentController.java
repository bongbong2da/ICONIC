package io.iconic.backend.controller;

import io.iconic.backend.model.Comment;
import io.iconic.backend.payload.request.CommentCreateRequest;
import io.iconic.backend.repository.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/comment/**/*")
public class CommentController {

    @Autowired
    private CommentRepository commentRepository;

    @GetMapping("getComments")
    public ResponseEntity getComments(int idx) {

        Optional<List<Comment>> result = commentRepository.getAllByPostingIdxOrderByCommentIdxAsc(idx);

        return ResponseEntity.ok().body(result);
    }

    @PostMapping("create")
    public ResponseEntity createComments(CommentCreateRequest request) {

        Comment result = new Comment();

        result.setCommentContent(request.getCommentContent());
        result.setPostingIdx(request.getPostingIdx());
        result.setCommentEmoji(request.getCommentEmoji());
        result.setCommentWriter(request.getCommentWriter());
        result.setCommentReg(new Date());

        try {
            commentRepository.save(result);
            return ResponseEntity.ok().body("COMMENT_CREATED");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.ok().body("COMMENT_CREATE_FAILED");
        }
    }

    @PostMapping("delete/{idx}")
    public ResponseEntity createComments(@PathVariable int idx) {
        try {
            commentRepository.deleteCommentByCommentIdx(idx);
            return ResponseEntity.ok().body("COMMENT_DELETED");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.ok().body("COMMENT_DELETE_FAILED");
        }
    }

    @GetMapping("getCommentsCount")
    public ResponseEntity getCommentsCount(int idx) {
        Long result = commentRepository.countCommentsByPostingIdx(idx);

        return ResponseEntity.ok().body(result);
    }

}
