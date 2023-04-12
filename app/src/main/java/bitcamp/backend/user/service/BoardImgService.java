package bitcamp.backend.user.service;

import java.util.List;
import bitcamp.backend.user.vo.BoardImg;

public interface BoardImgService {

  void add(BoardImg boardImg);

  List<BoardImg> list(int B_no);

  BoardImg get(int no);

  void update(BoardImg boardImg);

  void delete(int no);
}
