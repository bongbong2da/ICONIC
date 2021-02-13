package io.iconic.backend.controller;

import io.iconic.backend.model.Posting;
import io.iconic.backend.payload.request.PostingRequest;
import io.iconic.backend.repository.PostingRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.Optional;


@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/posting/*")
public class PostingController {

    private final Logger log = LoggerFactory.getLogger(PostingController.class);

    @Autowired
    private PostingRepository postingRepository;

    @GetMapping("/get/{chanIdx}/{page}")
    public ResponseEntity get(@PathVariable int chanIdx, @PathVariable int page) {
        Page<List<Posting>> result = postingRepository.getAllByPostingChanIdxOrderByPostingRegDesc(chanIdx, PageRequest.of(page, 8));
        return ResponseEntity.ok().body(result);
    }

    @PostMapping("/create")
    public ResponseEntity create(PostingRequest postingRequest) {
        log.info(postingRequest.toString());
        Posting posting = new Posting(
                postingRequest.getPosting_idx(),
                postingRequest.getPosting_chan_idx(),
                postingRequest.getPosting_title(),
                postingRequest.getPosting_writer(),
                postingRequest.getPosting_emoji(),
                postingRequest.getPosting_content(),
                postingRequest.getPosting_isAttached(),
                postingRequest.getPosting_attach(),
                new Date()
        );

        try {
            postingRepository.save(posting);

            return ResponseEntity.ok().body("CREATED");
        } catch (Exception e) {
            e.printStackTrace();

            return ResponseEntity.badRequest().body("FAILED");
        }
    }

    @PostMapping("/search/{chanIdx}/{keyword}")
    public ResponseEntity serachByKeyword(
            @PathVariable("keyword") String keyword,
            @PathVariable("chanIdx") int chanIdx
    ) {
        Posting probe = new Posting();
        probe.setPostingChanIdx(chanIdx);
        probe.setPostingTitle(keyword);
        probe.setPostingContent(keyword);
        probe.setPostingWriter(keyword);

        ExampleMatcher matcher = ExampleMatcher
                .matchingAny()
                .withIgnoreCase()
                .withStringMatcher(ExampleMatcher.StringMatcher.CONTAINING)
                .withMatcher("posting_chan_idx", ExampleMatcher.GenericPropertyMatchers.exact());
        ExampleMatcher matcher2 = ExampleMatcher
                .matching()
                .withMatcher("posting_chan_idx", ExampleMatcher.GenericPropertyMatchers.exact());
        Example<Posting> result = Example.of(probe, matcher);
        List<Posting> complete = postingRepository.findAll(result);
        return ResponseEntity.ok().body(complete);
    }


}
