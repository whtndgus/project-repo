let doctorNo = 0;
let samePw = false;
doctorNo = 0;

fetch(`http://175.106.99.31/auth/user`, {
  method: 'GET',
})
  .then((response) => response.json())
  .then((data) => {
    if (data.status == 'success') {
      //사용자 이름
      document.querySelector('#username').innerHTML = data.data.name;
      //사용자 이미지
      const preImageContainer = document.querySelector('#pre-userimg');
      let phoUrl = '';
      if (data.data.phoUrl != 'undefined') {
        phoUrl =
          'http://uyaxhfqyqnwh16694929.cdn.ntruss.com/member-img/' +
          data.data.phoUrl +
          '?type=f&w=36&h=36&quality=100&anilimit=24';
      } else {
        phoUrl = '../assets/img/default_profile.png';
      }
      const phoType = data.data.phoType;
      const phoName = data.data.phoName;

      // 새로운 이미지 요소 생성 및 추가
      const newImg = document.createElement('img');
      newImg.setAttribute('id', 'userimg');
      newImg.setAttribute('src', phoUrl);
      newImg.setAttribute('alt', phoName);
      newImg.setAttribute('style', 'width:36px; border-radius:50%');
      preImageContainer.appendChild(newImg);
      return data.data;
    } else {
      location.href = '../auth/doctors-login.html';
    }
  })
  .then((user) => {
    if (!user.passwordcheck) location.href = 'doctors-profile-auth.html';
    if (user.hosName !== undefined) {
    } else {
      console.log(user.hosName);
      location.href = '../auth/doctors-login.html';
    }
    doctorNo = user.no;
    if (doctorNo > 0) {
      fetch(`http://175.106.99.31/doctors/${doctorNo}`, {
        method: 'GET',
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.status == 'success') {
            data = data.data;
            console.log(data);

            let imgUrl = '';

            if (data.phoUrl != 'undefined') {
              imgUrl =
                'http://uyaxhfqyqnwh16694929.cdn.ntruss.com/member-img/' +
                data.phoUrl +
                '?type=f&w=120&h=180&quality=90&autorotate=true&faceopt=true&anilimit=24';
              document.querySelector('.doctors-img').src = imgUrl;
            } else {
              imgUrl = '../assets/img/default_profile.png';
              document.querySelector('.doctors-img').src = imgUrl;
            }

            document.querySelector('.top-id').innerText = data.id;

            document.querySelector('.doctors-name').innerText = data.name;
            document.querySelector('.change-name').value = data.name;
            document.querySelector(
              '.doctors-gender'
            ).innerHTML = `<span class="doctors-gender">${
              data.gender ? '남성' : '여성'
            }</span>`;

            // document.querySelector('.doctors-id').innerText = data.id;
            // document.querySelector('.change-id').value = data.id;

            document.querySelector('.doctors-birth').innerText = data.birth;
            document.querySelector('.change-birth').value = data.birth;

            document.querySelector('.doctors-tel').innerText = data.tel;
            document.querySelector('.change-tel').value = data.tel;

            const arrAddr = data.addr.split(', ');

            document.getElementById('postcode').value = arrAddr[0];
            document.getElementById('roadAddress').value = arrAddr[1];
            document.getElementById('detailAddress').value = arrAddr[2];

            document.querySelector('.doctors-addr').innerText =
              arrAddr.join(' ');

            document.querySelector('.doctors-email').innerText = data.email;
            document.querySelector('.change-email').value = data.email;

            if (data.hosName != null) {
              document.querySelector('.doctors-hospital').innerText =
                data.hosName;
            } else {
              document.querySelector('.doctors-hospital').innerText =
                '소속없음';
            }

            if (data.licenses.length == 1) {
              document.querySelector('.doctors-license').innerText =
                data.licenses[0].licensename;
            } else {
              document.querySelector('.doctors-license').innerText =
                data.licenses[1].licensename;
            }
            // document.querySelector('.change-license').value = data.drug;

            const arrCareer = data.career.split(', ');

            console.log(arrCareer);

            document.querySelector('.doctors-career').innerText =
              arrCareer.join('\n');
            // document.querySelector('.change-career').value = data.career;

            arrCareer.forEach((career) => {
              const oldRow = document.createElement('div');
              const registerCareerList = document.querySelector(
                '.register-career-list'
              );
              oldRow.classList.add('row', 'mb-3');
              oldRow.innerHTML = `
                <label class="col-lg-3 col-form-label"></label>
                <div class="col-lg-8">
                  <input type="text" class="form-control change-career" value="${career}">
                </div>
                <div class="col-lg-1 btn-list">
                  <button type="button" class="btn btn-outline-danger btn-sm remove-career-btn">×</button>
                </div>
              `;
              registerCareerList.appendChild(oldRow);
            });

            // 경력
            // '＋' 버튼 클릭 시 새로운 row div 추가
            const addCareerButton = document.querySelector('.add-career-btn');
            addCareerButton.addEventListener('click', () => {
              const registerCareerList = document.querySelector(
                '.register-career-list'
              );
              const newRow = document.createElement('div');
              newRow.classList.add('row', 'mb-3');
              newRow.innerHTML = `
          <label class="col-lg-3 col-form-label"></label>
          <div class="col-lg-8">
            <input type="text" class="form-control change-career">
          </div>
          <div class="col-lg-1 btn-list">
            <button type="button" class="btn btn-outline-danger btn-sm remove-career-btn">×</button>
          </div>
        `;
              registerCareerList.appendChild(newRow);
            });

            // '×' 버튼 클릭 시 해당 row div 삭제
            const registerCareerList = document.querySelector(
              '.register-career-list'
            );
            registerCareerList.addEventListener('click', (event) => {
              const removeCareerButton =
                event.target.closest('.remove-career-btn');
              if (removeCareerButton) {
                const rowToRemove = removeCareerButton.closest('.row');
                rowToRemove.remove();
              }
            });

            document.querySelector('.change-hospital').value = data.hosName;
            document.querySelector('.change-hospitalNo').value = data.hosNo;
          } else {
            console.log('잘못 된 회원 정보');
          }
        });
    }
  });

