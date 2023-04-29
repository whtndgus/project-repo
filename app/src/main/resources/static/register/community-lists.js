const tooltipTriggerList = document.querySelectorAll(
  '[data-bs-toggle="tooltip"]'
);
const tooltipList = [...tooltipTriggerList].map(
  (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
);

document.querySelector("#btn-write").onclick = (e) => {
  location.href = "community-write.html";
};

let myno = 0;
function categoryName(category) {
  switch (category) {
    case 1:
      return "자유게시판";
    case 2:
      return "의학뉴스";
    case 3:
      return "질문게시판";
    default:
      return "-";
  }
}
// 로그인 계정 정보
tbody = document.querySelector("#community-list");
fetch(`http://175.106.99.31/auth/user`, {
  method: "GET",
})
  .then((response) => response.json())
  .then((data) => {
    if (data.status == "success") {
      //사용자 이름
      document.querySelector("#username").innerHTML = data.data.name;
      //사용자 이미지
      const preImageContainer = document.querySelector("#pre-userimg");
      let phoUrl = "";
      if (data.data.phoUrl != "undefined") {
        phoUrl =
          "http://uyaxhfqyqnwh16694929.cdn.ntruss.com/member-img/" +
          data.data.phoUrl +
          "?type=f&w=36&h=36&quality=100&anilimit=24";
      } else {
        phoUrl = "../assets/img/default_profile.png";
      }
      const phoType = data.data.phoType;
      const phoName = data.data.phoName;

      // 새로운 이미지 요소 생성 및 추가
      const newImg = document.createElement("img");
      newImg.setAttribute("id", "userimg");
      newImg.setAttribute("src", phoUrl);
      newImg.setAttribute("alt", phoName);
      newImg.setAttribute("style", "width:36px; border-radius:50%");
      preImageContainer.appendChild(newImg);
      return data.data;
    } else {
      location.href = "../auth/doctors-login.html";
    }
    return data.data;
  })
  .then((user) => {
    console.log(user.hosName !== undefined);
    if (user.hosName !== undefined) {
      myno = user.no;
    } else {
      console.log(user.hosName);
      location.href = "../auth/doctors-login.html";
    }
  })
  .then(() => {
    fetch("http://175.106.99.31/community/list")
      .then((response) => response.json())
      .then((data) => {
        var html = "";

        for (row of data.data) {
          if (row.filter) {
            html += `<tr>
          
            <td><a href="community-view.html?no=${row.no}">${row.title}</a></td>
            <td>${row.doctorName}</td>
            <td>${categoryName(row.category)}</td>
            <td>${row.viewCnt}</td>
            <td>${row.createdDate}</td>
            </tr>\n`;
          }
        }
        // console.log(data);
        tbody.innerHTML = html;

        // 조회수가 가장 높은 게시글 정보를 HTML에 추가
        var hotPostings = data.data
          .sort(function (a, b) {
            return b.viewCnt - a.viewCnt;
          })
          .slice(0, 2);

        var hotPosting1 = hotPostings[0];
        var hotPosting2 = hotPostings[1];
        // console.log(hotPosting1.no);
        //  console.log(hotPosting2);
        document.querySelector(
          "#hot-posting1"
        ).textContent = `${hotPosting1.title} (${hotPosting1.viewCnt} views)`;
        document.querySelector(
          "#hot-posting2"
        ).textContent = `${hotPosting2.title} (${hotPosting2.viewCnt} views)`;

        document.querySelector("#hot-posting1").onclick = (e) => {
          location.href = `community-view.html?no=${hotPosting1.no}`;
        };
        document.querySelector("#hot-posting2").onclick = (e) => {
          location.href = `community-view.html?no=${hotPosting2.no}`;
        };
      })
      .catch((err) => {
        console.log(err);
      });
  });

// 네이버 검색 API
let currentPage = 1;
let list = [];
document.querySelector(".naver-btn").onclick = (e) => {
  var searchNaver = document.querySelector(".naver-search").value;
  document.querySelector("#when-searched").style.display = "block";

  async function getData() {
    const response = await fetch(
      `http://175.106.99.31/community/search?query=${searchNaver}`
    );
    const data = await response.json();
    return data;
  }
  getData()
    .then((data) => {
      // console.log(data);
      if (data.status == "success") {
        //console.log("성공:", JSON.parse(data.data));
        list = JSON.parse(data.data).items;
        console.log(list);
        searchreflesh(currentPage);
      }

      document.querySelector(".page-link-0").onclick = (e) => {
        currentPage = 1;
        searchreflesh(1);
      };
      document.querySelector(".page-link-1").onclick = (e) => {
        currentPage = 2;
        searchreflesh(2);
      };
      document.querySelector(".page-link-2").onclick = (e) => {
        currentPage = 3;
        searchreflesh(3);
      };
    })
    .catch((err) => {
      //alert('서버 요청 오류!');
      console.log(err);
    });
};

function searchreflesh(currentPage) {
  switch (currentPage) {
    case 1:
      for (let i = 0; i < 3; i++) {
        // 현재 페이지에서 출력할 데이터만 출력
        $(`#search-${i}`).css("display", "");
        document.querySelector(`#search-title-${i}`).innerHTML = list[i].title;
        document.querySelector(`#search-desc-${i}`).innerHTML =
          list[i].description;
        document.querySelector(`#search-blogger-${i}`).innerHTML =
          list[i].bloggername;
        document.querySelector(`#search-date-${i}`).innerHTML =
          list[i].postdate;
        document.querySelector(`#search-${i}`).onclick = createOnClickFunction(
          list[i].link
        );
        for (let a = 3; a < 9; a++) {
          $(`#search-${a}`).css("display", "none");
        }
      }
      break;
    case 2:
      for (let i = 3; i < 6; i++) {
        // 현재 페이지에서 출력할 데이터만 출력
        $(`#search-${i}`).css("display", "");
        document.querySelector(`#search-title-${i}`).innerHTML = list[i].title;
        document.querySelector(`#search-desc-${i}`).innerHTML =
          list[i].description;
        document.querySelector(`#search-blogger-${i}`).innerHTML =
          list[i].bloggername;
        document.querySelector(`#search-date-${i}`).innerHTML =
          list[i].postdate;
        document.querySelector(`#search-${i}`).onclick = createOnClickFunction(
          list[i].link
        );
        for (let a = 0; a < 3; a++) {
          $(`#search-${a}`).css("display", "none");
        }
        for (let a = 6; a < 9; a++) {
          $(`#search-${a}`).css("display", "none");
        }
      }
      break;
    case 3:
      for (let i = 6; i < 9; i++) {
        // 현재 페이지에서 출력할 데이터만 출력
        $(`#search-${i}`).css("display", "");
        document.querySelector(`#search-title-${i}`).innerHTML = list[i].title;
        document.querySelector(`#search-desc-${i}`).innerHTML =
          list[i].description;
        document.querySelector(`#search-blogger-${i}`).innerHTML =
          list[i].bloggername;
        document.querySelector(`#search-date-${i}`).innerHTML =
          list[i].postdate;
        document.querySelector(`#search-${i}`).onclick = createOnClickFunction(
          list[i].link
        );
        for (let a = 0; a < 6; a++) {
          $(`#search-${a}`).css("display", "none");
        }
      }
      break;
    default:
      return;
  }
}

function createOnClickFunction(link) {
  return (e) => {
    location.href = link;
  };
}
