package io.iconic.backend.payload.request;

import lombok.Data;
import lombok.ToString;

@Data
@ToString
public class ChannelCreateRequest {

    private String chanType;

    private String chanName;

    private String chanEmoji;

    private int chanPopMax;

    private String chanManager;

    private char chanIsPublic;

    private String chanAnnounce;

}
