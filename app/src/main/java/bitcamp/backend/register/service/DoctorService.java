package bitcamp.backend.register.service;

import java.util.List;
import bitcamp.backend.register.vo.Doctor;

public interface DoctorService {
  void add(Doctor doctor);
  List<Doctor> list();
  Doctor get(int no);
  Doctor get(String id, String password);
  void update(Doctor doctor);
  void delete(int no);
  boolean isDuplicateId(String id);
}





