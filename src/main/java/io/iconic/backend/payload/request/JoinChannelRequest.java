package io.iconic.backend.payload.request;

import lombok.Data;
import lombok.ToString;

@Data
@ToString
public class JoinChannelRequest {

    private String code;

    private String username;

}
