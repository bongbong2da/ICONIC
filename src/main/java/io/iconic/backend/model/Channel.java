package io.iconic.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
import java.util.Date;

@Data
@Entity
@Table(name = "channels")
@SequenceGenerator(name = "gen_seq_channel_idx",
sequenceName = "seq_channel_idx",
allocationSize = 1,
initialValue = 0)
@NoArgsConstructor
@AllArgsConstructor
public class Channel {

    @Id
    @Column(name = "chan_idx")
    @GeneratedValue(generator = "gen_seq_channel_idx", strategy = GenerationType.IDENTITY)
    private int chanIdx;

    @Column(name = "chan_type")
    private String chanType;

    @Column(name = "chan_name")
    private String chanName;

    @Column(name = "chan_emoji")
    private String chanEmoji;

    @Column(name = "chan_pop_max")
    private int chanPopMax;

    @Column(name = "chan_announce")
    private String chanAnnounce;

    @Column(name = "chan_manager")
    private String chanManager;

    @Column(name = "chan_ispublic")
    private char chanIsPublic;

    @Column(name = "chan_reg")
    private Date chanReg;

    @Column(name = "chan_code")
    private String chanCode;

}
