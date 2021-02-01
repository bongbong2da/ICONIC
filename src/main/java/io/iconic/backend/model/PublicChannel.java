package io.iconic.backend.model;

import lombok.Data;
import lombok.ToString;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import java.util.Date;

@Entity
@Table(name = "public_channels")
@SequenceGenerator(name = "seq_pChan_idx_gen",
sequenceName = "seq_pChan_idx",
initialValue = 0,
allocationSize = 1)
@Data
@ToString
public class PublicChannel {

    @Id
    private int pChan_idx;

    private String pChan_name;

    private int pChan_pop_max;

    private String pChan_announce;

    private String pChan_manager;

    private char pChan_isPublic;

    private Date pChan_reg;

    public PublicChannel() {
    }

    public PublicChannel(int pChan_idx, String pChan_name, int pChan_pop_max, String pChan_announce, String pChan_manager, char pChan_isPublic, Date pChan_reg) {
        this.pChan_idx = pChan_idx;
        this.pChan_name = pChan_name;
        this.pChan_pop_max = pChan_pop_max;
        this.pChan_announce = pChan_announce;
        this.pChan_manager = pChan_manager;
        this.pChan_isPublic = pChan_isPublic;
        this.pChan_reg = pChan_reg;
    }
}
