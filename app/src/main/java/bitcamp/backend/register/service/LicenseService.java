package bitcamp.backend.register.service;

import java.util.List;
import bitcamp.backend.register.vo.License;

public interface LicenseService {
  void add(License license);

  List<License> list(int licenseNo);

  License get(int doctorNo);

  void update(License license);

  List<License> dlist(int doctorNo);

  List<License> llist(int licenseNo);

  void delete(int doctorNo);
}
