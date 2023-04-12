package bitcamp.backend.register.service;

import java.util.List;
import bitcamp.backend.register.vo.License;

public interface LicenseService {
  void add(License license);

  List<License> list(int licenseNo);

  License get(int dNo);

  void update(License license);

  List<License> dlist(int D_no);

  List<License> llist(int D_no);

  void delete(int dNo);
}
