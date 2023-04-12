package bitcamp.backend.feedback.vo;

import java.sql.Date;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonFormat.Shape;
import lombok.Data;

@Data
public class FeedBack {
  private int symp_no;
  private int doc_no;

  @JsonFormat(shape = Shape.STRING, pattern = "yyyy-MM-dd")
  private Date createdDate;

  private String content;
  private String doc_name;
  private String doc_license;
  private String hos_name;
  private String hos_addr;
  private int money;
  private boolean visit;
  private boolean dopen;
  private boolean hopen;
  private boolean popen;
  private int star;
  private String rev_content;

  @JsonFormat(shape = Shape.STRING, pattern = "yyyy-MM-dd")
  private Date rev_createdDate;
}
