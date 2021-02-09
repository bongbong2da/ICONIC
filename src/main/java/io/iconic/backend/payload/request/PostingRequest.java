package io.iconic.backend.payload.request;

import lombok.Data;
import lombok.ToString;

import java.util.Date;

@Data
@ToString
public class PostingRequest {

    private int posting_idx;

    private int posting_chan_idx;

    private String posting_title;

    private String posting_writer;

    private String posting_emoji;

    private String posting_content;

    private char posting_isAttached;

    private String posting_attach;

    private Date posting_reg;

}
