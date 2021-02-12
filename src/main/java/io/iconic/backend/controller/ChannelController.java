package io.iconic.backend.controller;

import io.iconic.backend.model.Channel;
import io.iconic.backend.model.CreatedChannel;
import io.iconic.backend.model.PublicChannel;
import io.iconic.backend.model.UserChannel;
import io.iconic.backend.repository.ChannelRespository;
import io.iconic.backend.repository.CreatedChannelRepository;
import io.iconic.backend.repository.PublicChannelRepository;
import io.iconic.backend.repository.UserChannelRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;
import java.util.concurrent.atomic.AtomicInteger;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("channel/**")
public class ChannelController {

    private final Logger log = LoggerFactory.getLogger(ChannelController.class);

    @Autowired
    private UserChannelRepository userChannelRepository;

    @Autowired
    private PublicChannelRepository publicChannelRepository;

    @Autowired
    private CreatedChannelRepository createdChannelRepository;

    @Autowired
    private ChannelRespository channelRespository;

    @GetMapping("/get")
    public ResponseEntity getChannels(String username) {
        Optional<List<UserChannel>> channelList = userChannelRepository.findUserChannelsByUsernameIs(username);
        log.info("Presented Channel List : " + channelList);
        List<Optional<Channel>> result = new ArrayList<>();

        channelList.map(data -> {
            data.forEach(channel -> {
                int idx = channel.getChannelIdx();
                Optional<Channel> temp = channelRespository.findChannelByChanIdx(idx);
                if(temp.isPresent()) result.add(temp);
            });
            return null;
        });

        return ResponseEntity.ok().body(result);
    }

    @GetMapping("/getChannelInfo")
    public ResponseEntity getChannelInfo(int idx) {
        Optional<Channel> channel = channelRespository.findById(idx);
        if(channel.isPresent()) {
            return ResponseEntity.ok().body(channel);
        }

        return ResponseEntity.badRequest().body("NOT FOUND");
    }

    @GetMapping("/getPublics")
    public ResponseEntity getPublicChannels() {
        Optional<List<Channel>> result = channelRespository.findAllByChanType("public");

        if(result.isPresent()) {
            return ResponseEntity.ok().body(result);
        } else {
            return ResponseEntity.badRequest().body("channel/BAD_REQUEST");
        }
    }

}
