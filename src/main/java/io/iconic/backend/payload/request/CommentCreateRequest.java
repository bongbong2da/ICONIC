package io.iconic.backend.payload.request;

import lombok.Data;
import lombok.ToString;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Data
@ToString
public class CommentCreateRequest {

    @NotNull
    private int postingIdx;

    @NotNull
    private String commentWriter;

    @NotNull
    private String commentEmoji;

    @NotNull
    private String commentContent;

}
