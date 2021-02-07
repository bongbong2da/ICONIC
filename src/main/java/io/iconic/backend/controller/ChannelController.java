package io.iconic.backend.controller;

import io.iconic.backend.model.CreatedChannel;
import io.iconic.backend.model.PublicChannel;
import io.iconic.backend.model.UserChannel;
import io.iconic.backend.repository.CreatedChannelRepository;
import io.iconic.backend.repository.PublicChannelRepository;
import io.iconic.backend.repository.UserChannelRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;

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

    @GetMapping("/get")
    public ResponseEntity getChannels(String username) {
        Optional<List<UserChannel>> channelList = userChannelRepository.getUserChannelsByUsername(username);

        List<Optional<PublicChannel>> publicChannelList = new ArrayList<>();
        List<Optional<CreatedChannel>> createdChannelList = new ArrayList<>();

        channelList.map(data -> {
            log.info("Channel List : " + data.toString());
            data.stream().forEach(channel -> {
                log.info("Finding Channels By : " + channel.getChannelIdx());
                publicChannelList.add(publicChannelRepository.findPublicChannelBypChanIdx(channel.getChannelIdx()));
                createdChannelList.add(createdChannelRepository.findCreatedChannelBycChanIdx(channel.getChannelIdx()));
            });
            return null;
        });

        Map<String, Object> result = new HashMap<String, Object>();

        result.put("public_list", publicChannelList);
        result.put("created_list", createdChannelList);

        return ResponseEntity.ok().body(result);
    }

}
