package bitcamp.backend.register.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import bitcamp.backend.register.service.LicenseService;
import bitcamp.backend.register.vo.License;
import bitcamp.backend.user.service.ObjectStorageService;

@RestController
@RequestMapping("/license")
@CrossOrigin("*")
@SpringBootApplication
public class LicenseController {
  private String bucketName = "study-bucket/license-img";

  @Autowired
  private ObjectStorageService objectStorageService;

  @Autowired
  private LicenseService licenseService;

  @CrossOrigin("*")
  @PostMapping("/files")
  public Object home(MultipartHttpServletRequest request) {


    List<MultipartFile> files = request.getFiles("files");
    List<String> strs = new ArrayList<>();

    for (MultipartFile file : files) {
      System.out.println(file.getOriginalFilename() + ":" + file.getSize());
      strs.add(objectStorageService.uploadFile(bucketName, file));
    }


    return strs;
  }

  @CrossOrigin("*")
  @PostMapping("/insertLicense")
  public void License(MultipartHttpServletRequest request) {
    List<MultipartFile> files = request.getFiles("files");
    List<String> strs = new ArrayList<>();
    int licenseNo = Integer.parseInt(request.getParameter("licenseNo"));

    System.out.println("자격증번호 : " + licenseNo);

    for (MultipartFile file : files) {
      System.out.println(file.getOriginalFilename() + ":" + file.getSize());
      String str = objectStorageService.uploadFile(bucketName, file);

      License license = new License();
      license.setL_no(licenseNo);
      license.setLicensePhoto(str);
      license.setPhoFilename(file.getOriginalFilename());
      license.setPhoType(file.getContentType());

      licenseService.add(license);
    }
  }

  @CrossOrigin("*")
  @PostMapping("/findAllLicense")
  public Object findLicense(@RequestBody HashMap<String, Object> param) {
    Map<String, Object> result = new HashMap<>();

    List<License> list = licenseService.list(Integer.parseInt((String) param.get("licenseNo")));

    if (list != null && list.size() > 0) {
      result.put("status", "success");
      result.put("data", list);
    } else {
      result.put("status", "fail");
    }

    return result;
  }
  @PostMapping("/doinsert")
  public Object test1() {
    Map<String, Object> result = new HashMap<>();
    result.put("status", "success");
    result.put("data", 1);

    return result;

  }
}
