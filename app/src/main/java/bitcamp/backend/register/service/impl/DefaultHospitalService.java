package bitcamp.backend.register.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import bitcamp.backend.register.dao.HospitalDao;
import bitcamp.backend.register.service.HospitalService;
import bitcamp.backend.register.vo.Hospital;

@Service
public class DefaultHospitalService implements HospitalService{

  @Autowired private HospitalDao hospitalDao;


  @Transactional
  @Override
  public void add(Hospital hospital) {
    hospitalDao.insert(hospital);
  }
  @Override
  public boolean findByTel(String tel) {
    return hospitalDao.findByTel(tel) != null;
  }
  public boolean isDuplicateTel(String tel) {
    Hospital hospital = hospitalDao.findByTel(tel);
    return hospital != null;
  }

  @Override
  public List<Hospital> list() {
    return hospitalDao.findAll();
  }

  @Override
  public Hospital get(String hosName, String hosPwd) {
    Map<String, Object> paramMap = new HashMap<>();
    paramMap.put("hosName", hosName);
    paramMap.put("hosPwd", hosPwd);

    return hospitalDao.findByHosAndPassword(paramMap);

  }

  @Override
  public Hospital get(int no) {
    return hospitalDao.findByNo(no);
  }

  @Transactional
  @Override
  public void update(Hospital hospital) {
    hospitalDao.update(hospital);
  }

  @Transactional
  @Override
  public void delete(int no) {
    hospitalDao.delete(no);
  }
}
