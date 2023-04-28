class Board extends React.Component {
  constructor(props) {
    super(props);
    props = props.props;
    this.state = {};
  }
  render() {
    // return (
    // );
  }
}

let feedlist = [];

function BoardImg(props) {
  return <img className="d-block w-100 immm" src={props.url} alt="..."></img>;
}

class BoardImgDiv extends React.Component {
  constructor(props) {
    super(props);
    props = props.props;
    this.state = {
      img: props.url,
      count: props.count,
    };
  }
  render() {
    if (this.state.count == 0) {
      return (
        <div
          className="carousel-item active"
          style={{ height: "100%", backgroundColor: "rgb(230, 230, 230)" }}
        >
          <BoardImg url={this.state.img} />
        </div>
      );
    }
    return (
      <div
        className="carousel-item"
        style={{ height: "100%", backgroundColor: "rgb(230, 230, 230)" }}
      >
        <BoardImg url={this.state.img} />
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
    return data.data;
  })
  .then((user) => {
    if (user.phy !== undefined) {
      myno = user.no;
    } else {
      location.href = "index.html";
    }
  });

let str;

if (window.localStorage.getItem("boardNo") != null) {
  str = window.localStorage.getItem("boardNo");
  fetch("http://175.106.99.31/boardNo", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      // 스프링에 전달할 값
      no: str,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      data = data.data;
      $(".board-title").html(data.title);
      $(".board-pain").html(data.pain);
      $(".board-another").html(
        data.another.split("@")[5] != "null" &&
          data.another.split("@")[5].length > 0
          ? data.another.split("@")[5]
          : "-"
      );
      $(".board-name").val(
        data.another.split("@")[0] != "null" &&
          data.another.split("@")[0].length > 0
          ? data.another.split("@")[0]
          : "-"
      );
      $(".board-gender").val(
        data.another.split("@")[2] != "null" &&
          data.another.split("@")[2].length > 0
          ? data.another.split("@")[2]
          : "-"
      );
      $(".board-age").val(
        data.another.split("@")[1] != "null" &&
          data.another.split("@")[1].length > 0
          ? data.another.split("@")[1]
          : "-"
      );
      $(".board-addr").val(
        data.another.split("@")[4] != "null" &&
          data.another.split("@")[4].length > 0
          ? data.another.split("@")[4]
          : "-"
      );
      $(".board-tel").val(
        data.another.split("@")[3] != "null" &&
          data.another.split("@")[3].length > 0
          ? data.another.split("@")[3]
          : "-"
      );
    });

  fetch("http://175.106.99.31/findAllBoardImg", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      // 스프링에 전달할 값
      bno: str,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      let coin = 0;
      if (data.status == "success") {
        data = data.data;
        let imgs = [];
        data.forEach((value) => {
          // let url = value.url;
          value.count = coin++;
          imgs.push(<BoardImgDiv props={value} />);
        });
        ReactDOM.createRoot(document.getElementById("imgs")).render(imgs);
      }
    });

  fetch("http://175.106.99.31/feedback/findByBno", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      // 스프링에 전달할 값
      bno: str,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.status == "success") {
        data = data.data;
        console.log(data);
        let feeds = [];
        data.forEach((feed) => {
          if (feed.content.length > 25) {
            feed.title = feed.content.substr(0, 25) + " . . . ";
          } else {
            feed.title = feed.content;
          }
          feed.doc_license.forEach((license) => {
            if (license.licenseOx) {
              feed.doc_license = license.licensename;
            }
          });
          if (typeof feed.doc_license != "string") {
            feed.doc_license = "-";
          }
          feeds.push(<Sogyun props={feed} />);
        });
        feedlist = feeds;
        ReactDOM.createRoot(document.getElementById("sogyon-list")).render(
          feedlist
        );
      }
    });
}

class Sogyun extends React.Component {
  constructor(props) {
    super(props);
    props = props.props;
    this.state = {
      title: props.title,
      pro: props.popen,
      data: props,
    };
  }
  render() {
    if (this.state.pro) {
      return (
        <li
          className="list-group-item d-flex justify-content-between align-items-start"
          onClick={() => {
            ReactDOM.createRoot(document.getElementById("sogyon-list")).render(
              <FeedPage props={this.state.data} />
            );
          }}
        >
          <div className="ms-2 me-auto">
            <div className="fw-bold">{this.state.title}</div>
          </div>
          <span className="badge bg-primary rounded-pill">전문의</span>
        </li>
      );
    } else {
      return (
        <li
          className="list-group-item d-flex justify-content-between align-items-start"
          onClick={() => {
            console.log(this.state.data);
            ReactDOM.createRoot(document.getElementById("sogyon-list")).render(
              <FeedPage props={this.state.data} />
            );
          }}
        >
          <div className="ms-2 me-auto">
            <div className="fw-bold">{this.state.title}</div>
          </div>
        </li>
      );
    }
  }
}

$(".sogyon-btn").click(() => {
  new Promise((resolve) => {
    ReactDOM.createRoot(document.getElementById("react-window")).render(
      <NewWindow />
    );
    resolve();
  }).then(() => {});
});

