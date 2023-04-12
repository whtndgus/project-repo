package bitcamp.backend.register.vo;
import lombok.Data;

@Data
public class HosPhoto {
  private int photoNo;
  private int hospitalNo;
  private String hosPhotoUrl;
  private String hosPhotoFilename;
  private String hosPhotoType;
}
