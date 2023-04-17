package bitcamp.backend.community.service;

import java.util.List;
import bitcamp.backend.community.vo.Community;


public interface CommunityService {

  void add(Community community);
  List<Community> list();
  Community get(int no);
  void update(Community community);
  void delete(int no);

}

