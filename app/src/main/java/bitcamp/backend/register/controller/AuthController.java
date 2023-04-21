package bitcamp.backend.register.controller;

import java.util.HashMap;
import java.util.Map;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import bitcamp.backend.community.service.CommunityService;
import bitcamp.backend.community.vo.Community;
import bitcamp.backend.register.service.DoctorService;
import bitcamp.backend.register.service.NaverMemberService;
import bitcamp.backend.register.service.PatientService;
import bitcamp.backend.register.vo.Doctor;
import bitcamp.backend.register.vo.Member;
import bitcamp.backend.register.vo.NaverMember;
import bitcamp.backend.register.vo.Patient;
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
  @Autowired
  private NaverMemberService naverMemberService;

  @PostMapping("/patientLogin")
  public Object patientLogin(String id, String password, HttpSession session) {

    Member member = null;
    member = patientService.get(id, password);

    if (member != null) {
      session.setAttribute("loginNo", member.getNo());
      session.setAttribute("pUser", member);
      session.setAttribute("mycheck", false);
      System.out.println(member);
      if (member.isAdmin()) {
        return new RestResult().setStatus(RestStatus.SUCCESS).setData(member);
      } else {
        return new RestResult().setStatus(RestStatus.SUCCESS);
      }
    } else {
      return new RestResult().setStatus(RestStatus.FAILURE);
    }
  }

  @PostMapping("/doctorLogin")
  public Object doctorLogin(String id, String password, HttpSession session) {


    Member member = null;
    member = doctorService.get(id, password);

    if (member != null) {
      session.setAttribute("loginNo", member.getNo());
      session.setAttribute("dUser", member);
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
    if (session.getAttribute("loginNo") != null) {
      int loginNo = (int) session.getAttribute("loginNo");
      if (patientService.getMember(loginNo).isAdmin()) {
        Member member = patientService.getMember(loginNo);
        member.setPasswordcheck((boolean) session.getAttribute("mycheck"));
        return new RestResult().setStatus(RestStatus.SUCCESS).setData(member);
      } else if (patientService.get(loginNo) != null) {
        Patient patient = patientService.get(loginNo);
        patient.setPasswordcheck((boolean) session.getAttribute("mycheck"));
        return new RestResult().setStatus(RestStatus.SUCCESS).setData(patient);
      } else {
        Doctor doctor = doctorService.get(loginNo);
        doctor.setPasswordcheck((boolean) session.getAttribute("mycheck"));
        return new RestResult().setStatus(RestStatus.SUCCESS).setData(doctor);
      }
    } else {
      return new RestResult().setStatus(RestStatus.FAILURE);
    }
  }

  @PostMapping("/naverLogin")
  public ResponseEntity<?> naverLogin(@RequestBody Map<String, Object> userInfo) {
    // 클라이언트에서 전송한 회원 정보를 Map<String, String> 형태로 받아옴
    System.out.println(userInfo);
    String name = (String) userInfo.get("name");
    String email = (String) userInfo.get("email");

    NaverMember naverMember = naverMemberService.get(email);
    if (naverMember == null) {
      // 신규 회원 등록
      naverMember = new NaverMember();
      naverMember.setUsername(name);
      naverMember.setEmail(email);
      naverMemberService.add(naverMember);
    } else {
      // 기존 회원 정보 업데이트
      naverMember.setUsername(name);
      // naverMemberService.update(naverMember);
    }

    // 회원 정보 업데이트 후 응답 메시지를 생성해서 반환
    String message = String.format("%s 님, 환영합니다.", name);
    return ResponseEntity.ok().body(message);
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


