package bitcamp.backend.register.controller;

import java.io.UnsupportedEncodingException;
import java.net.URI;
import java.net.URISyntaxException;
import java.security.InvalidKeyException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import org.apache.commons.codec.binary.Base64;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
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
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import bitcamp.backend.register.service.PatientService;
import bitcamp.backend.register.vo.Patient;
import bitcamp.backend.user.service.ObjectStorageService;
import bitcamp.util.RestResult;
import bitcamp.util.RestStatus;

@RestController
@CrossOrigin("*")
@RequestMapping("/patients")
public class PatientController {

  private static String sendNum = "01051521314";

  private String accessKey = "xJ9GP8G6boaaxgBkKp2l";

  private String secretKey = "tGJyZ5DFXw2KYbBH5Jp4XtpG2oNpvgVmg3Ci0xsJ";

  private String serviceId = "ncp:sms:kr:306085432212:sms";

  private String phone = "01051521314";

  private String serial = "";

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
  public Object view(@PathVariable int no)
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

  @PostMapping("{no}")
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

  @PostMapping("/phone")
  public Object phonenum(@RequestBody HashMap<String, Object> param) {
    String tel = (String) param.get("tel");
    if (tel.length() == 11) {
      try {

        this.serial = postApiData(tel);
        if (!this.serial.equals("0")) {

          System.out.println(this.serial);
          return new RestResult().setStatus(RestStatus.SUCCESS);
        } else {
          this.serial = "";
          return new RestResult().setStatus(RestStatus.FAILURE);
        }
      } catch (Exception e) {
        return new RestResult().setStatus(RestStatus.FAILURE);
      }
    } else {
      return new RestResult().setStatus(RestStatus.FAILURE);
    }
  }

  @PostMapping("/phoneC")
  public Object phonecheck(@RequestBody HashMap<String, Object> param) {
    String sn = (String) param.get("serial");
    if (sn.length() == 6) {
      if (this.serial.equals(sn)) { 

        return new RestResult().setStatus(RestStatus.SUCCESS);
      } else {

        return new RestResult().setStatus(RestStatus.FAILURE);
      }
    } else {

      return new RestResult().setStatus(RestStatus.FAILURE);
    }

  }

  public String postApiData(String tel)
      throws InvalidKeyException, NoSuchAlgorithmException, UnsupportedEncodingException,
      JsonProcessingException, RestClientException, URISyntaxException {

    String ran = ((int) ((Math.random() * (999999 - 111111)) + 111111) + "");
    Long time = System.currentTimeMillis();
    HttpHeaders headers = new HttpHeaders();
    headers.setContentType(MediaType.APPLICATION_JSON);
    headers.set("x-ncp-apigw-timestamp", time.toString());
    headers.set("x-ncp-iam-access-key", accessKey);
    headers.set("x-ncp-apigw-signature-v2", makeSignature(time));

    Map<String, Object> params = new HashMap<>();
    Map<String, Object> mes = new HashMap<>();
    List<Map<String, Object>> mess = new ArrayList<>();

    mes.put("to", tel);
    mes.put("content", ran);
    mess.add(mes);

    params.put("type", "SMS");
    params.put("contentType", "COMM");
    params.put("from", this.sendNum);
    params.put("content", ran);
    params.put("countryCode", "82");
    params.put("messages", mess);

    ObjectMapper objectMapper = new ObjectMapper();
    String body = objectMapper.writeValueAsString(params);
    System.out.println(body);

    HttpEntity<String> httpBody = new HttpEntity<>(body, headers);
    RestTemplate restTemplate = new RestTemplate();
    restTemplate.setRequestFactory(new HttpComponentsClientHttpRequestFactory());
    Map<String, Object> response = restTemplate.postForObject(
        new URI("https://sens.apigw.ntruss.com/sms/v2/services/" + this.serviceId + "/messages"),
        httpBody, Map.class);
    System.out.println(response.get("statusName"));
    if (response.get("statusName").equals("success")) {
      return ran;
    } else {
      return "0";
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

  public String makeSignature(Long time)
      throws NoSuchAlgorithmException, UnsupportedEncodingException, InvalidKeyException {
    String space = " ";
    String newLine = "\n";
    String method = "POST";
    String url = "/sms/v2/services/" + this.serviceId + "/messages";
    String timestamp = time.toString();
    String accessKey = this.accessKey;
    String secretKey = this.secretKey;

    String message = new StringBuilder().append(method).append(space).append(url).append(newLine)
        .append(timestamp).append(newLine).append(accessKey).toString();

    SecretKeySpec signingKey = new SecretKeySpec(secretKey.getBytes("UTF-8"), "HmacSHA256");
    Mac mac = Mac.getInstance("HmacSHA256");
    mac.init(signingKey);

    byte[] rawHmac = mac.doFinal(message.getBytes("UTF-8"));
    String encodeBase64String = Base64.encodeBase64String(rawHmac);

    return encodeBase64String;
  }



}

