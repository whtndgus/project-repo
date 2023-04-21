package bitcamp.backend.register.vo;

import java.sql.Date;
import lombok.Data;

@Data
public class NaverMember {
  private int id;
  private String username;
  private String password;
  private String email;
  private String nickname;
  private String mobile;
  private Date createDate;
  private Date modifyDate;
}