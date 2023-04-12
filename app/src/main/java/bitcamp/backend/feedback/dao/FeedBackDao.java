package bitcamp.backend.feedback.dao;

import java.util.List;
import org.apache.ibatis.annotations.Mapper;
import bitcamp.backend.feedback.vo.FeedBack;


@Mapper
public interface FeedBackDao {

  void insert(FeedBack feedBack);

  List<FeedBack> findByBoardNo(int no);

  List<FeedBack> findByDoctorNo(int no);

  FeedBack findByFeed(int bno, int dno);

  void update(FeedBack feedBack);

}
