package bitcamp.backend.feedback.service.impl;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import bitcamp.backend.feedback.dao.FeedBackDao;
import bitcamp.backend.feedback.service.FeedBackService;
import bitcamp.backend.feedback.vo.FeedBack;
import bitcamp.backend.register.dao.LicenseDao;
import bitcamp.backend.register.vo.License;


@Service
public class DefaultFeedBackService implements FeedBackService {

  @Autowired
  private FeedBackDao feedBackDao;
  @Autowired
  private LicenseDao licenseDao;

  @Override
  public void add(FeedBack feedBack) {
    feedBackDao.insert(feedBack);
  }

  @Override
  public List<FeedBack> blist(int no) {
    List<FeedBack> feeds = feedBackDao.findByBoardNo(no);
    for(int i = 0; i < feeds.size(); i++) {
      feeds.get(i).setDoc_license(licenseDao.findByDno(feeds.get(i).getDoc_no()));
    }
    return feeds;
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
  public void deleteBno(int no) {
    feedBackDao.deleteByBno(no);
  }

  @Override
  public void deleteDno(int no) {
    feedBackDao.deleteByDno(no);
  }

}
