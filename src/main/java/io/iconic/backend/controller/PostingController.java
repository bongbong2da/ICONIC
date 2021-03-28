package io.iconic.backend.controller;

import io.iconic.backend.model.Posting;
import io.iconic.backend.payload.request.PostingRequest;
import io.iconic.backend.repository.PostingRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
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
        Page<List<Posting>> result = postingRepository.getAllByPostingChanIdxOrderByPostingRegDesc(chanIdx, PageRequest.of(page, 12));
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

    @PostMapping("/search/{chanIdx}/{keyword}/{page}")
    public ResponseEntity serachByKeyword(
            @PathVariable("keyword") String keyword,
            @PathVariable("chanIdx") int chanIdx,
            @PathVariable("page") int page
    ) {

        Page<List<Posting>> complete = postingRepository.getAllBySearchInQuery(chanIdx, keyword, PageRequest.of(page,10));
        return ResponseEntity.ok().body(complete);
    }

    @PostMapping("/update")
    public ResponseEntity updatePosting(PostingRequest request) {
        Optional<Posting> posting = postingRepository.findById(request.getPosting_idx());

        posting.ifPresent(newPosting-> {
            newPosting.setPostingChanIdx(request.getPosting_chan_idx());
            newPosting.setPostingTitle(request.getPosting_title());
            newPosting.setPostingEmoji(request.getPosting_emoji());
            newPosting.setPostingAttach(request.getPosting_attach());
            newPosting.setPostingContent(request.getPosting_content());
            postingRepository.save(newPosting);
        });

        return ResponseEntity.ok().body("UPDATED");
    }

    @PostMapping("delete/{idx}")
    public ResponseEntity deletePosting(@PathVariable int idx) {

        try {
            postingRepository.deletePostingByPostingIdx(idx);
            return ResponseEntity.ok().body("POSTING_DELETED");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.ok().body("POSTING_DELETE_FAILED");
        }
    }

    @GetMapping("getById/{chanIdx}/{username}")
    public ResponseEntity getById(@PathVariable int chanIdx, @PathVariable String username) {

        Page<List<Posting>> result = postingRepository.getAllByPostingWriterAndPostingChanIdxOrderByPostingRegDesc(username, chanIdx, PageRequest.of(0,5));

        log.info(result.toString());

        if (result.isEmpty()) return ResponseEntity.ok().body("NO_POSTINGS");

        return ResponseEntity.ok().body(result);
    }

    @GetMapping("getNewPostingCount")
    public ResponseEntity getNewPositngCount(int idx) {

        Date begin = new Date();
        begin = new Date(begin.getTime() + (1000*60*60*24*-1));
        Date end = new Date();

        Long count = postingRepository.countPostingsByPostingChanIdxAndPostingRegBetween(idx, begin, end);

        log.info("New Postings Count : " + count);

        return ResponseEntity.ok().body(count);
    }
}
