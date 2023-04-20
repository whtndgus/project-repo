package bitcamp.backend.user.service.impl;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import bitcamp.backend.feedback.dao.FeedBackDao;
import bitcamp.backend.user.dao.BoardDao;
import bitcamp.backend.user.dao.BoardImgDao;
import bitcamp.backend.user.service.BoardService;
import bitcamp.backend.user.vo.Board;

@Service
public class DefaultBoardService implements BoardService {

  @Autowired
  private BoardDao boardDao;

  @Autowired
  private BoardImgDao boardImgDao;

  @Autowired
  private FeedBackDao feedBackDao;

  @Override
  public void add(Board board) {
    boardDao.insert(board);
  }

  @Override
  public Board get(String password) {
    return boardDao.findByPassword(password);
  }

  @Override
  public List<Board> list(String keyword) {
    return boardDao.findAll(keyword);
  }

  @Override
  public Board get(int no) {
    Board b = boardDao.findByNo(no);
    return b;
  }

  @Override
  public void update(Board board) {
    if (boardDao.update(board) == 0) {
      throw new RuntimeException("게시글이 존재하지 않습니다!");
    }
  }

  @Override
  public void delete(int no) {
    boardImgDao.deleteByBno(no);
    feedBackDao.deleteByBno(no);
    if (boardDao.delete(no) == 0) {
      throw new RuntimeException("게시글이 존재하지 않습니다!");
    }
  }

  @Override
  public List<Board> plist(int i) {
    return boardDao.findByPno(i);
  }
}
