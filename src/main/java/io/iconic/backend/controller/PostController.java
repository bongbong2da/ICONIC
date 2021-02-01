package io.iconic.backend.controller;

import io.iconic.backend.model.Posting;
import io.iconic.backend.payload.request.PostRequest;
import io.iconic.backend.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/post/*")
public class PostController {

    @Autowired
    private PostRepository postRepository;

    @GetMapping("/get")
    public ResponseEntity get() {
        List<Posting> result = postRepository.getAllByPostingChanIdxIs(1);

        return ResponseEntity.ok().body(result);
    }

}