$('.change-btn').click(() => {
  let formData = new FormData();
  if (document.querySelector('.change-img').files.length > 0) {
    formData.append('file', document.querySelector('.change-img').files[0]);
    fetch(`http://175.106.99.31/doctors/updateImg/${doctorNo}`, {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
  }
  // formData.append('id', document.querySelector('.change-id').value);
  formData.append('name', document.querySelector('.change-name').value);
  formData.append('birth', document.querySelector('.change-birth').value);
  formData.append('tel', document.querySelector('.change-tel').value);

  const zipcode = document.getElementById('postcode').value;
  const roadAddress = document.getElementById('roadAddress').value;
  const detailAddress = document.getElementById('detailAddress').value;
  formData.append('addr', `${zipcode}, ${roadAddress}, ${detailAddress}`);
  // formData.append("gender", '1');
  formData.append('email', document.querySelector('.change-email').value);
  formData.append('hosNo', document.querySelector('.change-hospitalNo').value);
  const career = document.querySelectorAll('.change-career');
  let careers = [];
  career.forEach((input) => {
    careers.push(input.value);
  });
  formData.append('career', careers.join(', '));

  fetch(`http://175.106.99.31/doctors/${doctorNo}`, {
    method: 'PUT',
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      window.location = '';
    });
});

function checkPw() {
  let pw = document.querySelector('.change-pw').value;
  let checkpw = document.querySelector('.change-pw-check').value;
  if (pw == checkpw) {
    $('.change-pw-check').css('border', '2px solid #198754');
    $('.change-pw').css('border', '2px solid #198754');
    samePw = true;
  } else {
    $('.change-pw-check').css('border', '2px solid #dc3545');
    $('.change-pw').css('border', '2px solid #dc3545');
    samePw = false;
  }
}

$('.change-pw-btn').click(() => {
  if (
    samePw &&
    document.querySelector('.change-pw-check').value !=
      document.querySelector('.doctors-pw').value
  ) {
    fetch(`http://175.106.99.31/doctors/updatePw/${doctorNo}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        password: document.querySelector('.doctors-pw').value,
        changepassword: document.querySelector('.change-pw-check').value,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status == 'success') {
          alert('비밀번호 정상적으로 변경됨');
          window.location = '';
        } else {
          alert('기존 비밀번호와 다름');
        }
      });
  } else {
    alert('비밀번호 확인 과 입력 비밀번호가 다르거나 기존 비밀번호와 동일');
  }
});

// $('.member-delete-btn').click(() => {
//   const memberDeleteDiv = document.querySelector('.member-delete');

//   const reallyDelete = document.createElement('div');
//   reallyDelete.classList.add(
//     'member-delete',
//     'row',
//     'mb-3',
//     'd-flex',
//     'align-items-center',
//     'justify-content-center'
//   );
//   reallyDelete.innerHTML = `
//   <div class="pt-4 pb-2">
//   <p class="text-center small">
//   정말 탈퇴하시겠습니까?
// </p>
// </div>
// <div class="col-sm-2 justify-content-center d-flex">
//         <button type="button" class="btn btn-secondary member-delete-yes-btn">
//           예
//         </button>
//         </div>
//         <div class="col-sm-2 justify-content-center d-flex">
//         <button type="button" class="btn btn-secondary member-delete-no-btn">
//           아니오
//         </button>
//         </div>
//   `;
//   memberDeleteDiv.replaceWith(reallyDelete);

//   // 회원 탈퇴 요청 후 응답 처리 함수
//   const handleDelete = () => {
//     // 응답이 성공이면 회원 정보 삭제 메시지를 보여줌
//     const successDelete = document.createElement('div');
//     successDelete.classList.add(
//       'member-delete',
//       'row',
//       'mb-3',
//       'd-flex',
//       'align-items-center',
//       'justify-content-center'
//     );
//     successDelete.innerHTML = `
//       <div class="pt-4 pb-2">
//         <p class="text-center small">
//           회원 정보가 삭제되었습니다.
//         </p>
//         </div>
//       `;
//     memberDeleteDiv.replaceWith(successDelete);
//   };

//   // 예 버튼 클릭 시 동작
//   const memberDeleteYesBtn = document.querySelector('.member-delete-yes-btn');
//   memberDeleteYesBtn.addEventListener('click', () => {
//     fetch(`http://175.106.99.31/doctors/${doctorNo}`, {
//       method: 'DELETE',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         if (data.status == 'success') {
//           handleDelete();
//         } else {
//           alert('회원 정보 삭제 실패');
//         }
//       });
//   });

//     // 아니오 버튼 클릭 시 동작
//     const memberDeleteNoBtn = document.querySelector('.member-delete-no-btn');
//     memberDeleteNoBtn.addEventListener('click', () => {
//       // 회원 탈퇴 버튼이 다시 보이도록 함
//       reallyDelete.replaceWith(memberDeleteDiv);
//     });

// });

var popupWidth = 320;
var popupHeight = 450;

var popupX = window.screen.width / 2 - popupWidth / 2;

var popupY = window.screen.height / 2 - popupHeight / 2;

function calltel() {
  window.open(
    'tel-input.html',
    'popupNo1',
    'status=no, height=' +
      popupHeight +
      ', width=' +
      popupWidth +
      ', left=' +
      popupX +
      ', top=' +
      popupY
  );
}

var hosPopupWidth = 1080;
var hosPopupHeight = 450;

var hosPopupX = window.screen.width / 2 - hosPopupWidth / 2;

var hosPopupY = window.screen.height / 2 - hosPopupHeight / 2;

function hospital() {
  window.open(
    'hospitals-input.html',
    'popupNo1',
    'status=no, height=' +
      hosPopupHeight +
      ', width=' +
      hosPopupWidth +
      ', left=' +
      hosPopupX +
      ', top=' +
      hosPopupY
  );
}
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
