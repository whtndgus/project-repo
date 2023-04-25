package bitcamp.backend.register.controller;

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
import org.springframework.web.bind.annotation.RestController;
import bitcamp.backend.register.service.HosPhotoService;
import bitcamp.backend.register.service.HospitalService;
import bitcamp.backend.register.vo.Hospital;
import bitcamp.util.RestResult;
import bitcamp.util.RestStatus;
import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/hospital")
@CrossOrigin("*")
public class HospitalController {

  Logger log = LogManager.getLogger(getClass());

  {
    log.trace("HospitalController 생성됨!");
  }

  @Autowired private HospitalService hospitalService;
  @Autowired private HosPhotoService hosPhotoService;

  @PostMapping
  public Object insert(@RequestBody Hospital hospital) {
    RestResult restResult = new RestResult();
    System.out.println(restResult);
    hospitalService.add(hospital);
    restResult.setData(hospital);
    restResult.setStatus(RestStatus.SUCCESS);
    return restResult;
  }

  @GetMapping("/check-duplicate/{tel}")
  public Object checkDuplicateTel(@PathVariable("tel") String tel) {
    boolean isDuplicate = hospitalService.findByTel(tel);

    if (isDuplicate) {
      return new RestResult()
          .setStatus(RestStatus.FAILURE)
          .setMessage("사용 불가능한 전화번호입니다.");
    } else {
      return new RestResult()
          .setStatus(RestStatus.SUCCESS)
          .setMessage("사용 가능한 전화번호입니다.");
    }
  }
  @GetMapping("/list")
  public Object list() {
    return new RestResult()
        .setStatus(RestStatus.SUCCESS)
        .setData(hospitalService.list());
  }

  @GetMapping("/list/{no}")
  public Object view(@PathVariable int no) {
    return new RestResult()
        .setStatus(RestStatus.SUCCESS)
        .setData(hospitalService.get(no)
            .setHosphotos(hosPhotoService.hget(no)));
  }

  @PutMapping("/{no}")
  public Object update(
      @PathVariable int no,
      @RequestBody Hospital hospital) {

    log.debug(hospital);

    if (hospital.getHosPwd() != null && hospital.getHosPwd().isEmpty()) {
      hospital.setHosPwd(null);
    }
    hospital.setHospitalNo(no);//vo에 나온대로 setter이름 적용하였음
    hospitalService.update(hospital);

    return new RestResult()
        .setStatus(RestStatus.SUCCESS);
  }
  @PostMapping("/check-mypage")
  public Object checkMypage(@RequestBody Map<String, String> formData, HttpSession session) {
    String hosNo = formData.get("delete-hosNo");
    String hosName = formData.get("delete-hosName");
    String hosPwd = formData.get("hosPwd");
    System.out.println(hosNo);
    System.out.println(hosName);
    System.out.println(hosPwd);
    System.out.println(hospitalService.get(hosName, hosPwd));
    Hospital hospital = hospitalService.get(hosName, hosPwd);
    if (hospital != null) {
      session.setAttribute("mycheck", true);
      return new RestResult().setStatus(RestStatus.SUCCESS).setData(hospital);
    } else {
      return new RestResult().setStatus(RestStatus.FAILURE).setData(hospital);
    }
  }

  @DeleteMapping("/delete/{no}")
  public Object delete(@PathVariable int no) {
    hosPhotoService.deleteh(no);
    hospitalService.delete(no);
    return new RestResult()
        .setStatus(RestStatus.SUCCESS);
  }

}
