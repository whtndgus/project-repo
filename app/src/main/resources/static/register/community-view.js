const tooltipTriggerList = document.querySelectorAll(
  '[data-bs-toggle="tooltip"]'
);
const tooltipList = [...tooltipTriggerList].map(
  (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
);

let urlParams = new URL(location.href).searchParams;
let no = urlParams.get("no");

let myno = 0;

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
  });

document.querySelector("#former-btn").onclick = (e) => {
  location.href = "doctors-community-main.html";
};

/*//게시글,댓글 데이터 가져오기
const fetch1 = fetch(`http://175.106.99.31/community/${no}`);
const fetch2 = fetch(`http://175.106.99.31/recomment/${no}`);

Promise.all([fetch1, fetch2])
.then(responses => Promise.all(responses.map(response => response.json())))
.then((data) => {
  var communityData = data[0];
  var recommentData = data[1];
  console.log(communityData);
  
 // 버튼 상태 초기화
  document.querySelector('#uptdel-btns').style.display = 'none';
  document.querySelector('#title').readOnly = true;
  document.querySelector('#content').readOnly = true;
  document.querySelector('#category').readOnly = true;
  document.querySelector('#createdDate').readOnly = true;

// 본인 글을 조회하는 경우와 아닌경우 버튼
   if ( myno == communityData.data.doctorNo ) {  
      document.querySelector('#uptdel-btns').style.display = 'block';    
      document.querySelector('#title').readOnly = false;
      document.querySelector('#content').readOnly = false;
      document.querySelector('#category').readOnly = false;
      document.querySelector('#createdDate').readOnly = false;
    } else {
      document.querySelector('#uptdel-btns').style.display = 'none';
      document.querySelector('#title').readOnly = true;
      document.querySelector('#content').readOnly = true;
      document.querySelector('#category').readOnly = true;
      document.querySelector('#createdDate').readOnly = true;
    }

  document.querySelector('#title').value = communityData.data.title;
  document.querySelector('#category').value = communityData.data.category;
  document.querySelector('#doctorName').value = communityData.data.doctorName;
  document.querySelector('#createdDate').value = communityData.data.createdDate;
  document.querySelector('#content').value = communityData.data.content;
  
  // 사진 없을 경우와 있을 경우 이미지 삭제 버튼
  if (communityData.photo[0] != null) {
    // 이미지 옵티마이저
      let photoUrl = "http://uyaxhfqyqnwh16694929.cdn.ntruss.com/community-img/"+communityData.photo[0].imgUrl+"?type=f&w=500&h=500&quality=85&autorotate=true&faceopt=true&anilimit=24"
      if(myno == communityData.data.doctorNo) { 
        $('#comImg')[0].src = photoUrl;
        document.querySelector('#btn-img-delete').style.display = 'block'; 
      } else if (myno != communityData.data.doctorNo) {
            $('#comImg')[0].src = photoUrl;
            document.querySelector('#btn-img-delete').style.display = 'none';
        }        
   } else if (communityData.photo[0] == null) {
        $("#comImg").attr('src', ' ');
        document.querySelector('#btn-img-delete').style.display = 'none';
  }
  
  // 두번째 fetch 요청 후
  var tbody = document.querySelector('#recomment-list');
  var html = '';
  for (var row of recommentData.data) {
    console.log (row)
    if ( row.docNo == myno) {
      html += `<tr>
          <td>${row.recNo}</td>
          <td><p>${row.recContent}</p></td>
          <td>${row.docName}</td> 
          <td>${row.createdDate}</td>
          <td><button type="button" class="btn btn-outline-danger btn-sm" 
                      id="btn-recomment-delete-${row.recNo}">X</button></td>
          </tr>\n`;
    } else {
       html += `<tr>
          <td>${row.recNo}</td>
          <td><p>${row.recContent}</p></td>
          <td>${row.docName}</td> 
          <td>${row.createdDate}</td>
          </tr>\n`;
      
    } 
  }
  tbody.innerHTML = html;*/

