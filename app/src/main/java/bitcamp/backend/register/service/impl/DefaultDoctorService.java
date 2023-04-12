package bitcamp.backend.register.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import bitcamp.backend.register.dao.DoctorDao;
import bitcamp.backend.register.dao.MemberDao;
import bitcamp.backend.register.service.DoctorService;
import bitcamp.backend.register.vo.Doctor;


@Service
public class DefaultDoctorService implements DoctorService {

  @Autowired private MemberDao memberDao;
  @Autowired private DoctorDao doctorDao;

  @Transactional
  @Override
  public void add(Doctor doctor) {
    memberDao.insert(doctor);
    doctorDao.insert(doctor);
  }

  @Override
  public boolean isDuplicateId(String id) {
    return memberDao.findById(id) != null;
  }

  @Override
  public List<Doctor> list() {
    return doctorDao.findAll();
  }

  @Override
  public Doctor get(int no) {
    return doctorDao.findByNo(no);
  }

  @Override
  public Doctor get(String id, String password) {
    Map<String,Object> paramMap = new HashMap<>();
    paramMap.put("id", id);
    paramMap.put("password", password);

    return doctorDao.findByIdAndPassword(paramMap);
  }

  @Transactional
  @Override
  public void update(Doctor doctor) {
    if (memberDao.update(doctor) == 1 &&
        doctorDao.update(doctor) == 1) {
    } else {
      throw new RuntimeException("의사가 존재하지 않습니다.");
    }
  }

  @Transactional
  @Override
  public void delete(int no) {
    if (doctorDao.delete(no) == 1 &&
        memberDao.delete(no) == 1) {
    } else {
      throw new RuntimeException("의사가 존재하지 않습니다.");
    }
  }
}





