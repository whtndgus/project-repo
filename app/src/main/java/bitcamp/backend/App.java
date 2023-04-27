package bitcamp.backend;

import java.io.UnsupportedEncodingException;
import java.net.URI;
import java.net.URISyntaxException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import org.apache.commons.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import bitcamp.backend.feedback.service.FeedBackService;
import bitcamp.backend.register.service.PatientService;
import bitcamp.backend.user.service.BoardImgService;
import bitcamp.backend.user.service.BoardService;
import bitcamp.backend.user.service.ObjectStorageService;
import bitcamp.backend.user.vo.Board;
import bitcamp.backend.user.vo.BoardImg;
import bitcamp.util.RestResult;
import bitcamp.util.RestStatus;
import jakarta.servlet.http.HttpSession;


@CrossOrigin("*")
@SpringBootApplication
@RestController
@ResponseBody
public class App {

  private static String sendNum = "01051521314";

  private String accessKey = "xJ9GP8G6boaaxgBkKp2l";

  private String secretKey = "tGJyZ5DFXw2KYbBH5Jp4XtpG2oNpvgVmg3Ci0xsJ";

  private String serviceId = "ncp:sms:kr:306085432212:sms";

  private String phone = "01051521314";

  private String serial = "";

  @Autowired
  private BoardService boardService;

  @Autowired
  private ObjectStorageService objectStorageService;

  @Autowired
  private BoardImgService boardImgService;

  @Autowired
  private PatientService patientService;

  private String bucketName = "study-bucket/board-img";

  @Autowired
  FeedBackService backService;

  public static void main(String args[]) {
    SpringApplication.run(App.class, args);
  }

  @GetMapping("/hello")
  public long hello() {



    long ran = (long) ((Math.random() * (999999999999l - 111111111111l)) + 111111111111l);

    System.out.println(ran);

    return ran;
  }

  @PostMapping("/insert")
  @ResponseBody
  public Object sayHello(@RequestBody HashMap<String, Object> param)
      throws JsonProcessingException, RestClientException, URISyntaxException {
    long ran = 0;
    while (true) {
      ran = (long) ((Math.random() * (999999999999l - 111111111111l)) + 111111111111l);
      List<Board> boards = boardService.list("");
      for (int i = 0; i < boards.size(); i++) {
        // if (Long.parseLong(boards.get(i).getPid()) == ran) {
        // continue;
        // }
      }


      break;
    }
    System.out.println("param : " + param);
    String str = "";
    str += param.get("name") + "@";
    str += param.get("age") + "@";
    str += param.get("gender") + "@";
    str += param.get("tel") + "@";
    str += param.get("addr1") + " " + param.get("addr2") + "@";
    str += param.get("another");

    Board board = new Board();

    int no = (int) (param.get("no"));
    if (no > 0) {
      board.setPno(no);

      board.setTitle((String) param.get("title"));
      board.setSerial(ran + "");
      board.setPain((String) param.get("pain"));
      board.setAnother(str);

      board.setFilter(negaText(board.getTitle(), 0.8));
      System.out.println("board : " + board);

      boardService.add(board);
    } else {

      board.setTitle((String) param.get("title"));
      board.setSerial(ran + "");
      board.setPain((String) param.get("pain"));
      board.setAnother(str);

      board.setFilter(negaText(board.getTitle(), 0.8));
      System.out.println("board : " + board);

      boardService.addBe(board);
    }

    System.out.println(boardService.get(board.getSerial()));

    return boardService.get(board.getSerial());
  }

  @PostMapping("/boardSearch")
  public Object bSearch(@RequestBody HashMap<String, Object> param, HttpSession session) {


    List<Board> boards = boardService.list((String) param.get("search"));
    for (int i = 0; i < boards.size(); i++) {
      boards.get(i).setFedcount(backService.blist(boards.get(i).getNo()).size());
    }
    return boards;
  }

  @GetMapping("/boardSearch")
  public Object boSearch() {


    List<Board> boards = boardService.list("");
    for (int i = 0; i < boards.size(); i++) {
      boards.get(i).setFedcount(backService.blist(boards.get(i).getNo()).size());
    }
    return boards;
  }

  @PostMapping("/boardPassword")
  public Object bSearchPwd(@RequestBody HashMap<String, Object> param) {
    System.out.println(param);

    Map<String, Object> result = new HashMap<>();


    if (boardService.get((String) param.get("password")) != null) {
      Board board = boardService.get((String) param.get("password"));

      result.put("status", "success");
      result.put("data", board);
    } else {
      result.put("status", "fail");
    }

    return result;
  }

  @PostMapping("/boardNo")
  public Object bSearchNo(@RequestBody HashMap<String, Object> param) {

    Map<String, Object> result = new HashMap<>();

    if (boardService.get(Integer.parseInt(((String) param.get("no")))) != null) {
      Board board = boardService.get(Integer.parseInt(((String) param.get("no"))));

      result.put("status", "success");
      result.put("data", board);
    } else {
      result.put("status", "fail");
    }

    return result;
  }

  @PostMapping("/files")
  public Object home(MultipartHttpServletRequest request) {

    List<MultipartFile> files = request.getFiles("files");
    List<String> strs = new ArrayList<>();

    System.out.println("보드 번호 : " + request.getParameter("boardNo"));

    for (MultipartFile file : files) {
      System.out.println(file.getOriginalFilename() + ":" + file.getSize());
      strs.add(objectStorageService.uploadFile(bucketName, file));
    }
    return strs;
  }

