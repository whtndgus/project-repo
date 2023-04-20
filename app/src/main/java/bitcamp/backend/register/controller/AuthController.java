package bitcamp.backend.register.controller;

import java.util.HashMap;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import bitcamp.backend.community.service.CommunityService;
import bitcamp.backend.community.vo.Community;
import bitcamp.backend.register.service.DoctorService;
import bitcamp.backend.register.service.PatientService;
import bitcamp.backend.register.vo.Member;
import bitcamp.backend.user.service.BoardService;
import bitcamp.backend.user.vo.Board;
import bitcamp.util.RestResult;
import bitcamp.util.RestStatus;
import jakarta.servlet.http.HttpSession;

@RestController
@CrossOrigin("*")
@RequestMapping("/auth")
public class AuthController {

  Logger log = LogManager.getLogger(getClass());

  {
    log.trace("AuthController 생성됨!");
  }

  @Autowired
  private PatientService patientService;
  @Autowired
  private DoctorService doctorService;
  @Autowired
  private BoardService boardService;
  @Autowired
  private CommunityService communityService;

  @PostMapping("/patientLogin")
  public Object patientLogin(String id, String password, HttpSession session) {

    Member member = null;
    member = patientService.get(id, password);

    if (member != null) {
      session.setAttribute("loginUser", member);
      session.setAttribute("mycheck", false);

      return new RestResult().setStatus(RestStatus.SUCCESS);
    } else {
      return new RestResult().setStatus(RestStatus.FAILURE);
    }
  }

  @PostMapping("/doctorLogin")
  public Object doctorLogin(String id, String password, HttpSession session) {


    Member member = null;
    member = doctorService.get(id, password);

    if (member != null) {
      session.setAttribute("loginUser", member);
      session.setAttribute("mycheck", false);
      return new RestResult().setStatus(RestStatus.SUCCESS);
    } else {
      return new RestResult().setStatus(RestStatus.FAILURE);
    }
  }

  @GetMapping("logout")
  public Object logout(HttpSession session) {
    session.invalidate();
    return new RestResult().setStatus(RestStatus.SUCCESS);
  }

  @SuppressWarnings("unused")
  @RequestMapping("user")
  public Object user(HttpSession session) {
    Member loginUser = (Member) session.getAttribute("loginUser");

    if (loginUser != null) {
      loginUser.setPasswordcheck((boolean) session.getAttribute("mycheck"));;
      return new RestResult().setStatus(RestStatus.SUCCESS).setData(loginUser);
    } else {
      return new RestResult().setStatus(RestStatus.FAILURE);
    }
  }

  // @PostMapping("facebookLogin")
  // public Object facebookLogin(
  // @RequestBody Map<String,String> jsonData,
  // HttpSession session) throws Exception {
  //
  // // 클라이언트가 보낸 accessToken을 가지고
  // // 페이스북 서버에 접속(AJAX 요청)하여 사용자를 정보를 가져온다.
  // //
  // RestTemplate restTemplate = new RestTemplate();
  //
  // @SuppressWarnings("rawtypes")
  // Map result = restTemplate.getForObject(
  // "https://graph.facebook.com/v16.0/me?access_token={value1}&fields={value2}", // 요청할 URL
  // Map.class, // 서버에서 받은 결과의 타입
  // jsonData.get("accessToken"), // URL의 첫 번째 자리에 들어갈 값
  // "id,name,email,gender" // 페이스북 측에 요청하는 로그인 사용자 정보
  // );
  //
  // // 페이스북에서 받은 데이터에서 이메일과 이름을 꺼낸다.
  // @SuppressWarnings("null")
  // String id = (String) result.get("id");
  // String password = (String) result.get("password");
  //
  // // 기존 회원 정보 가져오기
  // Doctor user = doctorService.get(id, password);
  // if (user == null) {
  // // 페이스북에서 받은 최소 정보를 가지고 회원 가입을 위한 객체를 준비한다.
  // Doctor d = new Doctor();
  // d.setEmail(id);
  // d.setName(name);
  // d.setPassword("bitcamp-nopassword");
  //
  // // 회원 가입을 수행한다.
  // doctorService.add(d);
  // }
  // user = doctorService.get(id);
  //
  // // 세션에 로그인 사용자 정보 보관
  // session.setAttribute("loginUser", user);
  //
  // return new RestResult()
  // .setStatus(RestStatus.SUCCESS);
  // }
  @PostMapping("/adminBoard")
  public Object patientsBoard(@RequestBody HashMap<String, Object> param) {
    try {
      Board board = boardService.get((int) param.get("no"));
      board.setFilter((boolean) param.get("filter"));
      boardService.update(board);

      return new RestResult().setStatus(RestStatus.SUCCESS);
    } catch (Exception e) {
      e.printStackTrace();
      return new RestResult().setStatus(RestStatus.FAILURE);
    }
  }

  @PostMapping("/adminComm")
  public Object patientsComm(@RequestBody HashMap<String, Object> param) {
    try {
      Community community = communityService.get((int) param.get("no"));
      System.out.println(community);
      community.setFilter((boolean) param.get("filter"));
      communityService.update(community);
      System.out.println(communityService.get((int) param.get("no")));

      return new RestResult().setStatus(RestStatus.SUCCESS);
    } catch (Exception e) {
      e.printStackTrace();
      return new RestResult().setStatus(RestStatus.FAILURE);
    }
  }
}


