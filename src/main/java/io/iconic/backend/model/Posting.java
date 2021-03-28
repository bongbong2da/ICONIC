package io.iconic.backend.model;

import lombok.Data;
import lombok.ToString;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "posting")
@SequenceGenerator(name = "seq_posting_idx_gen",
sequenceName = "seq_posting_idx",
initialValue = 0,
allocationSize = 1)
@Data
@ToString
public class Posting {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY,
                    generator = "seq_posting_idx_gen")
    @Column (name = "posting_idx")
    private int postingIdx;

    @Column (name = "posting_chan_idx")
    private int postingChanIdx;

    @Column (name = "posting_title")
    private String postingTitle;

    @Column (name = "posting_writer")
    private String postingWriter;

    @Column (name = "posting_emoji")
    private String postingEmoji;

    @Column (name = "posting_content")
    private String postingContent;

    @Column (name = "posting_isattached")
    private char postingIsAttached;

    @Column (name = "posting_attach")
    private String postingAttach;

    @Column (name = "posting_reg")
    @ColumnDefault(value = "sysdate")
    private Date postingReg;

    public Posting() {
    }

    public Posting(int posting_idx, int postingChanIdx, String postingTitle, String postingWriter, String postingEmoji, String postingContent, char postingIsAttached, String postingAttach, Date postingReg) {
        this.postingIdx = posting_idx;
        this.postingChanIdx = postingChanIdx;
        this.postingTitle = postingTitle;
        this.postingWriter = postingWriter;
        this.postingEmoji = postingEmoji;
        this.postingContent = postingContent;
        this.postingIsAttached = postingIsAttached;
        this.postingAttach = postingAttach;
        this.postingReg = postingReg;
    }
}
