package bitcamp.backend.community.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import bitcamp.backend.community.service.CommunityImgService;
import bitcamp.backend.community.vo.CommunityImg;
import bitcamp.backend.user.service.ObjectStorageService;
import bitcamp.util.RestResult;
import bitcamp.util.RestStatus;

@RestController
@RequestMapping("/communityImg")
@CrossOrigin("*")
@SpringBootApplication
public class CommunityImgController {

  private String bucketName = "study-bucket/community-img";

  @Autowired
  private ObjectStorageService objectStorageService;

  @Autowired
  private CommunityImgService communityImgService;

  @CrossOrigin("*")
  @PostMapping("/insertComImg")
  public void imgCommunity(MultipartHttpServletRequest request) {
    List<MultipartFile> files = request.getFiles("files");
    int c_No = Integer.parseInt(request.getParameter("comNo"));

    System.out.println("커뮤 사진번호 : " + c_No);

    for (MultipartFile file : files) {
      System.out.println(file.getOriginalFilename() + ":" + file.getSize());
      String str = objectStorageService.uploadFile(bucketName, file).split("/")[5];


      System.out.println(str);

      CommunityImg communityImg = new CommunityImg();
      communityImg.setComNo(c_No);
      communityImg.setImgUrl(str);
      communityImg.setImgName(file.getOriginalFilename());
      communityImg.setImgType(file.getContentType());

      communityImgService.add(communityImg);
    }
  }

  @CrossOrigin("*")
  @DeleteMapping("{no}")
  public Object deleteImg(@PathVariable int no) {

    System.out.println("커뮤 사진번호 : " + no);
    communityImgService.delete(no);
    return new RestResult().setStatus(RestStatus.SUCCESS);
  }


  @CrossOrigin("*")
  @PostMapping("/findAllComImg")
  public Object findimgCommunity(@RequestBody HashMap<String, Object> param) {
    Map<String, Object> result = new HashMap<>();

    List<CommunityImg> list = communityImgService.get(Integer.parseInt((String) param.get("Cno")));

    if (list != null && list.size() > 0) {
      result.put("status", "success");
      result.put("data", list);
    } else {
      result.put("status", "fail");
    }

    return result;
  }
}
