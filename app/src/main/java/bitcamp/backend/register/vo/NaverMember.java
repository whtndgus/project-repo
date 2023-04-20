package bitcamp.backend.register.vo;

import org.joda.time.DateTime;
import lombok.Data;

@Data
public class NaverMember {
  private int id;
  private String username;
  private String password;
  private String email;
  private String nickname;
  private String mobile;
  private DateTime create_date;
  private DateTime modify_date;
}