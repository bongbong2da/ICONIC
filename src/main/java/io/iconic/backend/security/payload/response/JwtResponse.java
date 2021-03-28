package io.iconic.backend.security.payload.response;

import lombok.Data;
import lombok.ToString;

import java.util.List;

@ToString
@Data
public class JwtResponse {

    private String token;
    private String type = "Bearer ";
    private Integer id;
    private String username;
    private String email;
    private List<String> roles;
    private String profileImg;

    public JwtResponse(String accessToken, Integer id, String username, List<String> roles, String profileImg) {
        this.token = accessToken;
        this.id = id;
        this.username = username;
        this.roles = roles;
        this.profileImg = profileImg;
    }

}
