package bitcamp.backend.register.service;

import java.util.List;
import bitcamp.backend.register.vo.Member;
import bitcamp.backend.register.vo.Patient;

public interface PatientService {
  void add(Patient patient);

  List<Patient> list(String keyword);

  Patient get(int no);

  Patient get(String id, String password);

  void update(Patient patient);

  void delete(int no);

  boolean isDuplicateId(String id);

  void updateImg(Patient patient);

  int updatePw(Patient patient);

  Member tget(String tel);

  Member getMember(int no);

  Member getT(String token);
}


