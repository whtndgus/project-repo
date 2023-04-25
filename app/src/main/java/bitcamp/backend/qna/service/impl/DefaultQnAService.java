package bitcamp.backend.qna.service.impl;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import bitcamp.backend.qna.dao.QnADao;
import bitcamp.backend.qna.service.QnAService;
import bitcamp.backend.qna.vo.QnA;
import bitcamp.backend.register.dao.MemberDao;

@Service
public class DefaultQnAService implements QnAService {

  @Autowired
  private MemberDao memberDao;

  @Autowired
  private QnADao qnADao;

  @Override
  public void add(QnA qnA) {
    if (qnADao.findByNo(qnA.getNo()) != null) {

    } else {
      qnADao.insert(qnA);
    }
  }

  @Override
  public List<QnA> list() {
    return qnADao.findAll();
  }

  @Override
  public QnA get(int no) {
    return qnADao.findByNo(no);
  }

  @Override
  public QnA getM(int no) {
    return qnADao.findByMno(no);
  }

  @Override
  public void update(QnA qnA) {
    qnADao.update(qnA);
  }

  @Override
  public void updateM(QnA qnA) {
    qnADao.updateM(qnA);
  }

  @Override
  public void delete(int no) {
    qnADao.delete(no);
  }

  @Override
  public void deleteM(int no) {
    qnADao.deleteM(no);
  };


}
