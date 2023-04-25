package bitcamp.backend.register.dao;

import java.util.List;
import java.util.Map;
import org.apache.ibatis.annotations.Mapper;
import bitcamp.backend.register.vo.Doctor;

@Mapper
public interface DoctorDao {
  void insert(Doctor d);
  List<Doctor> findAll();
  Doctor findByNo(int no);
  Doctor findByIdAndPassword(Map<String, Object> params);
  int update(Doctor d);
  int updatec(Doctor d);
  int delete(int no);
}







