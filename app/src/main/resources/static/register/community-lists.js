
document.querySelector('#btn-write').onclick = (e) => {
  location.href='community-write.html';
};

let myno = 0;

fetch(`http://175.106.99.31/auth/user`, {
  method: 'GET'
})
  .then(response => response.json())
  .then(data => {
    if (data.status == "success") {
     // console.log(data.data)
      return data.data;
    } else {
      location.href = "../auth/doctors-login.html"
    }
    return data.data
})
.then((user) => {
  myno = user.no
 // console.log(myno)
})

tbody = document.querySelector('#community-list')

fetch('http://175.106.99.31/community/list')
  .then((response) => response.json())
  .then((data) => {

    function categoryName(category) {
      switch (category) {
        case 1 :
          return '자유게시판';
        case 2 :
          return '의학뉴스';
        case 3 :
          return '질문게시판';
        default : 
          return '-';
      }
    }
   
    var html = '';
    
     for( row of data.data) {
      html += `<tr>
          <td>${row.no}</td>
          <td><a href="community-view.html?no=${row.no}">${row.title}</a></td>
          <td>${row.doctorName}</td>
          <td>${categoryName(row.category)}</td>
          <td>${row.viewCnt}</td>
          <td>${row.createdDate}</td>
          </tr>\n`;
    }
   // console.log(data);
    tbody.innerHTML = html;
  

    // 조회수가 가장 높은 게시글 정보를 HTML에 추가
    var hotPostings = data.data.sort(function(a, b) {
      return b.viewCnt - a.viewCnt;
    }).slice(0, 2);

    var hotPosting1 = hotPostings[0];
    var hotPosting2 = hotPostings[1];
   // console.log(hotPosting1.no);
  //  console.log(hotPosting2);
    
    document.querySelector("#hot-posting1").textContent = `${hotPosting1.title} (${hotPosting1.viewCnt} views)`;
    document.querySelector("#hot-posting2").textContent = `${hotPosting2.title} (${hotPosting2.viewCnt} views)`;
  
    document.querySelector('#hot-posting1').onclick = (e) => {
    location.href = `community-view.html?no=${hotPosting1.no}`;
    }
    document.querySelector('#hot-posting2').onclick = (e) => {
    location.href = `community-view.html?no=${hotPosting2.no}`;
    }
  })
  .catch((err) => {
    alert('서버 요청 오류!');
    console.log(err);
  });
  
  // 네이버 검색 API
  document.querySelector('.naver-btn').onclick = (e) => {  
    var searchNaver = document.querySelector('#naver-search').value;
    document.querySelector('#when-searched').style.display = 'block';
    
    fetch(`http://175.106.99.31/community/search?query=${searchNaver}`)
    .then(response => response.json())
    .then(data => {
      if (data.status == "success") {
        /*console.log("성공:",  JSON.parse(data.data));*/
        let list = JSON.parse(data.data).items;
        console.log(list);
        console.log(list[0].title);
        
       for(i = 0; i < 3; i++) {
         document.querySelector(`#search-title-${i}`).innerHTML = list[i].title;
         document.querySelector(`#search-desc-${i}`).innerHTML = list[i].description;
         document.querySelector(`#search-blogger-${i}`).innerHTML = list[i].bloggername;
         document.querySelector(`#search-date-${i}`).innerHTML = list[i].postdate;
         
         document.querySelector(`#search-${i}`).onclick = (e) => {
           location.href = list[i].link;
         }
         
       }        
      }
    })
    .catch((err) => {
      alert('서버 요청 오류!');
      console.log(err);
    });
    }

  
  
  