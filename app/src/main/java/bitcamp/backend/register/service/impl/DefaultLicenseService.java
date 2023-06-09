package bitcamp.backend.register.service.impl;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import bitcamp.backend.register.dao.LicenseDao;
import bitcamp.backend.register.service.LicenseService;
import bitcamp.backend.register.vo.License;

@Service
public class DefaultLicenseService implements LicenseService {

  @Autowired
  private LicenseDao licenseDao;

  @Override
  public void add(License license) {
    licenseDao.insert(license);
  }

  @Override
  public List<License> dlist(int doctorNo) {
    return licenseDao.findByDno(doctorNo);
  }

  @Override
  public List<License> llist(int licenseNo) {
    return licenseDao.findByLno(licenseNo);
  }

  @Override
  public void update(License license) {
    licenseDao.update(license);
  }

  @Override
  public void delete(int doctorNo) {

  }

  @Override
  public List<License> list(int licenseNo) {
    // TODO Auto-generated method stub
    return null;
  }

  @Override
  public License get(int doctorNo) {
    // TODO Auto-generated method stub
    return null;
  }

}
