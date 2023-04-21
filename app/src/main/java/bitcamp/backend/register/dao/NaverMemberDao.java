package bitcamp.backend.register.dao;

import org.apache.ibatis.annotations.Mapper;
import bitcamp.backend.register.vo.NaverMember;

@Mapper
public interface NaverMemberDao {

  void insert(NaverMember n);
  NaverMember findByEmail(String email);
  NaverMember update(NaverMember n);
}