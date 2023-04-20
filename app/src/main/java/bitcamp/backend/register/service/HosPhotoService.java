package bitcamp.backend.register.service;

import java.util.List;
import bitcamp.backend.register.vo.HosPhoto;

public interface HosPhotoService {
  void add(HosPhoto hosPhoto);
  List<HosPhoto>get(int no);
  void update(HosPhoto hosPhoto);
  void delete(int no);
  void deleteh(int no);//병원의 모든사진 지우기
  List<HosPhoto>hget(int no);
}
