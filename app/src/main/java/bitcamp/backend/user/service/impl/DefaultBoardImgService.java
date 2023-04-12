package bitcamp.backend.user.service.impl;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import bitcamp.backend.user.dao.BoardImgDao;
import bitcamp.backend.user.service.BoardImgService;
import bitcamp.backend.user.vo.BoardImg;

@Service
public class DefaultBoardImgService implements BoardImgService {

  @Autowired
  private BoardImgDao boardImgDao;

  @Override
  public void add(BoardImg boardImg) {
    boardImgDao.insert(boardImg);
  }

  @Override
  public List<BoardImg> list(int B_no) {
    return boardImgDao.findByBno(B_no);
  }

  @Override
  public BoardImg get(int no) {
    return boardImgDao.findByNo(no);
  }

  @Override
  public void update(BoardImg boardImg) {

  }

  @Override
  public void delete(int no) {

  }

}
