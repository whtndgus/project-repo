let patientNo = 0;
let samePw = false;
patientNo = 0;

fetch(`http://localhost:8080/auth/user`, {
  method: 'GET'
})
  .then(response => response.json())
  .then(data => {
    if (data.status == "success") {
      document.querySelector('#username').innerHTML = data.data.name;
      console.log(data.data)
      return data.data;
    } else {
      location.href = "../auth/patients-login.html"
    }
  })
  .then((user) => {
    patientNo = user.no;
    if (patientNo > 0) {
      fetch(`http://localhost:8080/patients/${patientNo}`, {
        method: 'GET'
      })
        .then(response => response.json())
        .then(data => {
          if (data.status == "success") {
            data = data.data;

            if (data.phoUrl != null) {
              let imgUrl = "http://uyaxhfqyqnwh16694929.cdn.ntruss.com/member-img/" + data.phoUrl + "?type=f&w=120&h=180&quality=90&autorotate=true&faceopt=true&anilimit=24"
              document.querySelector(".patients-img").src = imgUrl;
            } else {

            }

            document.querySelector(".top-name").innerText = data.name

            document.querySelector(".patients-name").innerText = data.name
            document.querySelector(".change-name").value = data.name
            document.querySelector(".patients-name").innerHTML = document.querySelector(".patients-name").innerHTML + `<span class="patients-gender">${data.gender ? "남성" : "여성"}</span>`

            document.querySelector(".patients-id").innerText = data.id
            document.querySelector(".change-id").value = data.id

            document.querySelector(".patients-birth").innerText = data.birth
            document.querySelector(".change-birth").value = data.birth

            document.querySelector(".patients-tel").innerText = data.tel
            document.querySelector(".change-tel").value = data.tel

            document.querySelector(".patients-addr").innerText = data.addr
            document.querySelector(".change-addr").value = data.addr

            document.querySelector(".patients-email").innerText = data.email
            document.querySelector(".change-email").value = data.email

            document.querySelector(".patients-drug").innerText = data.drug
            document.querySelector(".change-drug").value = data.drug
            document.querySelector(".change-phy").value = data.phy
          } else {
            console.log("잘못 된 회원 정보")
          }
        })
    }

  })
var popupWidth = 320;
var popupHeight = 450;

var popupX = (window.screen.width / 2) - (popupWidth / 2);

var popupY = (window.screen.height / 2) - (popupHeight / 2);

function tel() {
  console.log(11)
  window.open("tel-input.html", "popupNo1", 'status=no, height=' + popupHeight + ', width=' + popupWidth + ', left=' + popupX + ', top=' + popupY);
}

$(".change-btn").click(() => {
  let formData = new FormData();
  if (document.querySelector(".change-img").files.length > 0) {
    formData.append("file", document.querySelector(".change-img").files[0])
    fetch(`http://localhost:8080/patients/${patientNo}`, {
      method: 'POST',
      body: formData,
    })
      .then(response => response.json())
      .then(data => {
        console.log(data)
      })
  }
  formData.append("id", document.querySelector(".change-id").value);
  formData.append("name", document.querySelector(".change-name").value);
  formData.append("birth", document.querySelector(".change-birth").value);
  formData.append("tel", document.querySelector(".change-tel").value);
  formData.append("addr", document.querySelector(".change-addr").value);
  // formData.append("gender", '1');
  formData.append("email", document.querySelector(".change-email").value);
  formData.append("drug", document.querySelector(".change-drug").value);
  formData.append("phy", document.querySelector(".change-phy").value);

  fetch(`http://localhost:8080/patients/${patientNo}`, {
    method: 'PUT',
    body: formData,
  })
    .then(response => response.json())
    .then(data => {
      console.log(data)
      window.location = ""
    })
})

function checkPw() {
  let pw = document.querySelector(".change-pw").value;
  let checkpw = document.querySelector(".change-pw-check").value;
  if (pw == checkpw) {
    $(".change-pw-check").css("border", "2px solid #0d62fd");
    $(".change-pw").css("border", "2px solid #0d62fd");
    samePw = true;
  } else {
    $(".change-pw-check").css("border", "2px solid #ff5a5a");
    $(".change-pw").css("border", "2px solid #ff5a5a");
    samePw = false;
  }
}

$(".change-pw-btn").click(() => {
  if (samePw && document.querySelector(".change-pw-check").value != document.querySelector(".patients-pw").value) {
    fetch(`http://localhost:8080/patients/updatePw/${patientNo}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        password: document.querySelector(".patients-pw").value,
        changepassword: document.querySelector(".change-pw-check").value
      })
    })
      .then(response => response.json())
      .then(data => {
        if (data.status == "success") {
          alert("비밀번호 정상적으로 변경됨");
          window.location = ""
        } else {
          alert("기존 비밀번호와 다름");
        }
      })
  } else {
    alert("비밀번호 확인 과 입력 비밀번호가 다르거나 기존 비밀번호와 동일")
  }
})


// {
//   "messages":{
//     "to":"01051521314",
//     "content":"1234"
//   },
//   "from":"01012345678",
//   "type":"SMS",
//   "contentType":"COMM",
//   "content":"1234"
// }