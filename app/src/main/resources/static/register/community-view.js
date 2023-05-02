const tooltipTriggerList = document.querySelectorAll(
  '[data-bs-toggle="tooltip"]'
);
const tooltipList = [...tooltipTriggerList].map(
  (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
);

let urlParams = new URL(location.href).searchParams;
let no = urlParams.get("no");

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

function categoryNum(category) {
  switch (category) {
    case "자유게시판":
      return 1;
    case "의학뉴스":
      return 2;
    case "질문게시판":
      return 3;
    default:
      return "-";
  }
}

$("#former-btn").click (() => {
  location.href = "doctors-community-main.html";
});


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
          // console.log(communityData);
          //console.log(recommentData);
          // 본인 글을 조회하는 경우와 아닌경우 버튼
          if (myno == communityData.data.doctorNo) {
            $("#uptdel-btns").show();
            $("#title").prop("readOnly", false);
            $(".content").prop("readOnly", false);
            // $("#category").prop("readOnly", false);
            // $("#createdDate").prop("readOnly", false);
            $("#btn-img-delete").show();
          } else {
            $("#uptdel-btns").hide();
            $("#title").prop("readOnly", true);
            $(".content").prop("readOnly", true);
            // $("#category").prop("readOnly", true);
            // $("#createdDate").prop("readOnly", true);
            $("#btn-img-delete").hide();
          }
    
          $("#title").val(communityData.data.title);
          $("#category").val(categoryName(communityData.data.category));
          $("#doctorName").val(communityData.data.doctorName);
          $("#createdDate").val(communityData.data.createdDate);
          $(".content").val(communityData.data.content);
    
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
          });
    
          for (var row of recommentData.data) {
            if (row.docNo == myno) {
              console.log(document.querySelector(`#btn-recomment-delete-${row.recNo}`))
              document.querySelector(`#btn-recomment-delete-${row.recNo}`).onclick = ((e) => {
                
                fetch(`http://175.106.99.31/recomment/delete/${row.recNo}`, {
                  method: "DELETE",
                })
                  .then((response) => response.json())
                  .then((data) => {
                    console.log("성공:", data);
                    location.reload();
                  })
                  .catch((error) => {
                    console.error("실패:", error);
                  });
              });
    
            }
          }
        })
        .catch((err) => {
          //alert('서버 요청 오류!');
          console.log(err);
        });
    
      //댓글 입력
      document.querySelector("#rec-save-btn").onclick = ((e) => {
        if (document.querySelector(".recomment").value.length < 3) {
          Swal.fire({
            icon: 'error',
            title: "댓글 입력 실패!",
            text: "입력 값이 너무짧습니다",
            width: 400,
            height: 320,
            showConfirmButton: false,
            timer: 750
    
          });
          return;
        }
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
      });
    
    
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
            category: categoryNum(document.querySelector("#category").value),
            content: document.querySelector(".content").value,
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
              Swal.fire({
                icon: 'error',
                title: "삭제 실패!\n" + data.data,
                width: 400,
                height: 320,
                showConfirmButton: false,
                timer: 750
              });
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
  })


