package io.iconic.backend.payload.request;

import lombok.Data;
import lombok.ToString;

@Data
@ToString
public class ExitChannelRequest {

    private String username;

    private int idx;

}
