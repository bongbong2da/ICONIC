package io.iconic.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;

@Entity
@Table(name = "images")
@Data
@ToString
@NoArgsConstructor
@AllArgsConstructor
@SequenceGenerator(name = "gen_seq_images_idx",
sequenceName = "seq_images_idx",
allocationSize = 1,
initialValue = 0)
public class Image {

    @Id
    @Column(name = "image_idx")
    @GeneratedValue(generator = "gen_seq_images_idx", strategy = GenerationType.IDENTITY)
    private int imageIdx;

    @Column(name = "image_uuid")
    private String imageUuid;

    @Column(name = "image_bytes")
    private byte[] imageBytes;

}
