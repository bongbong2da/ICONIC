package io.iconic.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.swing.filechooser.FileSystemView;
import java.io.File;
import java.io.IOException;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/upload/*")
public class UploadController {

    @PostMapping("/preUpload")
    public ResponseEntity preUpload(@RequestPart MultipartFile multipartFile, HttpServletRequest request) throws IOException {
        System.out.println("Request file name : " + multipartFile.getOriginalFilename());

//        String rootPath = FileSystemView.getFileSystemView().getHomeDirectory().toString();
//        String basePath = rootPath + "/" + "upload";
//
//        String filePath = basePath + "/" + multipartFile.getOriginalFilename();

        String rootPath = request.getSession().getServletContext().getRealPath("/resources/upload/");
//        String basePath = rootPath + "/resources/upload/";
        String filePath = rootPath + multipartFile.getOriginalFilename();

        System.out.println("Saving path : " + filePath);

        File target = new File(filePath);

        multipartFile.transferTo(target);

        System.out.println("Uploaded Successfully : " + filePath);

        return ResponseEntity.ok().body("Uploaded");
    }
}
