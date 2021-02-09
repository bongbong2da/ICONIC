package io.iconic.backend.controller;

import io.iconic.backend.model.Posting;
import io.iconic.backend.payload.request.PostingRequest;
import io.iconic.backend.repository.PostRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/post/*")
public class PostingController {

    private final Logger log = LoggerFactory.getLogger(PostingController.class);

    @Autowired
    private PostRepository postRepository;

    @GetMapping("/get")
    public ResponseEntity get(int idx) {

        Optional<List<Posting>> result = postRepository.getAllByPostingChanIdxIs(idx);

        return ResponseEntity.ok().body(result);
    }

    @PostMapping("/create")
    public ResponseEntity create(PostingRequest postingRequest) {
        Posting posting = new Posting(
                postingRequest.getPosting_idx(),
                postingRequest.getPosting_chan_idx(),
                postingRequest.getPosting_title(),
                postingRequest.getPosting_writer(),
                postingRequest.getPosting_emoji(),
                postingRequest.getPosting_content(),
                postingRequest.getPosting_isAttached(),
                postingRequest.getPosting_attach(),
                postingRequest.getPosting_reg()
        );

        try {
            postRepository.save(posting);

            return ResponseEntity.ok().body("CREATED");
        } catch (Exception e) {
            e.printStackTrace();

            return ResponseEntity.badRequest().body("FAILED");
        }
    }

}
