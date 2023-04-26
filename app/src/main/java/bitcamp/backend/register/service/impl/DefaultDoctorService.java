package bitcamp.backend.register.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import bitcamp.backend.register.dao.DoctorDao;
import bitcamp.backend.register.dao.HospitalDao;
import bitcamp.backend.register.dao.LicenseDao;
import bitcamp.backend.register.dao.MemberDao;
import bitcamp.backend.register.service.DoctorService;
import bitcamp.backend.register.vo.Doctor;
import bitcamp.backend.register.vo.Member;


@Service
public class DefaultDoctorService implements DoctorService {

  @Autowired
  private MemberDao memberDao;
  @Autowired
  private DoctorDao doctorDao;
  @Autowired
  private LicenseDao licenseDao;
  @Autowired
  private HospitalDao hospitalDao;

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
    List<Doctor> doctors = doctorDao.findAll();
    for (int i = 0; i < doctors.size(); i++) {
      doctors.get(i).setLicenses(licenseDao.findByDno(doctors.get(i).getNo()));
      doctors.get(i).setHospital(hospitalDao.findByNo(doctors.get(i).getHosNo()));
    }
    return doctors;
  }

  @Override
  public Doctor get(int no) {
    Doctor doctor = doctorDao.findByNo(no);
    doctor.setLicenses(licenseDao.findByDno(no));
    doctor.setHospital(hospitalDao.findByNo(doctor.getHosNo()));
    return doctor;
  }

  @Override
  public Doctor get(String id, String password) {
    Map<String, Object> paramMap = new HashMap<>();
    paramMap.put("id", id);
    paramMap.put("password", password);
    Doctor doc = doctorDao.findByIdAndPassword(paramMap);
    doc.setLicenses(licenseDao.findByDno(doc.getNo()));
    return doc;
  }

  @Transactional
  @Override
  public void update(Doctor doctor) {
    System.out.println(doctor);
    if(doctor.getHosNo() > 0) {
      if (memberDao.update(doctor) == 1 && doctorDao.update(doctor) == 1) {
      } else {
        throw new RuntimeException("의사가 존재하지 않습니다.");
      }
    }else {
      if (memberDao.update(doctor) == 1 && doctorDao.updatec(doctor) == 1) {
      } else {
        throw new RuntimeException("의사가 존재하지 않습니다.");
      }
    }
  }

  @Transactional
  @Override
  public void delete(int no) {
    if (doctorDao.delete(no) == 1 && memberDao.delete(no) == 1) {
    } else {
      throw new RuntimeException("의사가 존재하지 않습니다.");
    }
  }

  @Override
  public void updateImg(Doctor doctor) {
    memberDao.updateImg(doctor);
  }

  @Override
  public int updatePw(Doctor doctor) {
    memberDao.updatePw(doctor);
    return 0;
  }

  @Override
  public Member tget(String tel) {
    return memberDao.findByTel(tel);
  }

}


