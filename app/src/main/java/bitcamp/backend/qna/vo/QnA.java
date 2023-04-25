package bitcamp.backend.qna.vo;

import java.sql.Date;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonFormat.Shape;
import lombok.Data;

@Data
public class QnA {

  @JsonFormat(shape = Shape.STRING, pattern = "yyyy-MM-dd")
  private Date createdDate;
  private int no;
  private int mno;

  private String title;
  private String content;
  private String pname;
  private String recomment;

  // String name;
  // int age;
  // boolean gender;
  // String tel;
  // String addr1;
  // String addr2;



}
