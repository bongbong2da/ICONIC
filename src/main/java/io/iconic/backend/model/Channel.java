package io.iconic.backend.model;

import lombok.Data;

import javax.persistence.*;
import java.util.Date;

@Data
@Entity
@Table(name = "channels")
@SequenceGenerator(name = "gen_seq_channels_idx",
sequenceName = "seq_chnnels_idx",
allocationSize = 1,
initialValue = 0)
public class Channel {

    @Id
    @Column(name = "chan_idx")
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

    public Channel() {
    }

    public Channel(int chanIdx, String chanType, String chanName, String chanEmoji, int chanPopMax, String chanAnnounce, String chanManager, char chanIsPublic, Date chanReg) {
        this.chanIdx = chanIdx;
        this.chanType = chanType;
        this.chanName = chanName;
        this.chanEmoji = chanEmoji;
        this.chanPopMax = chanPopMax;
        this.chanAnnounce = chanAnnounce;
        this.chanManager = chanManager;
        this.chanIsPublic = chanIsPublic;
        this.chanReg = chanReg;
    }
}
