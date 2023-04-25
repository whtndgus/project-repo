package bitcamp.backend.qna.service;

import java.util.List;
import bitcamp.backend.qna.vo.QnA;


public interface QnAService {
  void add(QnA qnA);

  List<QnA> list();

  QnA get(int no);

  QnA getM(int no);

  void update(QnA qnA);

  void updateM(QnA qnA);

  void delete(int no);

  void deleteM(int no);
}
