package bitcamp.backend.community.service.impl;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import bitcamp.backend.community.dao.RecommentDao;
import bitcamp.backend.community.service.RecommentService;
import bitcamp.backend.community.vo.Recomment;

@Service
public class DefaultRecommentService implements RecommentService {

  @Autowired
  private RecommentDao recommentDao;

  @Override
  public void add(Recomment recomment) {
    recommentDao.insertRec(recomment);
  }

  @Override
  public List<Recomment> list(int no) {
    return recommentDao.findAllRec(no);
  }

  @Override
  public void delete(int recNo) {
    recommentDao.deleteRec(recNo);
  }

  @Override
  public void deleteCno(int no) {
    recommentDao.delete(no);

  }

}
