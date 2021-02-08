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

    @GetMapping("/get")
    public ResponseEntity getChannels(String username) {
        Optional<List<UserChannel>> channelList = userChannelRepository.findUserChannelsByUsernameIs(username);
        log.info("Presented Channel List : " + channelList);

        List<Optional<PublicChannel>> publicChannelList = new ArrayList<>();
        List<Optional<CreatedChannel>> createdChannelList = new ArrayList<>();

        AtomicInteger count = new AtomicInteger();

        channelList.map(data -> {
            data.forEach(channel -> {
                log.info("COUNT : " + count);
                count.getAndIncrement();
                int idx = channel.getChannelIdx();
                log.info("Finding Channels By : " + idx);
                Optional<PublicChannel> pChan = publicChannelRepository.findPublicChannelBypChanIdx(idx);
                if(pChan.isPresent()) {
                    log.info("pChan : " + pChan.toString());
                    publicChannelList.add(pChan);
                }
                Optional<CreatedChannel> cChan = createdChannelRepository.findCreatedChannelBycChanIdx(idx);
                if(cChan.isPresent()) {
                    log.info("cChan : " + cChan.toString());
                    createdChannelList.add(cChan);
                }
            });
            return null;
        });

        Map<String, Object> result = new HashMap<String, Object>();

        result.put("public_list", publicChannelList);
        result.put("created_list", createdChannelList);

        result.forEach((item, index) -> {
            log.info(item.toString() + " : " + index.toString());
        });

        return ResponseEntity.ok().body(result);
    }

    @GetMapping("/getChannelInfo")
    public ResponseEntity getChannelInfo(int idx) {
        Optional<PublicChannel> pChan = publicChannelRepository.findById(idx);
        if(pChan.isPresent()) {

            Map<String, Object> result = new HashMap<String, Object>();
            result.put("channel", pChan);
            result.put("type", "public");

            return ResponseEntity.ok().body(result);
        }

        Optional<CreatedChannel> cChan = createdChannelRepository.findById(idx);
        if(cChan.isPresent()) {

            Map<String, Object> result = new HashMap<String, Object>();
            result.put("channel", cChan);
            result.put("type", "created");

            return ResponseEntity.ok().body(result);
        }

        return ResponseEntity.badRequest().body("NOT FOUND");
    }

}
