package bitcamp.backend.feedback.vo;

import java.sql.Date;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonFormat.Shape;
import bitcamp.backend.register.vo.License;
import java.util.List;
import lombok.Data;

@Data
public class FeedBack {
  private int symp_no;
  private int doc_no;

  @JsonFormat(shape = Shape.STRING, pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
  private Date createdDate;

  private String content;
  private String doc_name;
  private List<License> doc_license;
  private String doc_career; // 의사테이블 - career
  private String doc_image; // 멤버테이블 - m_photo 컬럼
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
