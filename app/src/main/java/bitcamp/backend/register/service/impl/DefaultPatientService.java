package bitcamp.backend.register.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import bitcamp.backend.register.dao.MemberDao;
import bitcamp.backend.register.dao.PatientDao;
import bitcamp.backend.register.service.PatientService;
import bitcamp.backend.register.vo.Member;
import bitcamp.backend.register.vo.Patient;


@Service
public class DefaultPatientService implements PatientService {

  Logger log = LogManager.getLogger(getClass());

  @Autowired
  private MemberDao memberDao;

  @Autowired
  private PatientDao patientDao;

  @Transactional
  @Override
  public void add(Patient patient) {
    memberDao.insert(patient);
    patientDao.insert(patient);
  }

  @Override
  public boolean isDuplicateId(String id) {
    return memberDao.findById(id) != null;
  }

  @Override
  public List<Patient> list(String keyword) {
    return patientDao.findAll(keyword);
  }

  @Override
  public Patient get(int no) {
    return patientDao.findByNo(no);
  }

  @Override
  public Patient get(String id, String password) {
    Map<String, Object> paramMap = new HashMap<>();
    paramMap.put("id", id);
    paramMap.put("password", password);

    return patientDao.findByIdAndPassword(paramMap);
  }

  @Transactional
  @Override
  public void update(Patient patient) {
    if (memberDao.update(patient) == 1 && patientDao.update(patient) == 1) {
    } else {
      throw new RuntimeException("회원이 존재하지 않습니다.");
    }
  }

  @Transactional
  @Override
  public void delete(int no) {
    if (patientDao.delete(no) == 1 && memberDao.delete(no) == 1) {
    } else {
      throw new RuntimeException("회원이 존재하지 않습니다.");
    }
  }

  @Override
  public void updateImg(Patient patient) {
    memberDao.updateImg(patient);
  }

  @Override
  public int updatePw(Patient patient) {
    memberDao.updatePw(patient);
    return 0;
  }

  @Override
  public Member tget(String tel) {
    return memberDao.findByTel(tel);
  }


  @Override
  public Member getMember(int no) {
    return memberDao.findByNo(no);
  }

  @Override
  public Member getT(String token) {
    return patientDao.findByToken(token);
  }
}


