package bitcamp.backend.register.service;

import bitcamp.backend.register.vo.NaverMember;

public interface NaverMemberService {
  void add(NaverMember naverMember);
  NaverMember get(String email);
  void update(NaverMember naverMember);
}
