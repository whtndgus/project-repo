package bitcamp.backend.register.vo;

import java.io.Serializable;
import java.util.List;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

@SuppressWarnings("serial")
@Data
@EqualsAndHashCode(callSuper = true)
@ToString(callSuper = true)
public class Doctor extends Member implements Serializable {
  private List<License> licenses;
  private Hospital hospital;
  private String hosName;
  private int hosNo;

  // Hospital 클래스의 hospitalNo 필드에 접근하기 위한 메서드
  // public int getHospitalNo() {
  // return hospital.getHospitalNo();
  // }

  private String career;


}
