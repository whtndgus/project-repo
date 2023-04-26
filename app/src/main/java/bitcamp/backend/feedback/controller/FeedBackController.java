package bitcamp.backend.feedback.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import bitcamp.backend.feedback.service.FeedBackService;
import bitcamp.backend.feedback.vo.FeedBack;

@CrossOrigin("*")
@RestController
@ResponseBody
@RequestMapping("/feedback")
public class FeedBackController {

  @Autowired
  FeedBackService backService;

  @PostMapping("/findByBno")
  public Object boarfeedlist(@RequestBody HashMap<String, Object> param) {
    Map<String, Object> result = new HashMap<>();
    int bno = Integer.parseInt((String) param.get("bno"));
    result.put("status", "success");
    result.put("data", backService.blist(bno));
    return result;
  }

  @PostMapping("./findByDno")
  public List<FeedBack> doctorfeedlist(@RequestBody HashMap<String, Object> param) {

    return null;
  }

  @PostMapping("/findByFeed")
  public FeedBack findfeed(@RequestBody HashMap<String, Object> param) {

    return null;
  }

  @PostMapping("/insert")
  public Object addfeed(@RequestBody HashMap<String, Object> param) {
    Map<String, Object> result = new HashMap<>();
    FeedBack feedBack = new FeedBack();
    System.out.println(param);
    feedBack.setSymp_no(Integer.parseInt((String) param.get("bno")));
    feedBack.setDoc_no((int) param.get("dno"));
    feedBack.setPopen((boolean) param.get("popen"));
    feedBack.setVisit((boolean) param.get("visit"));
    feedBack.setContent((String) param.get("content"));
    if (((String) param.get("money")).equals("")) {

    } else {
      feedBack.setMoney(Integer.parseInt((String) param.get("money")));
    }
    try {
      backService.add(feedBack);
      result.put("status", "success");
    } catch (Exception e) {
      result.put("status", "fail");
    }
    return result;
  }

  @PostMapping("/update")
  public Object chengefeed(@RequestBody HashMap<String, Object> param) {
    Map<String, Object> result = new HashMap<>();
    System.out.println(param);
    FeedBack feedBack = new FeedBack();
    feedBack.setSymp_no((int) param.get("bno"));
    feedBack.setDoc_no((int) param.get("dno"));
    feedBack.setPopen((boolean) param.get("popen"));
    feedBack.setVisit((boolean) param.get("visit"));
    feedBack.setContent((String) param.get("content"));
    if (((String) param.get("money")).equals("")) {

    } else {
      feedBack.setMoney(Integer.parseInt((String) param.get("money")));
    }

    try {
      backService.update(feedBack);
      result.put("status", "success");
    } catch (Exception e) {
      result.put("status", "fail");
    }
    System.out.println(feedBack);
    return result;
  }

  @PostMapping("/delete")
  public Object delfeed(@RequestBody HashMap<String, Object> param) {

    return null;
  }


}
