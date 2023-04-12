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
  public List<License> dlist(int D_no) {
    return licenseDao.findByDno(D_no);
  }

  @Override
  public List<License> llist(int l_no) {
    return licenseDao.findByLno(l_no);
  }

  @Override
  public void update(License license) {

  }

  @Override
  public void delete(int no) {

  }

  @Override
  public List<License> list(int licenseNo) {
    // TODO Auto-generated method stub
    return null;
  }

  @Override
  public License get(int dNo) {
    // TODO Auto-generated method stub
    return null;
  }

}
