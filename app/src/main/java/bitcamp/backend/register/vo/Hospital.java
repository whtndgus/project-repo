package bitcamp.backend.register.vo;

import java.util.List;
import lombok.Data;

@Data
public class Hospital {
  private int hospitalNo;
  private String hosName;
  private String hosAddr;
  private String hosTel;
  private String hosTime;
  private String hosSub;
  private String hosPwd;
  private List<HosPhoto> hosphotos;

  public Hospital setHosphotos(List<HosPhoto> hosphotos) {
    this.hosphotos = hosphotos;
    return this;
  }
}
