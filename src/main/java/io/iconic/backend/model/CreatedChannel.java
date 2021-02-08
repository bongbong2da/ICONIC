package io.iconic.backend.model;

import lombok.Data;
import lombok.ToString;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table (name = "created_channels")
@SequenceGenerator(name = "gen_seq_channel_idx",
sequenceName = "seq_channel_idx",
initialValue = 2,
allocationSize = 1)
@Data
@ToString
public class CreatedChannel {

    @Id
    @Column (name = "cchan_idx")
    @GeneratedValue(generator = "gen_seq_channel_idx", strategy = GenerationType.SEQUENCE)
    private int cChanIdx;

    @Column (name = "cchan_name")
    private String cChanName;

    @Column (name = "cchan_pop_max")
    private int cChanPopMax;

    @Column (name = "cchan_announce")
    private String cChanAnnounce;

    @Column (name = "cchan_manager")
    private String cChanManager;

    @Column (name = "cchan_ispublic")
    private char cChanIsPublic;

    @Column (name = "cchan_reg")
    private Date cChanReg;

    public CreatedChannel() {
    }

    public CreatedChannel(int cChanIdx, String cChanName, int cChanPopMax, String cChanAnnounce, String cChanManager, char cChanIsPublic, Date cChanReg) {
        this.cChanIdx = cChanIdx;
        this.cChanName = cChanName;
        this.cChanPopMax = cChanPopMax;
        this.cChanAnnounce = cChanAnnounce;
        this.cChanManager = cChanManager;
        this.cChanIsPublic = cChanIsPublic;
        this.cChanReg = cChanReg;
    }
}
