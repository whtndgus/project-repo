package bitcamp.backend.user.dao;

import java.util.List;
import org.apache.ibatis.annotations.Mapper;
import bitcamp.backend.user.vo.Board;

@Mapper
public interface BoardDao {
  void insert(Board board);

  List<Board> findAll(String keyword);

  Board findByNo(int no);

  Board findByPassword(String serial);

  void increaseViewCount(int no);

  int update(Board b);

  int delete(int no);

  List<Board> findByPno(int i);
}
