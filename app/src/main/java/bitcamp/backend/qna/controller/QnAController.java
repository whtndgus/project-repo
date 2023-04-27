package bitcamp.backend.qna.controller;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import bitcamp.backend.qna.service.QnAService;
import bitcamp.backend.qna.vo.QnA;
import bitcamp.util.RestResult;
import bitcamp.util.RestStatus;

@CrossOrigin("*")
@RestController
@ResponseBody
@RequestMapping("/qna")
public class QnAController {

  @Autowired
  QnAService qnAService;

  @PostMapping
  public Object qnaInsert(@RequestBody HashMap<String, Object> param) {
    try {
      if (qnAService.getM((int) param.get("mno")) != null) {
        QnA a = qnAService.getM((int) param.get("mno"));
        a.setContent(a.getContent() + "," + param.get("content") + ":질문자:"
            + new SimpleDateFormat("MM월dd일 HH시mm분").format(new Date()));
        String str = a.getContent();
        if(a.getContent().length() >= 240) {
          System.out.println("콘테츠 길이 초과" + a.getContent().length());
          String tmp = "";
          for(int i = 2; i < str.split(",").length; i++) {
            tmp += str.split(",")[i] + ",";
          }
          a.setContent(tmp);
        }
        qnAService.updateM(a);
      } else {
        QnA qnA = new QnA();
        qnA.setTitle((String) param.get("content"));
        qnA.setContent((String) param.get("content") + ":질문자:"
            + new SimpleDateFormat("MM월dd일 HH시mm분").format(new Date()));
        qnA.setMno((int) param.get("mno"));
        qnAService.add(qnA);
      }
      return new RestResult().setStatus(RestStatus.SUCCESS);
    } catch (Exception e) {
      return new RestResult().setStatus(RestStatus.FAILURE);
    }
  }

  @PostMapping("admin")
  public Object qnaAdminInsert(@RequestBody HashMap<String, Object> param) {
    try {
      if (qnAService.get((int) param.get("mno")) != null) {
        QnA a = qnAService.get((int) param.get("mno"));
        a.setContent(a.getContent() + "," + param.get("content") + ":관리자:"
            + new SimpleDateFormat("MM월dd일 HH시mm분").format(new Date()));
        String str = a.getContent();
        if(a.getContent().length() >= 240) {
          System.out.println("콘테츠 길이 초과" + a.getContent().length());
          String tmp = "";
          for(int i = 2; i < str.split(",").length; i++) {
            tmp += str.split(",")[i] + ",";
          }
          a.setContent(tmp);
        }
        qnAService.updateM(a);
      } else {
        QnA qnA = new QnA();
        qnA.setTitle((String) param.get("content"));
        qnA.setContent((String) param.get("content") + ":관리자:"
            + new SimpleDateFormat("MM월dd일 HH시mm분").format(new Date()));
        qnA.setMno((int) param.get("mno"));
        qnAService.add(qnA);
      }
      return new RestResult().setStatus(RestStatus.SUCCESS);
    } catch (Exception e) {
      e.printStackTrace();
      return new RestResult().setStatus(RestStatus.FAILURE);
    }
  }

  @GetMapping
  public Object qnaList() {
    return new RestResult().setStatus(RestStatus.SUCCESS).setData(qnAService.list());
  }



  @GetMapping("{no}")
  public Object qnaMnoList(@PathVariable int no) {
    return new RestResult().setStatus(RestStatus.SUCCESS).setData(qnAService.getM(no));
  }


  @GetMapping("admin/{no}")
  public Object qnanoList(@PathVariable int no) {
    return new RestResult().setStatus(RestStatus.SUCCESS).setData(qnAService.get(no));
  }

}
