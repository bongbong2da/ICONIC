package io.iconic.backend.controller;

import io.iconic.backend.model.Posting;
import io.iconic.backend.payload.request.PostRequest;
import io.iconic.backend.repository.PostRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.function.Function;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/post/*")
public class PostController {

    private final Logger log = LoggerFactory.getLogger(PostController.class);

    @Autowired
    private PostRepository postRepository;

    @GetMapping("/get")
    public ResponseEntity get() {
//        List<Posting> result = new ArrayList<>();
//        postRepository.getAllByPostingChanIdxIs(1).map(data -> {
//            result.add(data);
//            return data;
//        });

        Optional<List<Posting>> result = postRepository.getAllByPostingChanIdxIs(1);

        return ResponseEntity.ok().body(result);
    }

}
