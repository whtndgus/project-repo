package bitcamp.backend.register.vo;

import lombok.Data;

@Data
public class License {
  // private Doctor doctor;
  // public int getNo() {
  // return doctor.getNo();
  // }
  // private LicenseCategory category;
  // public int getLicenseNo() {
  // return category.getLicenseNo();
  // }
  //
  private int d_no;
  private int l_no;
  private String licensePhoto;
  private String phoFilename;
  private String phoType;
  private int licenseOx;
}
