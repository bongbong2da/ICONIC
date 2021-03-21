package io.iconic.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "posting_comment")
@Data
@ToString
@NoArgsConstructor
@AllArgsConstructor
@SequenceGenerator(name = "gen_seq_comment_idx",
sequenceName = "seq_comment_idx",
initialValue = 0,
allocationSize = 1)
public class Comment {

    @Id
    @Column(name = "comment_idx")
    @GeneratedValue(generator = "gen_seq_comment_idx", strategy = GenerationType.IDENTITY)
    private int commentIdx;

    @Column(name = "posting_idx")
    private int postingIdx;

    @Column(name = "comment_writer")
    private String commentWriter;

    @Column(name = "comment_emoji")
    private String commentEmoji;

    @Column(name = "comment_content")
    private String commentContent;

    @Column(name = "comment_reg")
    private Date commentReg;

}