class NewWindow extends React.Component {
  constructor(props) {
    super(props);
    props = props.props;
    this.state = {
      data: props,
    };
  }
  render() {
    return (
      <div id="new-windows">
        <Selects />
        <hr className="hr-solid" />
        <Texts />
        <Btns />
      </div>
    );
  }
}
class Selects extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="selects">
        <div className="form-check form-switch select">
          <label className="form-check-label" htmlFor="flexSwitchCheckDefault4">
            전문의 소견
          </label>
          <input
            className="form-check-input check-pro"
            type="checkbox"
            role="switch"
            id="flexSwitchCheckDefault4"
          />
        </div>
        <div
          className="form-check form-switch select"
          style={{ marginRight: "5%" }}
        >
          <label className="form-check-label" htmlFor="flexSwitchCheckDefault5">
            병원 방문
          </label>
          <input
            className="form-check-input check-visit"
            type="checkbox"
            role="switch"
            id="flexSwitchCheckDefault5"
          />
        </div>
        <div className="field field_v1">
          <label htmlFor="first-name" className="ha-screen-reader">
            예상 진료비용
          </label>
          <input
            id="first-name"
            className="field__input sogyon-money"
            placeholder="만 단위로 입력"
          />
          <span className="field__label-wrap" aria-hidden="true">
            <span className="field__label">예상 진료비용</span>
          </span>
        </div>
      </div>
    );
  }
}
class Texts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="texts">
        <div className="form-floating">
          <textarea
            className="form-control sogyon-text"
            placeholder="Leave a comment here"
            id="floatingTextarea2"
            defaultValue={""}
          />
          <label htmlFor="floatingTextarea2">진단 내용</label>
        </div>
      </div>
    );
  }
}
class Btns extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="sogyun-btns">
        <button
          type="button"
          className="btn btn-secondary sogyon-insert"
          onClick={() => {
            fetch("http://175.106.99.31/feedback/insert", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                // 스프링에 전달할 값
                bno: str,
                dno: 1,
                popen: $(".check-pro").is(":checked"),
                visit: $(".check-visit").is(":checked"),
                money: $(".sogyon-money").val(),
                content: $(".sogyon-text").val(),
              }),
            }).then(() => {
              ReactDOM.createRoot(
                document.getElementById("react-window")
              ).render();
            });
          }}
        >
          저 장
        </button>
        <button
          type="button"
          className="btn btn-secondary sogyon-close"
          onClick={() => {
            ReactDOM.createRoot(
              document.getElementById("react-window")
            ).render();
          }}
        >
          닫 기
        </button>
      </div>
    );
  }
}

class FeedPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.props,
    };
  }
  render() {
    return (
      <div className="FeedText">
        {/* <Btn /> */}
        <DocInfo props={this.state.data} />
        <FedText props={this.state.data} />
        <Review props={this.state.data} />
      </div>
    );
  }
}

class DocInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.props,
    };
  }
  render() {
    const imgUrl =
      "http://uyaxhfqyqnwh16694929.cdn.ntruss.com/member-img/" +
      this.state.data.doc_image +
      "?type=f&w=170&h=220&quality=90&align=4";
    return (
      <div className="top-area">
        <div className="doc-area  text-center">
          <img className="doc-img" src={imgUrl} alt="의사 이미지" />
          <span className="doc-name">{this.state.data.doc_name} 의사</span>
        </div>
        <div className="hos-area">
          <span className="hos-name">
            소속병원 | {this.state.data.hos_name}
          </span>
          <span className="hos-addr">
            병원주소 | {this.state.data.hos_addr}
          </span>
          <span className="hos-info">
            진료분야 | {this.state.data.doc_license}
          </span>
        </div>
        <div className="career-area">
          <span class="doc-career-name">
            <h5>학력/경력</h5>
          </span>
          <span class="doc-career-list">{this.state.data.doc_career}</span>
        </div>
      </div>
    );
  }
}

class FedText extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.props,
    };
  }
  render() {
    return (
      <div className="middle-area">
        <span className="fed-text">
          <h6>담당의사 진단 내용</h6>
          <br />
          {this.state.data.content}
        </span>
      </div>
    );
  }
}

class Review extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.props,
    };
  }
  render() {
    return (
      <div className="review-area">
        <h6>진료일자</h6>
        {this.state.data.createdDate}
      </div>
    );
  }
}

$(".patients-change-btn").click(() => {
  fetch("http://175.106.99.31/boardUpdata", {
    method: "POST", // 또는 'PUT'
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      // 스프링에 전달할 값
      no: Number(str),
      title: $(".board-title").html(),
      pain: $(".board-pain").html(),
      name: $(".board-name").val(),
      age: $(".board-age").val(),
      tel: $(".board-tel").val(),
      addr: $(".board-addr").val(),
      another: $(".board-another").val(),
      gender: $(".board-gender").val(),
    }),
  })
    .then((data) => data.json())
    .then((data) => {
      window.location.reload();
    });
});
