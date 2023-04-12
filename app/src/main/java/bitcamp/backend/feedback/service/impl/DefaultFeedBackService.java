package bitcamp.backend.feedback.service.impl;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import bitcamp.backend.feedback.dao.FeedBackDao;
import bitcamp.backend.feedback.service.FeedBackService;
import bitcamp.backend.feedback.vo.FeedBack;


@Service
public class DefaultFeedBackService implements FeedBackService {

  @Autowired
  private FeedBackDao feedBackDao;

  @Override
  public void add(FeedBack feedBack) {
    feedBackDao.insert(feedBack);
  }

  @Override
  public List<FeedBack> blist(int no) {
    return feedBackDao.findByBoardNo(no);
  }

  @Override
  public List<FeedBack> dlist(int no) {

    return feedBackDao.findByDoctorNo(no);
  }

  @Override
  public FeedBack get(int bno, int dno) {

    return feedBackDao.findByFeed(bno, dno);
  }

  @Override
  public void update(FeedBack feedBack) {
    feedBackDao.update(feedBack);
  }

  @Override
  public void delete(int no) {

  }

}
