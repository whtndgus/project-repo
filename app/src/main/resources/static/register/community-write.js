// 로그인 정보 가져오기
let myno = 0;
let password = document.querySelector('#password').value;

fetch(`http://localhost:8080/auth/user`, {
  method: 'GET'
})
  .then(response => response.json())
  .then(data => {
    if (data.status == "success") {
      return data.data;
    } else {
      location.href = "../auth/doctors-login.html"
    }
    return data.data
})
.then((user) => {
  myno = user.no
  console.log(myno)
})

// 게시글 입력
document.querySelector('.btn-submit').onclick = (e) => {
  
  if (pwd == null) {
    alert ('비밀번호를 입력해주세요!');
  } else {
    fetch("http://localhost:8080/community", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        doctorNo: myno,
        password: password,
        title: document.querySelector('#title').value,
        content: document.querySelector('.content').value,
        category: Number(document.querySelector('#category').value),
        filter: 0,
        area: 0
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("성공:", data);
        submitFiles(data.data.no);
      })
      .catch((error) => {
        console.error("실패:", error);
      })
   } 
};


function submitFiles(no) {
console.log(no);
  let formData = new FormData();
  let files = document.querySelector(".community-files").files;

  if (files.length == 0) {
    return
  }

  for (let i = 0; i < files.length; i++) {
    if (files[i].name.includes(".bmp") || files[i].name.includes(".jpeg") || files[i].name.includes(".jpg") || files[i].name.includes(".gif") || files[i].name.includes(".png") || files[i].name.includes(".tiff") || files[i].name.includes(".psd") || files[i].name.includes(".tga") || files[i].name.includes(".ai") || files[i].name.includes(".svg") || files[i].name.includes(".exif") || files[i].name.includes(".jfif")) {
      formData.append("files", files[i]);

      formData.append("comNo", no); //  여기 입력되는 정수가 커뮤 번호여야 한다
    }
  }
  $.ajax({
    url: 'http://localhost:8080/communityImg/insertComImg',
    data: formData,
    cache: false,
    contentType: false,
    processData: false,
    type: 'POST',
    success: function (data) {
      console.log("데이터 업로드 성공");
      location.href = 'doctors-community-main.html';
      
    },
    error: function (e) {
      console.log("데이터 업로드 실패");
    }
  });
}

