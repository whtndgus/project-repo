package bitcamp.backend.register.vo;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

@Data
@EqualsAndHashCode(callSuper = true)
@ToString(callSuper = true)
public class Patient extends Member {
  private String phy;
  private String drug;
}
