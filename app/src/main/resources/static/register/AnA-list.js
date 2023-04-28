const tooltipTriggerList = document.querySelectorAll(
  '[data-bs-toggle="tooltip"]'
);
const tooltipList = [...tooltipTriggerList].map(
  (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
);

fetch(`http://175.106.99.31/auth/user`, {
  method: "GET",
})
  .then((response) => response.json())
  .then((data) => {
    if (data.status == "success") {
      //사용자 이름
      document.querySelector("#username").innerHTML =
        data.data.name + "(관리자)";
      return data.data;
    } else {
      location.href = "index.html";
    }
    return data.data;
  })
  .then((user) => {
    if (user.admin) {
      // myno = user.no
    } else {
      location.href = "index.html";
    }
  });

fetch(`http://175.106.99.31/qna`)
  .then((response) => response.json())
  .then((data) => {
    if (data.status == "success") {
      //사용자 이름
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
