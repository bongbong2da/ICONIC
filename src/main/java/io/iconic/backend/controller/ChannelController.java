package io.iconic.backend.controller;

import io.iconic.backend.model.Channel;
import io.iconic.backend.model.CreatedChannel;
import io.iconic.backend.model.PublicChannel;
import io.iconic.backend.model.UserChannel;
import io.iconic.backend.payload.request.ExitChannelRequest;
import io.iconic.backend.payload.request.JoinChannelRequest;
import io.iconic.backend.repository.ChannelRespository;
import io.iconic.backend.repository.CreatedChannelRepository;
import io.iconic.backend.repository.PublicChannelRepository;
import io.iconic.backend.repository.UserChannelRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;

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
            log.info(channel.get().toString());
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

    @PostMapping("/join")
    public ResponseEntity joinChannel(JoinChannelRequest request) {
        Optional<Channel> channel = channelRespository.findChannelByChanCode(request.getCode());

        if(channel.isPresent()) {
            UserChannel userChannel = new UserChannel();
            userChannel.setChannelIdx(channel.get().getChanIdx());
            userChannel.setUsername(request.getUsername());

            userChannelRepository.save(userChannel);
            return ResponseEntity.ok().body("JOINED");
        } else {
            return ResponseEntity.ok().body("NOT_FOUND");
        }
    }

    @PostMapping("/exit")
    public ResponseEntity exitChannel(ExitChannelRequest request) {
        try {
            log.info(request.toString());
            userChannelRepository.deleteByUsernameAndIdx(request.getUsername(), request.getIdx());
            return ResponseEntity.ok().body("DELETED");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.ok().body("DELETE_FAILED");
        }
    }

}
