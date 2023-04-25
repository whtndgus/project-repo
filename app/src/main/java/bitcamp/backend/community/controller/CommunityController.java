package bitcamp.backend.community.controller;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URI;
import java.net.URL;
import java.net.URLEncoder;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import com.fasterxml.jackson.databind.ObjectMapper;
import bitcamp.backend.community.service.CommunityImgService;
import bitcamp.backend.community.service.CommunityService;
import bitcamp.backend.community.service.RecommentService;
import bitcamp.backend.community.vo.Community;
import bitcamp.util.RestResult;
import bitcamp.util.RestStatus;

@RestController
@RequestMapping("/community")
@CrossOrigin("*")
public class CommunityController {

  // Logger log = LogManager.getLogger(getClass());

  @Autowired
  private CommunityService communityService;

  @Autowired
  private CommunityImgService communityImgService;

  @Autowired
  private RecommentService recommentService;

  @PostMapping
  public Object insert(@RequestBody Community community) {

    RestResult restResult = new RestResult();
    community.setFilter(!negaText(community.getTitle() + community.getContent(), 0.9));
    communityService.add(community);
    restResult.setData(community);
    restResult.setStatus(RestStatus.SUCCESS);
    restResult.setStatus(RestStatus.FAILURE);

    return restResult;

  }

  @GetMapping("/list")
  public Object list() {
    return new RestResult().setStatus(RestStatus.SUCCESS).setData(communityService.list());
  }

  @GetMapping("{no}")
  public Object view(@PathVariable int no) {
    return new RestResult().setStatus(RestStatus.SUCCESS).setData(communityService.get(no))
        .setPhoto(communityImgService.get(no));
  }

  @PutMapping
  public Object update(@RequestBody Community community) {

    community.setFilter(!negaText(community.getTitle() + community.getContent(), 0.9));
    communityService.update(community);

    RestResult restResult = new RestResult();
    return restResult.setStatus(RestStatus.SUCCESS).setData(community);
  }

  @DeleteMapping("{no}")
  public Object delete(@PathVariable int no) {
    System.out.println("커뮤 사진번호 : " + no);

    recommentService.deleteCno(no);
    communityImgService.delete(no);
    communityService.delete(no);
    return new RestResult().setStatus(RestStatus.SUCCESS);
  }

  @GetMapping("/search")
  public Object search(@RequestParam String query) {
    return new RestResult().setStatus(RestStatus.SUCCESS).setData(Naver(query));
  }

  public Object Naver(String str) {
    System.out.println(str);
    String clientId = "hw5sLEXYEIU41gqRI7Tn"; // API Client ID
    String clientSecret = "Q4OYDrcdPf"; // API Client Secret

    try {
      String query = str; // 검색어
      String encodedQuery = URLEncoder.encode(query, "UTF-8");
      String apiUrl = "https://openapi.naver.com/v1/search/blog.json?query=" + encodedQuery + "&sort=sim"; // API URL

      URL url = new URL(apiUrl);
      HttpURLConnection conn = (HttpURLConnection) url.openConnection();
      conn.setRequestMethod("GET");
      conn.setRequestProperty("X-Naver-Client-Id", clientId);
      conn.setRequestProperty("X-Naver-Client-Secret", clientSecret);

      int responseCode = conn.getResponseCode();
      BufferedReader br;

      if (responseCode == 200) { // 성공적으로 API를 호출한 경우
        br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
      } else { // 에러 발생한 경우
        br = new BufferedReader(new InputStreamReader(conn.getErrorStream()));
      }

      String inputLine;
      StringBuffer response = new StringBuffer();

      while ((inputLine = br.readLine()) != null) {
        response.append(inputLine);
      }
      br.close();
      return response;

    } catch (Exception e) {
      System.out.println(e);
      return null;
    }
  }

  public boolean negaText(String str, double d) {
    try {
      HttpHeaders headers = new HttpHeaders();
      headers.setContentType(MediaType.APPLICATION_JSON);
      headers.set("X-NCP-APIGW-API-KEY-ID", "djlxkf8glr");
      headers.set("X-NCP-APIGW-API-KEY", "WKmWLEDy3PCDtnpZw1X8EZETZTLAvANUCnmk9a0a");
      Map<String, Object> text = new HashMap<>();
      text.put("content", str);
      ObjectMapper objectMapper = new ObjectMapper();
      String body;
      body = objectMapper.writeValueAsString(text);
      HttpEntity<String> httpBody = new HttpEntity<>(body, headers);
      RestTemplate restTemplate = new RestTemplate();
      restTemplate.setRequestFactory(new HttpComponentsClientHttpRequestFactory());
      Map<String, Object> response = restTemplate.postForObject(
          new URI("https://naveropenapi.apigw.ntruss.com/sentiment-analysis/v1/analyze"), httpBody,
          Map.class);
      List<Object> sen = (List<Object>) response.get("sentences");
      Map<String, Object> senten = (Map<String, Object>) sen.get(0);
      Map<String, Object> sentence = (Map<String, Object>) senten.get("confidence");
      double nega = (double) sentence.get("negative");

      return nega >= d;
    } catch (Exception e) {
      e.printStackTrace();
      return false;
    }
  }

}
