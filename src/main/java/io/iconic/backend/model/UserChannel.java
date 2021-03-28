package io.iconic.backend.model;

import lombok.Data;
import lombok.ToString;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "users_channel")
@ToString
@Data
@SequenceGenerator(name = "gen_seq_users_channel_idx",
sequenceName = "seq_users_channel_idx",
allocationSize = 1,
initialValue = 2)
public class UserChannel {

    @NotBlank
    private String username;

    @NotNull
    @Column(name = "channel_idx")
    private int channelIdx;

    @Id
    @Column(name = "idx")
    @GeneratedValue(generator = "gen_seq_users_channel_idx", strategy = GenerationType.IDENTITY)
    private int idx;

    public UserChannel() {
    }

    public UserChannel(@NotBlank String username, @NotBlank int channelIdx) {
        this.username = username;
        this.channelIdx = channelIdx;
    }
}
