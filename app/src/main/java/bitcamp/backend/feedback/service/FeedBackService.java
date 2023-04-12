package bitcamp.backend.feedback.service;

import java.util.List;
import bitcamp.backend.feedback.vo.FeedBack;

public interface FeedBackService {
  void add(FeedBack feedBack);

  List<FeedBack> blist(int no);

  List<FeedBack> dlist(int no);

  FeedBack get(int bno, int dno);

  void update(FeedBack feedBack);

  void delete(int no);
}
