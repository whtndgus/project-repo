package bitcamp.backend.register.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import bitcamp.backend.register.service.HosPhotoService;
import bitcamp.backend.register.vo.HosPhoto;
import bitcamp.backend.user.service.ObjectStorageService;

@RestController
@RequestMapping("/hospitalImg")
@CrossOrigin("*")
@SpringBootApplication
public class HosPhotoController {

  private String bucketName = "study-bucket/hospital-img";

  @Autowired  private ObjectStorageService objectStorageService;
  @Autowired  private HosPhotoService hosPhotoService;

  @CrossOrigin("*")
  @PostMapping("/insertHosImg")
  public void imgHospital(MultipartHttpServletRequest request) {
    List<MultipartFile> files = request.getFiles("files");
    int photoNo = Integer.parseInt(request.getParameter("hosNo"));

    System.out.println("병원 사진번호 : " + photoNo);

    for (MultipartFile file : files) {
      System.out.println(file.getOriginalFilename() + ":" + file.getSize());
      String str = objectStorageService.uploadFile(bucketName, file);

      System.out.println(str);

      HosPhoto hosPhoto = new HosPhoto();
      hosPhoto.setHospitalNo(photoNo);
      hosPhoto.setHosPhotoUrl(str);
      hosPhoto.setHosPhotoFilename(file.getOriginalFilename());
      hosPhoto.setHosPhotoType(file.getContentType());

      hosPhotoService.add(hosPhoto);
    }
  }


}