package bitcamp.backend.register.dao;

import java.util.List;
import org.apache.ibatis.annotations.Mapper;
import bitcamp.backend.register.vo.HosPhoto;
@Mapper
public interface HosPhotoDao {
  void insert(HosPhoto hosPhoto);
  List<HosPhoto> findAll();
  HosPhoto findByHospitalNo(int no);
  int update(HosPhoto hosPhoto);
  int deleteImg(int no);
  int delete(int no);//병원의 모든사진 지우기
  List<HosPhoto>findByHno(int no);
}
