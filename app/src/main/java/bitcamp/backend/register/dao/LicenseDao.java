package bitcamp.backend.register.dao;

import java.util.List;
import java.util.Map;
import org.apache.ibatis.annotations.Mapper;
import bitcamp.backend.register.vo.License;

@Mapper
public interface LicenseDao {
  public void insert(License license);

  List<License> findAll();

  License findByNo(int no);

  License findByIdAndPassword(Map<String, Object> params);

  int update(License l);

  int delete(License l);

  List<License> findByDno(int d_no);

  List<License> findByLno(int l_no);

}