  @PostMapping("/insertBoardImg")
  public void imgBoard(MultipartHttpServletRequest request) {
    List<MultipartFile> files = request.getFiles("files");
    List<String> strs = new ArrayList<>();
    int b_No = Integer.parseInt(request.getParameter("boardNo"));

    System.out.println("보드 번호 : " + b_No);

    for (MultipartFile file : files) {
      System.out.println(file.getOriginalFilename() + ":" + file.getSize());
      String str = objectStorageService.uploadFile(bucketName, file);

      BoardImg boardImg = new BoardImg();
      boardImg.setB_no(b_No);
      boardImg.setUrl(str);
      boardImg.setName(file.getOriginalFilename());
      boardImg.setMIMETYPE(file.getContentType());

      boardImgService.add(boardImg);
    }
  }

  @PostMapping("/findAllBoardImg")
  public Object findimgBoard(@RequestBody HashMap<String, Object> param) {
    Map<String, Object> result = new HashMap<>();

    List<BoardImg> list = boardImgService.list(Integer.parseInt((String) param.get("bno")));

    if (list != null && list.size() > 0) {
      result.put("status", "success");
      result.put("data", list);
    } else {
      result.put("status", "fail");
    }

    return result;
  }

  @PostMapping("boardUpdata")
  public Object changeBoard(@RequestBody HashMap<String, Object> param) {
    Map<String, Object> result = new HashMap<>();
    Board board = new Board();

    String str = "";
    str += param.get("name") + ",";
    str += param.get("age") + ",";
    str += param.get("gender") + ",";
    str += param.get("tel") + ",";
    str += param.get("addr") + ",";
    str += param.get("another");

    board.setNo((int) param.get("no"));
    board.setAnother(str);
    board.setPain((String) param.get("pain"));
    board.setTitle((String) param.get("title"));

    boardService.update(board);

    System.out.println(board);

    return result;
  }

  @PostMapping("/deleteByNo")
  public Object deleteByNo(@RequestBody HashMap<String, Object> param) {
    try {
      boardService.delete((int) param.get("no"));
      return new RestResult().setStatus(RestStatus.SUCCESS);
    } catch (Exception e) {
      e.printStackTrace();
      return new RestResult().setStatus(RestStatus.FAILURE);
    }
  }


  // @PostMapping("/insertComImg")
  // public void imgCom(MultipartHttpServletRequest request) {
  //
  // List<MultipartFile> files = request.getFiles("files");
  //
  // int c_No = Integer.parseInt(request.getParameter("commuNo"));
  //
  // System.out.println("커뮤니티 번호 : " + c_No);
  //
  // for (MultipartFile file : files) {
  // System.out.println(file.getOriginalFilename() + ":" + file.getSize());
  // String str = objectStorageService.uploadFile(bucketName, file);
  //
  // System.out.println(str);
  //
  // }
  // }
  //
  // @PostMapping("/community")
  // public int test1() {
  // System.out.println("test 요청");
  // return 1;
  // }

  @PostMapping("/patientsBoards")
  public Object pnoList(@RequestBody HashMap<String, Object> param) {
    Map<String, Object> result = new HashMap<>();


    List<Board> boards = boardService.plist((int) param.get("no"));
    for (int i = 0; i < boards.size(); i++) {
      boards.get(i).setFedcount(backService.blist(boards.get(i).getNo()).size());
    }
    if (boards.size() > 0) {
      result.put("status", "success");
      result.put("data", boards);
    } else {
      result.put("status", "fail");
      System.out.println("환자 회원 작성글 없거나 오류");
    }


    return result;
  }


  public boolean negaText(String str, double d) {
    try {
      HttpHeaders headers = new HttpHeaders();
      headers.setContentType(MediaType.APPLICATION_JSON);
      headers.set("X-NCP-APIGW-API-KEY-ID", "djlxkf8glr");
      headers.set("X-NCP-APIGW-API-KEY", "WKmWLEDy3PCDtnpZw1X8EZETZTLAvANUCnmk9a0a");
      Map<String, Object> text = new HashMap<>();
      text.put("content", str);
      ObjectMapper objectMapper = new ObjectMapper();
      String body;
      body = objectMapper.writeValueAsString(text);
      HttpEntity<String> httpBody = new HttpEntity<>(body, headers);
      RestTemplate restTemplate = new RestTemplate();
      restTemplate.setRequestFactory(new HttpComponentsClientHttpRequestFactory());
      Map<String, Object> response = restTemplate.postForObject(
          new URI("https://naveropenapi.apigw.ntruss.com/sentiment-analysis/v1/analyze"), httpBody,
          Map.class);
      List<Object> sen = (List<Object>) response.get("sentences");
      Map<String, Object> senten = (Map<String, Object>) sen.get(0);
      Map<String, Object> sentence = (Map<String, Object>) senten.get("confidence");
      double nega = (double) sentence.get("negative");

      return nega >= d;
    } catch (Exception e) {
      e.printStackTrace();
      return false;
    }
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
    String tel = (String) param.get("tel");
    if (sn.length() == 6) {
      if (this.serial.equals(sn)) {
        System.out.println(tel);
        if (patientService.tget(tel) != null) {
          return new RestResult().setStatus(RestStatus.FAILURE).setData("중복된 연락처");
        }
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
