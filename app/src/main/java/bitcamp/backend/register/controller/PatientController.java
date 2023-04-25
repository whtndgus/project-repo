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
import bitcamp.backend.register.service.PatientService;
import bitcamp.backend.register.vo.Patient;
import bitcamp.backend.user.service.ObjectStorageService;
import bitcamp.util.RestResult;
import bitcamp.util.RestStatus;
import jakarta.servlet.http.HttpSession;

@RestController
@CrossOrigin("*")
@RequestMapping("/patients")
public class PatientController {


  Logger log = LogManager.getLogger(getClass());

  {
    log.trace("PatientController 생성됨!");
  }

  @Autowired
  private PatientService patientService;


  @Autowired
  ObjectStorageService objectStorageService;

  private String memberImg = "study-bucket/member-img";

  @PostMapping
  public Object insert(@RequestBody Patient patient) {
    System.out.println(patient);
    patientService.add(patient);
    return new RestResult().setStatus(RestStatus.SUCCESS);
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
    Patient patient = patientService.get(id, password);
    if (patient != null) {
      session.setAttribute("mycheck", true);
      return new RestResult().setStatus(RestStatus.SUCCESS).setData(patient);
    } else {
      return new RestResult().setStatus(RestStatus.FAILURE).setData(patient);
    }
  }

  @GetMapping("/check-duplicate/{id}")
  public Object checkDuplicateId(@PathVariable String id) {
    boolean isDuplicate = patientService.isDuplicateId(id);

    if (isDuplicate) {
      return new RestResult().setStatus(RestStatus.FAILURE).setMessage("이미 사용하고 있는 ID입니다.");
    } else {
      return new RestResult().setStatus(RestStatus.SUCCESS).setMessage("사용 가능한 ID입니다.");
    }
  }

  @GetMapping
  public Object list(String keyword) {
    return new RestResult().setStatus(RestStatus.SUCCESS).setData(patientService.list(keyword));
  }

  @GetMapping("{no}")
  public Object view(@PathVariable int no, HttpSession session)
      throws InvalidKeyException, NoSuchAlgorithmException, UnsupportedEncodingException,
      JsonProcessingException, RestClientException, URISyntaxException {

    return new RestResult().setStatus(RestStatus.SUCCESS).setData(patientService.get(no));
  }

  @PutMapping("{no}")
  public Object update(@PathVariable int no, Patient patient) {
    log.debug(patient);
    Patient pat = patientService.get(no);

    patient.setPassword(pat.getPassword());

    patientService.update(patient);

    return new RestResult().setStatus(RestStatus.SUCCESS);
  }

  @PostMapping("/updateImg/{no}")
  public Object imgUpdate(@PathVariable int no, @RequestParam("file") MultipartFile file) {
    log.debug(file);
    System.out.println(file.getOriginalFilename() + ":" + file.getSize());
    String url = objectStorageService.uploadFile(memberImg, file);
    url = url.split("/")[5];
    Patient patient = patientService.get(no);
    patient.setPhoName(file.getOriginalFilename());
    patient.setPhoType(file.getContentType());
    patient.setPhoUrl(url);
    patientService.updateImg(patient);
    System.out.println(url);

    return new RestResult().setStatus(RestStatus.SUCCESS);
  }

  @PostMapping("/updatePw/{no}")
  public Object updatePw(@PathVariable int no, @RequestBody HashMap<String, Object> param)
      throws NoSuchAlgorithmException {
    String password = encrypt((String) param.get("password"));
    log.debug(password);
    Patient pat = patientService.get(no);
    if (pat.getPassword().equals(password)) {
      pat.setPassword(encrypt((String) param.get("changepassword")));
      patientService.updatePw(pat);
      return new RestResult().setStatus(RestStatus.SUCCESS);
    } else {
      return new RestResult().setStatus(RestStatus.FAILURE);
    }
  }

  @DeleteMapping("{no}")
  public Object delete(@PathVariable int no) {
    patientService.delete(no);
    return new RestResult().setStatus(RestStatus.SUCCESS);
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

  @RequestMapping("user")
  public Object user(HttpSession session) {
    Patient loginUser = (Patient) session.getAttribute("pUser");

    if (loginUser != null) {
      loginUser.setPasswordcheck((boolean) session.getAttribute("mycheck"));;
      return new RestResult().setStatus(RestStatus.SUCCESS).setData(loginUser);
    } else {
      return new RestResult().setStatus(RestStatus.FAILURE);
    }
  }

}

