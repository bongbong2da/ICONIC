package io.iconic.backend.model;

import lombok.Data;
import lombok.ToString;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table ( name = "created_channels")
@SequenceGenerator(name = "seq_cChan_idx_gen",
sequenceName = "seq_cChan_idx",
initialValue = 0,
allocationSize = 1)
@Data
@ToString
public class CreatedChannel {

    @Id
    @Column (name = "cChan_idx")
    private int cChanIdx;

    @Column (name = "cChan_name")
    private String cChanName;

    @Column (name = "cChan_pop_max")
    private int cChanPopMax;

    @Column (name = "cChan_announce")
    private String cChanAnnounce;

    @Column (name = "cChan_manager")
    private String cChanManager;

    @Column (name = "cChan_isPublic")
    private char cChanIsPublic;

    @Column (name = "cChan_reg")
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
