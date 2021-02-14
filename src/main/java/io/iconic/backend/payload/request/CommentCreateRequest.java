package io.iconic.backend.payload.request;

import lombok.Data;
import lombok.ToString;

@Data
@ToString
public class CommentCreateRequest {

    private int postingIdx;

    private String commentWriter;

    private String commentEmoji;

    private String commentContent;

}
