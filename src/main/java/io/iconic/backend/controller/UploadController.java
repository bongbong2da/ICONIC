package io.iconic.backend.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.IOException;
import java.util.UUID;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/upload/*")
public class UploadController {

    @Value("${file.upload-dir}")
    String uploadDir;

    @PostMapping("/preUpload")
    public ResponseEntity preUpload(@RequestPart MultipartFile multipartFile, HttpServletRequest request) throws IOException {
        System.out.println("Request file name : " + multipartFile.getOriginalFilename());

//        String rootPath = request.getSession().getServletContext().getRealPath("/resources/upload/");
        String rootPath = uploadDir;

        UUID uuid = UUID.randomUUID();

        String filePath = rootPath + uuid.toString() + multipartFile.getOriginalFilename();

        System.out.println("Saving path : " + filePath);

        File target = new File(filePath);

        multipartFile.transferTo(target);

        System.out.println("Uploaded Successfully : " + filePath);

        return ResponseEntity.ok().body(filePath);
    }

    @PostMapping("/uploadImage")
    public ResponseEntity uploadImage(@RequestParam("multipartFile") MultipartFile multipartFile, HttpServletRequest request) throws IOException {
        System.out.println("Request file name : " + multipartFile.getOriginalFilename());

//        String rootPath = request.getSession().getServletContext().getRealPath("/resources/upload/");

//        System.out.println(ServletUriComponentsBuilder.fromCurrentContextPath().toUriString());

//        String rootPath = uploadDir + "/images/";

        String rootPath = "d:/dev/iconic-upload/images/";

        UUID uuid = UUID.randomUUID();

        String filePath = rootPath + uuid.toString() + multipartFile.getOriginalFilename();

        System.out.println("Saving path : " + filePath);

        File target = new File(filePath);

        multipartFile.transferTo(target);

        System.out.println("Uploaded Successfully : " + filePath);

        return ResponseEntity.ok().body(filePath);
    }
}
