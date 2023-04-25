package bitcamp.backend.qna.dao;

import java.util.List;
import org.apache.ibatis.annotations.Mapper;
import bitcamp.backend.qna.vo.QnA;

@Mapper
public interface QnADao {

  void insert(QnA qnA);

  List<QnA> findAll();

  QnA findByNo(int no);

  QnA findByMno(int no);

  int update(QnA b);

  int updateM(QnA b);

  int delete(int no);

  int deleteM(int no);

}
