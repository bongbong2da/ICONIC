package io.iconic.backend.security.account;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.ToString;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table ( name = "users",
         uniqueConstraints = {@UniqueConstraint(columnNames = "username")})
@SequenceGenerator(
        name = "seq_user_idx_gen",
        sequenceName = "seq_user_idx",
        initialValue = 0,
        allocationSize = 1
)
@ToString
@Data
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE,
    generator = "seq_user_idx_gen")
    private Integer id;

    @NotBlank
    private String username;

    @NotBlank
    @JsonIgnore
    private String password;

    @Column(name = "profile_img")
    private String profileImg;

    private Date regdate;

    private Date logindate;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "user_roles",
                joinColumns = @JoinColumn(name = "user_id"),
                inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Set<Role> roles = new HashSet<>();

    public User(String username, String password, String profileImg, Date regdate, Date logindate) {
        this.username = username;
        this.password = password;
        this.profileImg = profileImg;
        this.regdate = regdate;
        this.logindate = logindate;
    }

    public User() {

    }

}
