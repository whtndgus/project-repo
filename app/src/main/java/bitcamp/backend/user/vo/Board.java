package bitcamp.backend.user.vo;

import java.sql.Date;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonFormat.Shape;
import lombok.Data;

@Data
public class Board {

  @JsonFormat(shape = Shape.STRING, pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
  private Date createdDate;
  private int no;
  private int pno;

  private int fedcount;
  private String title;
  private String serial;
  private String pain;
  private String another;
  private boolean filter;

  // String name;
  // int age;
  // boolean gender;
  // String tel;
  // String addr1;
  // String addr2;



}
