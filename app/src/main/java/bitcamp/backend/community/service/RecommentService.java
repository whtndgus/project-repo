package bitcamp.backend.community.service;

import java.util.List;
import bitcamp.backend.community.vo.Recomment;

public interface RecommentService {
  void add(Recomment recomment);

  List<Recomment> list(int no);

  void delete(int recNo);

  void deleteCno(int no);

}
