package bitcamp.backend.register.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import bitcamp.backend.register.dao.NaverMemberDao;
import bitcamp.backend.register.service.NaverMemberService;
import bitcamp.backend.register.vo.NaverMember;

@Service
public class DefaultNaverMemberService implements NaverMemberService {

  @Autowired private NaverMemberDao naverMemberDao;

  @Transactional
  @Override
  public void add(NaverMember naverMember) {
    naverMemberDao.insert(naverMember);
  }

  @Override
  public NaverMember get(String email) {
    return naverMemberDao.findByEmail(email);
  }

  @Override
  public void update(NaverMember naverMember) {
    naverMemberDao.update(naverMember);
  }

}
