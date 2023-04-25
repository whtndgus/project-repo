package bitcamp.backend.register.service;

import java.util.List;
import bitcamp.backend.register.vo.Hospital;

public interface HospitalService {
  void add(Hospital hospital);
  List<Hospital> list();
  Hospital get(int no);
  Hospital get(String hosName, String hosPwd);
  void update(Hospital hospital);
  void delete(int no);
  boolean findByTel(String tel);
}

