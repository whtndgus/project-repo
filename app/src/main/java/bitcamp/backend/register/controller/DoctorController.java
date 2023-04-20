package bitcamp.backend.register.controller;

import java.io.UnsupportedEncodingException;
import java.net.URISyntaxException;
import java.security.InvalidKeyException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestClientException;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import com.fasterxml.jackson.core.JsonProcessingException;
import bitcamp.backend.register.service.DoctorService;
import bitcamp.backend.register.service.LicenseService;
import bitcamp.backend.register.vo.Doctor;
import bitcamp.backend.register.vo.License;
import bitcamp.backend.user.service.ObjectStorageService;
import bitcamp.util.RestResult;
import bitcamp.util.RestStatus;
import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/doctors")
@CrossOrigin("*")
public class DoctorController {

  Logger log = LogManager.getLogger(getClass());

  {
    log.trace("DoctorController 생성됨!");
  }

  @Autowired
  private DoctorService doctorService;

  @Autowired
  private LicenseService licenseService;

  @Autowired
  ObjectStorageService objectStorageService;

  private String memberImg = "study-bucket/member-img";
  private String licenseImg = "study-bucket/license-img";

  @PostMapping
  public Object insert(@RequestBody Doctor doctor) {
    doctorService.add(doctor);
    System.out.println(doctor);

    return new RestResult().setStatus(RestStatus.SUCCESS).setData(doctor);
  }

  @PostMapping("{no}")
  public void insertL(@PathVariable int no, MultipartHttpServletRequest request) {
    List<MultipartFile> files = request.getFiles("file");
    String[] names = request.getParameterValues("licenseName");
    for (int i = 0; i < files.size(); i++) {
      String url = objectStorageService.uploadFile(licenseImg, files.get(i));
      url = url.split("/")[5];
      License license = new License();
      license.setDoctorNo(no);
      license.setLicenseNo(Integer.parseInt(names[i]));
      license.setLicensePhoto(url);
      license.setPhoFilename(files.get(i).getOriginalFilename());
      license.setPhoType(files.get(i).getContentType());
      licenseService.add(license);
    }
    System.out.println(no);
  }

  @PostMapping("/profileimg")
  public Object insertimg(MultipartHttpServletRequest request) {
    List<MultipartFile> files = request.getFiles("files");
    String url = "";
    for (MultipartFile file : files) {

      System.out.println(file.getOriginalFilename() + ":" + file.getSize());
      url = objectStorageService.uploadFile(memberImg, file);
      url = url.split("/")[5];
    }
    return url;
  }

  @PostMapping("/check-mypage")
  public Object checkMypage(@RequestBody Map<String, String> formData, HttpSession session) {
    String id = formData.get("id");
    String password = formData.get("password");
    System.out.println(id);
    System.out.println(password);
    System.out.println(doctorService.get(id, password));
    Doctor doctor = doctorService.get(id, password);
    if (doctor != null) {
      session.setAttribute("mycheck", true);
      return new RestResult().setStatus(RestStatus.SUCCESS).setData(doctor);
    } else {
      return new RestResult().setStatus(RestStatus.FAILURE).setData(doctor);
    }
  }

  @PostMapping("/updateImg/{no}")
  public Object imgUpdate(@PathVariable int no, @RequestParam("file") MultipartFile file) {
    log.debug(file);
    System.out.println(file.getOriginalFilename() + ":" + file.getSize());
    String url = objectStorageService.uploadFile(memberImg, file);
    url = url.split("/")[5];
    Doctor doctor = doctorService.get(no);
    doctor.setPhoName(file.getOriginalFilename());
    doctor.setPhoType(file.getContentType());
    doctor.setPhoUrl(url);
    doctorService.updateImg(doctor);
    System.out.println(url);

    return new RestResult().setStatus(RestStatus.SUCCESS);
  }

  @GetMapping("/check-duplicate/{id}")
  public Object checkDuplicateId(@PathVariable String id) {
    boolean isDuplicate = doctorService.isDuplicateId(id);

    if (isDuplicate) {
      return new RestResult().setStatus(RestStatus.FAILURE).setMessage("이미 사용하고 있는 ID입니다.");
    } else {
      return new RestResult().setStatus(RestStatus.SUCCESS).setMessage("사용 가능한 ID입니다.");
    }
  }

  @GetMapping
  public Object list() {
    return new RestResult().setStatus(RestStatus.SUCCESS).setData(doctorService.list());
  }

  @GetMapping("{no}")
  public Object view(@PathVariable int no, HttpSession session)
      throws InvalidKeyException, NoSuchAlgorithmException, UnsupportedEncodingException,
      JsonProcessingException, RestClientException, URISyntaxException {

    return new RestResult().setStatus(RestStatus.SUCCESS).setData(doctorService.get(no));
  }

  @PutMapping("{no}")
  public Object update(@PathVariable int no, @RequestBody Doctor doctor) {

    log.debug(doctor);

    // doctor.setNo(no);
    doctorService.update(doctor);

    return new RestResult().setStatus(RestStatus.SUCCESS);
  }

  @PostMapping("/updatePw/{no}")
  public Object updatePw(@PathVariable int no, @RequestBody HashMap<String, Object> param)
      throws NoSuchAlgorithmException {
    String password = encrypt((String) param.get("password"));
    log.debug(password);
    Doctor doc = doctorService.get(no);
    if (doc.getPassword().equals(password)) {
      doc.setPassword(encrypt((String) param.get("changepassword")));
      doctorService.updatePw(doc);
      return new RestResult().setStatus(RestStatus.SUCCESS);
    } else {
      return new RestResult().setStatus(RestStatus.FAILURE);
    }
  }

  public String encrypt(String text) throws NoSuchAlgorithmException {
    MessageDigest md = MessageDigest.getInstance("SHA-256");
    md.update(text.getBytes());

    return bytesToHex(md.digest());
  }

  private String bytesToHex(byte[] bytes) {
    StringBuilder builder = new StringBuilder();
    for (byte b : bytes) {
      builder.append(String.format("%02x", b));
    }
    return builder.toString();
  }

  @DeleteMapping("{no}")
  public Object delete(@PathVariable int no) {
    doctorService.delete(no);
    return new RestResult().setStatus(RestStatus.SUCCESS);
  }


  @PostMapping("/changeLicenseCheck")
  public Object changeLicenseCheck(@RequestBody Map<String, Object> param) {
    try {
      License license = new License();
      license.setDoctorNo((int) param.get("dno"));
      license.setLicenseNo((int) param.get("lno"));
      license.setLicenseOx((boolean) param.get("filter"));
      licenseService.update(license);
    } catch (Exception e) {
      e.printStackTrace();
    }


    return new RestResult().setStatus(RestStatus.SUCCESS);
  }
}
