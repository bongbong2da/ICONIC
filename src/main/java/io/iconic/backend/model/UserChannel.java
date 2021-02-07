package io.iconic.backend.model;

import lombok.Data;
import lombok.ToString;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;

@Entity
@Table(name = "users_channel")
@ToString
@Data
public class UserChannel {

    @Id
    @NotBlank
    private String username;

    @NotBlank
    @Column(name = "channel_idx")
    private int channelIdx;

    public UserChannel() {
    }

    public UserChannel(@NotBlank String username, @NotBlank int channelIdx) {
        this.username = username;
        this.channelIdx = channelIdx;
    }
}
