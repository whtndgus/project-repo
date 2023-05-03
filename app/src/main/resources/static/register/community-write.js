// 로그인 정보 가져오기
let myno = 0;

document.querySelector('#former-btn').onclick = (e) => {
  location.href= "doctors-community-main.html"
}

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

// 게시글 입력
document.querySelector(".btn-submit").onclick = (e) => {
  if(document.querySelector("#title").value.length < 2 || document.querySelector("#title").value == " " || document.querySelector("#title").value == "  ") {
    Swal.fire({
      icon: 'error',
      title: '게시글은 반드시 2글자 이상 입력이 필요합니다',
      width: 400,
      height: 320,
      showConfirmButton: false,
      timer: 750
    })
    return;
  }else if(!(Number(document.querySelector("#category").value) > 0)) {
    Swal.fire({
      icon: 'error',
      title: '커뮤니티 항목이 선택되지 않았습니다',
      width: 400,
      height: 320,
      showConfirmButton: false,
      timer: 750
    })
    return;
  }else if(document.querySelector(".content").value.length < 1 || document.querySelector(".content").value == " ") {
    Swal.fire({
      icon: 'error',
      title: '글 내용이 입력되지 않았습니다',
      width: 400,
      height: 320,
      showConfirmButton: false,
      timer: 750
    })
    return;
  }

  fetch("http://175.106.99.31/community", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      doctorNo: myno,
      title: document.querySelector("#title").value,
      content: document.querySelector(".content").value,
      category: Number(document.querySelector("#category").value),
      filter: 0,
      area: 0,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("성공:", data);
      submitFiles(data.data.no);
      location.href = "doctors-community-main.html";
    })
    .catch((error) => {
      console.error("실패:", error);
    });
};

function submitFiles(no) {
  console.log(no);
  let formData = new FormData();
  let files = document.querySelector(".community-files").files;

  if (files.length == 0) {
    return;
  }

  for (let i = 0; i < files.length; i++) {
    if (
      files[i].name.includes(".bmp") ||
      files[i].name.includes(".jpeg") ||
      files[i].name.includes(".jpg") ||
      files[i].name.includes(".gif") ||
      files[i].name.includes(".png") ||
      files[i].name.includes(".tiff") ||
      files[i].name.includes(".psd") ||
      files[i].name.includes(".tga") ||
      files[i].name.includes(".ai") ||
      files[i].name.includes(".svg") ||
      files[i].name.includes(".exif") ||
      files[i].name.includes(".jfif")
    ) {
      formData.append("files", files[i]);

      formData.append("comNo", no); //  여기 입력되는 정수가 커뮤 번호여야 한다
    }
  }
  $.ajax({
    url: "http://175.106.99.31/communityImg/insertComImg",
    data: formData,
    cache: false,
    contentType: false,
    processData: false,
    type: "POST",
    success: function (data) {
      console.log("데이터 업로드 성공");
    },
    error: function (e) {
      console.log("데이터 업로드 실패");
    },
  });
}
