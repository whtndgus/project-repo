package bitcamp.backend.community.dao;

import java.util.List;
import org.apache.ibatis.annotations.Mapper;
import bitcamp.backend.community.vo.CommunityImg;

@Mapper
public interface CommunityImgDao {

  void insertImg(CommunityImg communityImg);
  int deleteImg(int no);
  List<CommunityImg> findByCno(int no);

}
