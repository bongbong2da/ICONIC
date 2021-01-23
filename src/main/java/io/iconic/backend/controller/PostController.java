package io.iconic.backend.controller;

import io.iconic.backend.model.Post;
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

    @PutMapping("/add")
    public ResponseEntity addPost(PostRequest postRequest) {

        Post post = new Post(postRequest.getPost_writer_id()
                            ,postRequest.getRep_icon()
                            ,postRequest.getPost_text()
                            ,postRequest.getPost_attach()
                            ,postRequest.getPost_attach_type());

        try {
            postRepository.save(post);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("POST UNCREATED");
        }

        return ResponseEntity.ok().body("POST CREATED");
    }

    @GetMapping("/get")
    public ResponseEntity getPosts() {
        List<Post> posts = postRepository.findAll();

        return ResponseEntity.ok().body(posts);
    }

}
