const tooltipTriggerList = document.querySelectorAll(
  '[data-bs-toggle="tooltip"]'
);
const tooltipList = [...tooltipTriggerList].map(
  (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
);

fetch(`http://175.106.99.31/qna`)
  .then((response) => response.json())
  .then((data) => {
    if (data.status == "success") {
      //옥동자 이름
      document.querySelector("#username").innerHTML = data.data.name;
      //옥동자 이미지
      const preImageContainer = document.querySelector("#pre-userimg");
      const phoUrl =
        "http://uyaxhfqyqnwh16694929.cdn.ntruss.com/member-img/" +
        data.data.phoUrl +
        "?type=f&w=36&h=36&quality=100&anilimit=24";
      const phoType = data.data.phoType;
      const phoName = data.data.phoName;

      // 기존의 이미지 요소 삭제
      const oldImg = document.querySelector("#userimg");
      if (oldImg) {
        oldImg.remove();
      }

      // 새로운 이미지 요소 생성 및 추가
      const newImg = document.createElement("img");
      newImg.setAttribute("id", "userimg");
      newImg.setAttribute("src", phoUrl);
      newImg.setAttribute("alt", phoName);
      newImg.setAttribute("style", "width:36px; border-radius:50%");
      preImageContainer.appendChild(newImg);
      return data.data;
    }
  })
  .then((data) => {
    let lilist = [];
    data.forEach((user) => {
      console.log(user);
      lilist.push(<Li data={user} />);
    });
    return lilist;
  })
  .then((list) => {
    ReactDOM.createRoot(document.querySelector(".chat-list")).render(list);
  });

function Li(params) {
  return (
    <li
      className="chat-left list-group-item"
      onClick={() => {
        location.href = `AnA-admin.html?no=${params.data.no}`;
      }}
    >
      <div className="list-box">
        <span id="list-title">제목 : {params.data.title}</span>
        <span id="list-name">작성자 : {params.data.pname}</span>
      </div>
    </li>
  );
}