$.ajax({
  url: `http://175.106.99.31/community/${no}`,
  method: "GET",
  dataType: "json",
}).done(function (communityData) {
  $.ajax({
    url: `http://175.106.99.31/recomment/${no}`,
    method: "GET",
    dataType: "json",
  })
    .done(function (recommentData) {
      /* // 버튼 상태 초기화
    $('#uptdel-btns').hide();
    $('#title').prop('readOnly', true);
    $('#content').prop('readOnly', true);
    $('#category').prop('readOnly', true);
    $('#createdDate').prop('readOnly', true);*/

      console.log(communityData);
      console.log(recommentData);
      // 본인 글을 조회하는 경우와 아닌경우 버튼
      if (myno == communityData.data.doctorNo) {
        $("#uptdel-btns").show();
        $("#title").prop("readOnly", false);
        $("#content").prop("readOnly", false);
        $("#category").prop("readOnly", false);
        $("#createdDate").prop("readOnly", false);
      } else {
        $("#uptdel-btns").hide();
        $("#title").prop("readOnly", true);
        $("#content").prop("readOnly", true);
        $("#category").prop("readOnly", true);
        $("#createdDate").prop("readOnly", true);
      }

      $("#title").val(communityData.data.title);
      $("#category").val(communityData.data.category);
      $("#doctorName").val(communityData.data.doctorName);
      $("#createdDate").val(communityData.data.createdDate);
      $("#content").val(communityData.data.content);

      // 사진 없을 경우와 있을 경우 이미지 삭제 버튼
      if (communityData.photo[0] != null) {
        // 이미지 옵티마이저
        let photoUrl =
          "http://uyaxhfqyqnwh16694929.cdn.ntruss.com/community-img/" +
          communityData.photo[0].imgUrl +
          "?type=f&w=500&h=500&quality=85&autorotate=true&faceopt=true&anilimit=24";
        if (myno == communityData.data.doctorNo) {
          $("#comImg").attr("src", photoUrl);
          $("#btn-img-delete").show();
        } else if (myno != communityData.data.doctorNo) {
          $("#comImg").attr("src", photoUrl);
          $("#btn-img-delete").hide();
        }
      } else if (communityData.photo[0] == null) {
        $("#comImg").attr("src", "");
        $("#btn-img-delete").hide();
      }

      // 두번째 ajax 요청 후
      var tbody = $("#recomment-list");
      var html = "";
      console.log(recommentData);

      $.each(recommentData.data, function (index, row) {
        if (row.docNo == myno) {
          html += `<tr>
          <td>${row.recNo}</td>
          <td><p>${row.recContent}</p></td>
          <td>${row.docName}</td> 
          <td>${row.createdDate}</td>
          <td><button type="button" class="btn btn-outline-danger btn-sm" id="btn-recomment-delete-${row.recNo}">X</button></td>
        </tr>\n`;
        } else {
          html += `<tr>
          <td>${row.recNo}</td>
          <td><p>${row.recContent}</p></td>
          <td>${row.docName}</td> 
          <td>${row.createdDate}</td>
        </tr>\n`;
        }
        tbody.html(html);

        // 댓글 삭제
        for (var row of recommentData.data) {
          document.querySelector(`#btn-recomment-delete-${row.recNo}`).onclick =
            (e) => {
              fetch(`http://175.106.99.31/recomment/delete/${row.recNo}`, {
                method: "DELETE",
              })
                .then((response) => response.json())
                .then((data) => {
                  console.log("성공:", data);
                  location.reload();
                  /* if (data.status == 'failure') {
          alert('댓글 삭제 실패!\n' + data.data);
          return;
        }*/
                })
                .catch((error) => {
                  console.error("실패:", error);
                });
            };
        }
      });
    })

    .catch((err) => {
      //alert('서버 요청 오류!');
      console.log(err);
    });

  //댓글 입력
  document.querySelector("#rec-save-btn").onclick = (e) => {
    fetch("http://175.106.99.31/recomment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        docNo: myno,
        comNo: no,
        recContent: document.querySelector(".recomment").value,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("성공:", data);
        location.reload();
      })
      .catch((error) => {
        console.error("실패:", error);
      });
  };

  //게시물 내용 변경
  document.querySelector("#update-btn").onclick = (e) => {
    fetch("http://175.106.99.31/community", {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        doctorNo: myno,
        no: no,
        title: document.querySelector("#title").value,
        category: document.querySelector("#category").value,
        content: document.querySelector("#content").value,
        filter: 0,
        area: 0,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("성공:", data);
        location.href = location.href;
        //submitFiles(data.data.no);
      })
      .catch((error) => {
        console.error("실패:", error);
      });
  };

  // 게시물 삭제
  document.querySelector("#delete-btn").onclick = (e) => {
    fetch(`http://175.106.99.31/community/${no}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("성공:", data);
        location.href = "doctors-community-main.html";

        if (data.status == "failure") {
          alert("삭제 실패!\n" + data.data);
          return;
        }
      })
      .catch((error) => {
        console.error("실패:", error);
      });
  };

  //이미지만 삭제
  document.querySelector("#btn-img-delete").onclick = (e) => {
    fetch(`http://175.106.99.31/communityImg/${no}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        document.querySelector("#btn-img-delete").style.display = "none";
        location.href = "";
        if (data.status == "failure") {
          console.log("이미지 삭제 실패!\n" + data.data);
          return;
        }
      })
      .catch((error) => {
        console.log("실패:", error);
      });
  };
});
