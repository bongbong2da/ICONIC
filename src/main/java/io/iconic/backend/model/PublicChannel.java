package io.iconic.backend.model;

import lombok.Data;
import lombok.ToString;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table (name = "public_channels")
@SequenceGenerator(name = "gen_seq_channel_idx",
sequenceName = "seq_channel_idx",
initialValue = 2,
allocationSize = 1)
@Data
@ToString
public class PublicChannel {

    @Id
    @Column(name = "pchan_idx")
    @GeneratedValue(generator = "gen_seq_channel_idx", strategy = GenerationType.SEQUENCE)
    private int pChanIdx;

    @Column(name = "pchan_name")
    private String pChanName;

    @Column(name = "pchan_pop_max")
    private int pChanPopMax;

    @Column(name = "pchan_announce")
    private String pChanAnnounce;

    @Column(name = "pchan_manager")
    private String pChanManager;

    @Column(name = "pchan_ispublic")
    private char pChanIsPublic;

    @Column(name = "pchan_reg")
    private Date pChanReg;

    public PublicChannel() {
    }

    public PublicChannel(int pChanIdx, String pChanName, int pChanPopMax, String pChanAnnounce, String pChanManager, char pChanIsPublic, Date pChanReg) {
        this.pChanIdx = pChanIdx;
        this.pChanName = pChanName;
        this.pChanPopMax = pChanPopMax;
        this.pChanAnnounce = pChanAnnounce;
        this.pChanManager = pChanManager;
        this.pChanIsPublic = pChanIsPublic;
        this.pChanReg = pChanReg;
    }
}
