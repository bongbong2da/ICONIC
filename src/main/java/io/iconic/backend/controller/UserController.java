package io.iconic.backend.controller;

import io.iconic.backend.model.UserChannel;
import io.iconic.backend.payload.request.LoginRequest;
import io.iconic.backend.repository.UserChannelRepository;
import io.iconic.backend.security.JwtUtils;
import io.iconic.backend.security.account.ERole;
import io.iconic.backend.security.account.Role;
import io.iconic.backend.security.account.User;
import io.iconic.backend.security.payload.request.SignUpRequest;
import io.iconic.backend.security.payload.response.JwtResponse;
import io.iconic.backend.security.repository.RoleRepository;
import io.iconic.backend.security.repository.UserRepository;
import io.iconic.backend.security.service.UserDetailsImpl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping(value = "/user/**")
public class UserController {

    private final Logger log = LoggerFactory.getLogger(UserController.class);

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserChannelRepository userChannelRepository;

    @Autowired
    JwtUtils jwtUtils;

    @PutMapping("/signup")
    public ResponseEntity signUp(@Valid @RequestBody SignUpRequest signUpRequest) {

        if(userRepository.existsByUsername(signUpRequest.getUsername()))
            return ResponseEntity.badRequest().body("USERNAME EXISTS");

        User user = new User(signUpRequest.getUsername(), passwordEncoder.encode(signUpRequest.getPassword()), signUpRequest.getProfile_img(), new Date(), null);

        Set<String> strRoles = signUpRequest.getRoles();
        Set<Role> roles = new HashSet<>();

        if (strRoles == null) {
            System.out.println("NO ROLE FOUNDED FROM THE REQUEST");
            Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                    .orElseThrow(() -> new RuntimeException("NO ROLE"));
            roles.add(userRole);
        } else {
            strRoles.forEach(role -> {
                switch (role) {
                    case "admin" :
                        Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
                                .orElseThrow(() -> new RuntimeException("NO ADMIN ROLE"));
                        roles.add(adminRole);
                    case "mod" :
                        Role modRole = roleRepository.findByName(ERole.ROLE_MODERATOR)
                                .orElseThrow(() -> new RuntimeException("NO MOD ROLE"));
                        roles.add(modRole);
                    default :
                        Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                                .orElseThrow(() -> new RuntimeException("NO USER ROLE"));
                        roles.add(userRole);
                }
            });
        }

        System.out.println("USER CREATING.....");

        user.setRoles(roles);
        userRepository.save(user);
        userChannelRepository.save(new UserChannel(user.getUsername(), 1));

        return ResponseEntity.ok().body("REGISTERED");

    }

    @PostMapping("/signin")
    public ResponseEntity signIn(@RequestBody LoginRequest loginRequest) {
        System.out.println(loginRequest);
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

        System.out.println("시큐리티 컨텍스트 등록중...");
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        System.out.println("JWT 발급 성공 : " + jwt);
        UserDetailsImpl userDetails = (UserDetailsImpl)authentication.getPrincipal();

        List<String> roles = userDetails.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList());

        Optional<User> user = userRepository.findByUsername(loginRequest.getUsername());
        user.ifPresent(data-> {
            log.info(data.toString());
            data.setLogindate(new Date());
            User newData = userRepository.save(data);
        });

        System.out.println("불러온 권한들 : " + roles);

        return ResponseEntity.ok(new JwtResponse(jwt, userDetails.getId(), userDetails.getUsername(), roles, userDetails.getProfileImg()));
    }

    @PostMapping("/isAuth")
    public ResponseEntity isAuth(HttpServletRequest request,@RequestBody Map<String, String> data) {
        String token = request.getHeader("Authorization").substring(7, request.getHeader("Authorization").length());
        log.info("Requested UID : " + data.get("username"));
        log.info("Checking token is authorized : " + token);

        try {
            jwtUtils.validateJwtToken(token);
            Optional<User> user = userRepository.findByUsername(data.get("username"));
            log.info("validating success");
            return ResponseEntity.ok().body(user);
        } catch (Exception e) {
            log.info("validating failed");
            return ResponseEntity.badRequest().body("Bad Request");
        }
    }

    @GetMapping("/getProfile")
    public ResponseEntity getProfile(String username) {
        Optional<User> result = userRepository.findByUsername(username);
        return ResponseEntity.ok().body(result);
    }
}
