const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))

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

let no = new URLSearchParams(location.search).get("no");

reflash()
$(".chat-btn").click(() => {
  fetch("http://175.106.99.31/qna/admin", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ // 스프링에 전달할 값
      content: $(".chat-text").val(),
      mno: Number(no)
    })
  })
    .then(response => response.json())
    .then(data => {
      if(data.status == "success") {
        reflash();
      }
    })
})



function Lli(params) {
  return (
    <li className="chat-left">
      <div>
        <span id="q-content">{params.text}</span>
        <br/><br/><br/>
        <span id="q-date">{params.date}</span>
      </div>
    </li>
  )
}

function Rli(params) {
  return (
    <li className="chat-right">
      <div>
        <span id="a-content">{params.text}</span>
        <br/><br/><br/>
        <span id="a-date">{params.date}</span>
      </div>
    </li>
  )
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

function reflash() {
  fetch(`http://175.106.99.31/qna/admin/${no}`)
    .then(response => response.json())
    .then(data => {
      console.log(data)
      let lilist = [];
      data.data.content.split(",").forEach(text => {
        let content = text.split(":")[0];
        let user = text.split(":")[1];
        let date = text.split(":")[2];
        if (user == "질문자") {
          lilist.push(<Lli text={content} date={date}/>)
        } else if (user == "관리자") {
          lilist.push(<Rli text={content} date={date}/>)
        }
      })
      return lilist;
    })
    .then(list => {
      ReactDOM.createRoot(document.querySelector(".chat-list")).render(list)
    })
    .then(() => {
      console.log(document.querySelector(".chats").scrollHeight)
      setTimeout(() => {
        // document.querySelector(".chats").scrollTop = document.querySelector(".chats").scrollHeight;
        $(".chats").animate({scrollTop : document.querySelector(".chats").scrollHeight}, 500);
      }, 100);
    })
}