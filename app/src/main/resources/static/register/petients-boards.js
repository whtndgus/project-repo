class Board extends React.Component {
  constructor(props) {
    super(props);
    props = props.props;
    this.state = {
      data: props,
    };
  }
  render() {
    return (
      <div class="col-lg-6">
        <div class="card cursor">
          <div
            class="card-body"
            onClick={() => {
              window.localStorage.setItem("boardNo", this.state.data.no);
              location.href = "patients-record.html";
            }}
          >
            <h5 class="card-title">제목 : {this.state.data.title}</h5>
            <h6>문의 날짜 : {this.state.data.createdDate}</h6>
            <p>
              {this.state.data.another.split("@")[5] != "null" &&
              this.state.data.another.split("@")[5].length > 0
                ? this.state.data.another.split("@")[5]
                : "-"}
            </p>
            <span class={this.state.data.clas1}>
              <i class={this.state.data.clas2}></i>
              {this.state.data.clas3}
            </span>
          </div>
        </div>
      </div>
    );
  }
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
      location.href = "index.html";
    }
  })
  .then((user) => {
    if (user.phy !== undefined) {
    } else {
      location.href = "index.html";
    }
    fetch("http://175.106.99.31/patientsBoards", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // 스프링에 전달할 값
        no: user.no,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status == "success") {
          let pl = [];
          data.data.forEach((board) => {
            let n = new Date();
            let countday = n.getDate() - board.createdDate.split("-")[2];
            let countmon = n.getMonth() - board.createdDate.split("-")[1];
            let str1 = "";
            let str2 = "";
            let str3 = "";
            if (board.fedcount > 0) {
              str1 = "badge bg-success";
              str2 = "bi bi-check-circle me-1";
              str3 = "진단 완료";
            } else if (countmon >= 0) {
              str1 = "badge bg-danger";
              str2 = "bi bi-exclamation-octagon me-1";
              str3 = "진단 대기중";
            } else if (countday > 10) {
              str1 = "badge bg-danger";
              str2 = "bi bi-exclamation-octagon me-1";
              str3 = "진단 대기중";
            } else if (countday > 5) {
              str1 = "badge bg-warning text-dark";
              str2 = "bi bi-exclamation-triangle me-1";
              str3 = "진단 대기중";
            } else {
              str1 = "badge bg-success";
              str2 = "bi bi-exclamation-triangle me-1";
              str3 = "진단 대기중";
            }

            board.clas1 = str1;
            board.clas2 = str2;
            board.clas3 = str3;
            console.log(board);

            pl.push(<Board props={board} />);
          });
          return pl;
        } else {
          console.log("에러가 발생 하였거나 작성한 글이 없음");
        }
      })
      .then((data) => {
        ReactDOM.createRoot($(".row")[0]).render(data);
      });
  });
