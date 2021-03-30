package io.iconic.backend.controller;

import io.iconic.backend.model.Image;
import io.iconic.backend.repository.UploadRepository;
import org.apache.tomcat.util.http.fileupload.FileUtils;
import org.imgscalr.Scalr;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import javax.imageio.stream.ImageOutputStream;
import javax.servlet.http.HttpServletRequest;
import java.awt.image.BufferedImage;
import java.io.*;
import java.nio.file.Files;
import java.util.UUID;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/upload/*")
public class UploadController {

    @Value("${file.upload-dir}")
    String uploadDir;

    @Autowired
    private UploadRepository uploadRepository;

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

        byte[] originalImage = multipartFile.getBytes();

        InputStream input = new ByteArrayInputStream(multipartFile.getBytes());

        BufferedImage bufferedImage = ImageIO.read(input);

        bufferedImage = Scalr.crop(bufferedImage, bufferedImage.getWidth(), bufferedImage.getHeight(), null);

        ByteArrayOutputStream output = new ByteArrayOutputStream();

        ImageIO.write(Scalr.resize(bufferedImage, 1500), "temp", (ImageOutputStream) output);

        UUID uuid = UUID.randomUUID();

        Image willSavedImage = new Image();

        byte[] convertedImage = output.toByteArray();

        willSavedImage.setImageUuid(uuid.toString());
        willSavedImage.setImageBytes(convertedImage);

        uploadRepository.save(willSavedImage);

        return ResponseEntity.ok().body(uuid.toString());

    }

    @GetMapping("{uuid}")
    public byte[] getImage(@PathVariable("uuid") String uuid) {
        System.out.println("REQ URI========" + uuid);

        Image image = uploadRepository.getByImageUuid(uuid);

        return image.getImageBytes();
    }


//    @PostMapping("/uploadImage")
//    public ResponseEntity uploadImage(@RequestParam("multipartFile") MultipartFile multipartFile, HttpServletRequest request) throws IOException {
//        String originalName = multipartFile.getOriginalFilename();
//        String ext = originalName.substring(originalName.lastIndexOf(".") + 1, originalName.length());
//        System.out.println("Request file name : " + originalName);
//
////        String rootPath = request.getSession().getServletContext().getRealPath("/resources/upload/");
//
////        System.out.println(ServletUriComponentsBuilder.fromCurrentContextPath().toUriString());
//
////        String rootPath = uploadDir + "/images/";
//
//        String rootPath = uploadDir;
//
//        UUID uuid = UUID.randomUUID();
//
//        String filePath = rootPath + uuid.toString() + multipartFile.getOriginalFilename();
//
//        System.out.println("Saving path : " + filePath);
//
//        File target = new File(filePath);
//
//        multipartFile.transferTo(target);
//
//        if(ext.equals("gif")) return ResponseEntity.ok().body(filePath);
//
//        BufferedImage bufferedImage = ImageIO.read(target);
//
//        bufferedImage = Scalr.crop(bufferedImage, bufferedImage.getWidth(), bufferedImage.getHeight(), null);
//
//        ImageIO.write(Scalr.resize(bufferedImage, 1500), ext, target);
//
//        System.out.println("Uploaded Successfully : " + filePath);
//
//        return ResponseEntity.ok().body(filePath);
//    }
}
