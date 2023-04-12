package bitcamp.backend.community.vo;

import java.sql.Date;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonFormat.Shape;
import lombok.Data;

@Data
public class Recomment {

  @JsonFormat(shape = Shape.STRING, pattern = "yyyy-MM-dd")
  private Date createdDate;
  private int comNo;
  private int recNo;
  private int docNo;
  private String docName;
  private String recContent;
}
