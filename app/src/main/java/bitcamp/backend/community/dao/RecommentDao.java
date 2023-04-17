package bitcamp.backend.community.dao;

import java.util.List;
import org.apache.ibatis.annotations.Mapper;
import bitcamp.backend.community.vo.Recomment;

@Mapper
public interface RecommentDao {

  void insertRec(Recomment recomment);

  List<Recomment> findAllRec(int no);

  int deleteRec(int no);

  int delete(int no);
}
