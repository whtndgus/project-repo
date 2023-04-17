package bitcamp.backend.community.controller;

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
import bitcamp.backend.community.service.CommunityImgService;
import bitcamp.backend.community.service.CommunityService;
import bitcamp.backend.community.service.RecommentService;
import bitcamp.backend.community.vo.Community;
import bitcamp.util.RestResult;
import bitcamp.util.RestStatus;

@RestController
@RequestMapping("/community")
@CrossOrigin("*")
public class CommunityController {

  // Logger log = LogManager.getLogger(getClass());

  @Autowired
  private CommunityService communityService;

  @Autowired
  private CommunityImgService communityImgService;

  @Autowired
  private RecommentService recommentService;

  // @GetMapping("/test")
  // public void test(){
  // communityService.get(7);
  // System.out.println(communityService);
  // }

  @PostMapping
  public Object insert(@RequestBody Community community, @RequestParam String password) {

    RestResult restResult = new RestResult();
    communityService.add(community);
    restResult.setData(community);
    restResult.setStatus(RestStatus.SUCCESS);
    restResult.setStatus(RestStatus.FAILURE);


    return restResult;
  }

  @GetMapping("/list")
  public Object list() {
    return new RestResult().setStatus(RestStatus.SUCCESS).setData(communityService.list());
  }

  @GetMapping("{no}")
  public Object view(@PathVariable int no) {
    return new RestResult().setStatus(RestStatus.SUCCESS).setData(communityService.get(no))
        .setPhoto(communityImgService.get(no));
  }

  @PutMapping
  public Object update(@RequestBody Community community) {

    communityService.update(community);

    RestResult restResult = new RestResult();
    return restResult.setStatus(RestStatus.SUCCESS).setData(community);
  }

  @DeleteMapping("{no}")
  public Object delete(@PathVariable int no) {
    System.out.println("커뮤 사진번호 : " + no);

    recommentService.deleteCno(no);

    communityImgService.delete(no);

    communityService.delete(no);

    return new RestResult().setStatus(RestStatus.SUCCESS);
  }


}
