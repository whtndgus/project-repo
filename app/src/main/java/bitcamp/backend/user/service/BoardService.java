package bitcamp.backend.user.service;

import java.util.List;
import bitcamp.backend.user.vo.Board;


public interface BoardService {
  void add(Board board);

  void addBe(Board board);

  List<Board> list(String keyword);

  Board get(int no);

  Board get(String password);

  void update(Board board);

  void delete(int no);

  List<Board> plist(int i);
}
