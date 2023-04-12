package bitcamp.backend.register.service;

import java.util.List;
import bitcamp.backend.register.vo.HosPhoto;

public interface HosPhotoService {
  void add(HosPhoto hosPhoto);
  List<HosPhoto>get(int no);
  void update(HosPhoto hosPhoto);
  void delete(int no);
  List<HosPhoto>hget(int no);
}
