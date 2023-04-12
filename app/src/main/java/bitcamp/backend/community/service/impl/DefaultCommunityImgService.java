package bitcamp.backend.community.service.impl;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import bitcamp.backend.community.dao.CommunityImgDao;
import bitcamp.backend.community.service.CommunityImgService;
import bitcamp.backend.community.vo.CommunityImg;

@Service
public class DefaultCommunityImgService implements CommunityImgService{

  @Autowired CommunityImgDao communityImgDao;

  @Transactional
  @Override
  public void add(CommunityImg communityImg) {
    communityImgDao.insertImg(communityImg);
  }

  @Override
  public List<CommunityImg> get(int no) {
    return communityImgDao.findByCno(no);
  }

  @Transactional
  @Override
  public void delete(int no) {
    communityImgDao.deleteImg(no);
  }
}
