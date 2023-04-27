const tooltipTriggerList = document.querySelectorAll(
  '[data-bs-toggle="tooltip"]'
);
const tooltipList = [...tooltipTriggerList].map(
  (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
);

// fetch(`http://175.106.99.31/qna/${1}`)
//   .then(response => response.json())
//   .then(data => {
//     console.log(data)
//     let lilist = [];
//     data.data.content.split(",").forEach(text => {
//       let content = text.split(":")[0];
//       let user = text.split(":")[1];
//       if(user == "질문자") {
//         lilist.push(<Lli text = {content} />)
//       }
//     })
//     return lilist;
//   })
//   .then(list => {
//     ReactDOM.createRoot(document.querySelector(".chat-list")).render(list)
// })

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
      location.href = "patients-profile.html";
    }
    return data.data;
  })
  .then((user) => {
    if (!user.admin) {
      myno = user.no;
      reflash();
    } else {
      location.href = "patients-profile.html";
    }
  });

$(".chat-btn").click(() => {
  fetch("http://175.106.99.31/qna", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      // 스프링에 전달할 값
      content: $(".chat-text").val(),
      mno: myno,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.status == "success") {
        $(".chat-text").val("")
        reflash();
      }
    });
});

function Lli(params) {
  return (
    <li className="chat-left">
      <div>
        <span id="q-content">{params.text}</span>
        <br />
        <br />
        <span id="q-date">{params.date}</span>
      </div>
    </li>
  );
}

function Rli(params) {
  return (
    <li className="chat-right">
      <div>
        <span id="a-content">{params.text}</span>
        <br />
        <br />
        <span id="a-date">{params.date}</span>
      </div>
    </li>
  );
}

/*

<li className="chat-left">
  <div>
    <span>1</span>
  </div>
</li>

<li className="chat-right">
  <div>
    <span>1</span>
  </div>
</li>

*/
let aciveText = "";
function reflash() {
  fetch(`http://175.106.99.31/qna/${myno}`)
    .then((response) => response.json())
    .then((data) => {
      let lilist = [];
      if (data.data == null) {
        return;
      }
      aciveText = data.data.content;
      data.data.content.split(",").forEach((text) => {
        let content = text.split(":")[0];
        let user = text.split(":")[1];
        let date = text.split(":")[2];
        if (user == "질문자") {
          lilist.push(<Lli text={content} date={date} />);
        } else if (user == "관리자") {
          lilist.push(<Rli text={content} date={date} />);
        }
      });
      return lilist;
    })
    .then((list) => {
      ReactDOM.createRoot(document.querySelector(".chat-list")).render(list);
    })
    .then(() => {
      setTimeout(() => {
        // document.querySelector(".chats").scrollTop = document.querySelector(".chats").scrollHeight;
        $(".chats").animate(
          { scrollTop: document.querySelector(".chats").scrollHeight },
          500
        );
      }, 100);
    });
}

function reFlash() {
  fetch(`http://175.106.99.31/qna/${myno}`)
    .then((response) => response.json())
    .then((data) => {
      if(aciveText == data.data.content) {
        return null;
      }else {
        aciveText = data.data.content;
      }
      let lilist = [];
      if (data.data == null) {
        return;
      }
      data.data.content.split(",").forEach((text) => {
        let content = text.split(":")[0];
        let user = text.split(":")[1];
        let date = text.split(":")[2];
        if (user == "질문자") {
          lilist.push(<Lli text={content} date={date} />);
        } else if (user == "관리자") {
          lilist.push(<Rli text={content} date={date} />);
        }
      });
      return lilist;
    })
    .then((list) => {
      if(list == null) return;
      ReactDOM.createRoot(document.querySelector(".chat-list")).render(list);
    })
}

setTimeout(() => {
  setInterval(() => {
    reFlash();
  }, 1000);
}, 1000);

document.addEventListener('keydown', (event) => {
  if (event.key == "Enter" && $(".chat-text").val().length > 1) {
    fetch("http://175.106.99.31/qna", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // 스프링에 전달할 값
        content: $(".chat-text").val(),
        mno: myno,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status == "success") {
          $(".chat-text").val("")
          reflash();
        }
      });
  }
});