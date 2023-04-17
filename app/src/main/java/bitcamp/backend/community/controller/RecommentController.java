package bitcamp.backend.community.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import bitcamp.backend.community.service.RecommentService;
import bitcamp.backend.community.vo.Recomment;
import bitcamp.util.RestResult;
import bitcamp.util.RestStatus;

@RestController
@RequestMapping("/recomment")
@CrossOrigin("*")
@SpringBootApplication
public class RecommentController {

  @Autowired
  private RecommentService recommentService;


  @PostMapping
  public Object insert(@RequestBody Recomment recomment) {
    RestResult restResult = new RestResult();
    recommentService.add(recomment);
    restResult.setData(recomment);
    restResult.setStatus(RestStatus.SUCCESS);
    return restResult;
  }

  @GetMapping("{no}")
  public Object list(@PathVariable int no) {
    return new RestResult()
        .setStatus(RestStatus.SUCCESS)
        .setData(recommentService.list(no));
  }

  @DeleteMapping("/delete/{recNo}")
  public Object deleteRec(@PathVariable int recNo) {
    recommentService.delete(recNo);
    return new RestResult()
        .setStatus(RestStatus.SUCCESS);
  }


}

