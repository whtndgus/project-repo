package bitcamp.backend.user.dao;

import java.util.List;
import org.apache.ibatis.annotations.Mapper;
import bitcamp.backend.user.vo.BoardImg;

@Mapper
public interface BoardImgDao {

  public void insert(BoardImg boardImg);

  public List<BoardImg> findByBno(int b_no);

  public BoardImg findByNo(int no);


}
