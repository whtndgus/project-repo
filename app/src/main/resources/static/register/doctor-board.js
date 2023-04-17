class Board extends React.Component {
  constructor(props) {
    super(props);
    props = props.props;
    this.state = {
    }
  }
  render() {
    // return (
    // );
  }
}

function BoardImg(props) {
  return (<img className="d-block w-100 immm" src={props.url} alt="..."></img>)
}

class BoardImgDiv extends React.Component {
  constructor(props) {
    super(props);
    props = props.props;
    this.state = {
      img: props.url,
      count: props.count
    }
  }
  render() {
    if (this.state.count == 0) {
      return (
        <div className="carousel-item active" style={{height:'100%', backgroundColor: "rgb(230, 230, 230)"}}>
          <BoardImg url={this.state.img} />
        </div>
      )
    }
    return (
      <div className="carousel-item" style={{height:'100%', backgroundColor: "rgb(230, 230, 230)"}}>
        <BoardImg url={this.state.img} />
      </div>
    )
  }
}


let str;

let myno = 0;

fetch(`http://localhost:8080/auth/user`, {
  method: 'GET'
})
  .then(response => response.json())
  .then(data => {
    if (data.status == "success") {
      console.log(data.data)
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

if (window.localStorage.getItem("boardNo") != null) {
  str = window.localStorage.getItem("boardNo");
  fetch("http://192.168.0.7:8080/boardNo", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ // 스프링에 전달할 값
      no: str
    })
  })
    .then(response => response.json())
    .then(data => {
      data = data.data;
      $(".board-title").html("제목 : " + data.title);
      $(".board-pain").html("증상 : " + data.pain);
      $(".board-another").html("그 외 전달사항\n" + (data.another.split(",")[5] != "null" && data.another.split(",")[5].length > 0 ? data.another.split(",")[5] : "-"));
      $(".board-name").val(data.another.split(",")[0] != "null" && data.another.split(",")[0].length > 0 ? data.another.split(",")[0] : "-");
      $(".board-gender").val(data.another.split(",")[2] != "null" && data.another.split(",")[2].length > 0 ? data.another.split(",")[2] : "-");
      $(".board-age").val(data.another.split(",")[1] != "null" && data.another.split(",")[1].length > 0 ? data.another.split(",")[1] : "-");
      $(".board-addr").val(data.another.split(",")[4] != "null" && data.another.split(",")[4].length > 0 ? data.another.split(",")[4] : "-");
      $(".board-tel").val(data.another.split(",")[3] != "null" && data.another.split(",")[3].length > 0 ? data.another.split(",")[3] : "-");
    })

  fetch("http://192.168.0.7:8080/findAllBoardImg", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ // 스프링에 전달할 값
      bno: str
    })
  }).then(response => response.json())
    .then(data => {
      let coin = 0;
      if (data.status == "success") {
        data = data.data;
        let imgs = [];
        data.forEach(value => {
          // let url = value.url;
          value.count = coin++;
          imgs.push(<BoardImgDiv props={value} />)
        });
        ReactDOM.createRoot(document.getElementById('imgs')).render(
          imgs
        );
      }

    })

  fetch("http://192.168.0.7:8080/feedback/findByBno", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ // 스프링에 전달할 값
      bno: str
    })
  }).then(response => response.json())
    .then(data => {
      if (data.status == "success") {
        data = data.data;
        console.log(data)
        let feeds = [];
        data.forEach(feed => {
          if(feed.doc_no == myno){
            $(".sogyon-btn").attr("disabled", true);
          }
          if (feed.content.length > 25) {
            feed.title = feed.content.substr(0, 25) + " . . . ";
          }else {
            feed.title = feed.content
          }
          feeds.push(<Sogyun props={feed} />)
        })
        new Promise(resolve => {
          ReactDOM.createRoot(document.getElementById('sogyon-list')).render(
            feeds
          );
          resolve();
        })
      }

    })

}




class Sogyun extends React.Component {
  constructor(props) {
    super(props);
    props = props.props;
    this.state = {
      title: props.title,
      pro: props.popen,
      data: props
    }
  }
  render() {
    if (this.state.pro) {
      return (
        <li className="list-group-item d-flex justify-content-between align-items-start" onClick={() => {
          new Promise((resolve) => {
            if(this.state.data.doc_no != myno) {
              alert("본인 작성글만 조회 편집가능?")
              return;
            }
            ReactDOM.createRoot(document.getElementById('react-window')).render(
              <ChangeWindow />)
            resolve();
          })
            .then(() => {
              $(".check-pro").prop('checked', this.state.data.popen);
              $(".check-visit").prop('checked', this.state.data.visit);
              $(".sogyon-text").val(this.state.data.content);
              $(".sogyon-money").val(this.state.data.money);
            })
        }}>
          <div className="ms-2 me-auto">
            <div className="fw-bold">{this.state.title}</div>
          </div>
          <span className="badge bg-primary rounded-pill">전문의</span>
        </li>
      )
    } else {
      return (
        <li className="list-group-item d-flex justify-content-between align-items-start" onClick={() => {
          new Promise((resolve) => {
            if(this.state.data.doc_no != myno) {
              alert("본인 작성글만 조회 편집가능?")
              return;
            }
            ReactDOM.createRoot(document.getElementById('react-window')).render(
              <ChangeWindow />)
            resolve();
          })
            .then(() => {
              $(".check-pro").prop('checked', this.state.data.popen);
              $(".check-visit").prop('checked', this.state.data.visit);
              $(".sogyon-text").val(this.state.data.content);
              $(".sogyon-money").val(this.state.data.money);
            })
        }}>
          <div className="ms-2 me-auto">
            <div className="fw-bold">{this.state.title}</div>
          </div>
        </li>
      )
    }
  }
}



$(".sogyon-btn").click(() => {
  new Promise((resolve) => {
    ReactDOM.createRoot(document.getElementById('react-window')).render(
      <NewWindow />
    )
    resolve();
  })
    .then(() => {
    })
})



class NewWindow extends React.Component {
  constructor(props) {
    super(props);
    props = props.props;
    this.state = {
      data: props,
    }
  }
  render() {
    return (
      <div id="new-windows">
        <Selects />
        <hr className="hr-solid" />
        <Texts />
        <Btns />
      </div>
    )
  }
}
class Selects extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
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
        <div className="form-check form-switch select" style={{marginRight:'5%'}}>
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

    )
  }
}
class Texts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
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
    )
  }
}
class Btns extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  render() {
    return (
      <div className="sogyun-btns">
        <button type="button" className="btn btn-secondary sogyon-insert" onClick={() => {

          fetch("http://192.168.0.7:8080/feedback/insert", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ // 스프링에 전달할 값
              bno: str,
              dno: myno,
              popen: $(".check-pro").is(':checked'),
              visit: $(".check-visit").is(':checked'),
              money: $(".sogyon-money").val(),
              content: $(".sogyon-text").val()
            })
          })
            .then(() => {
              ReactDOM.createRoot(document.getElementById('react-window')).render();
            })

        }}>
          저 장
        </button>
        <button type="button" className="btn btn-secondary sogyon-close" onClick={() => {
          ReactDOM.createRoot(document.getElementById('react-window')).render();
        }}>
          닫 기
        </button>
      </div>
    )
  }
}

class ChangeWindow extends React.Component {
  constructor(props) {
    super(props);
    props = props.props;
    this.state = {
      data: props,
    }
  }
  render() {
    return (
      <div id="new-windows">
        <Selects />
        <hr className="hr-solid" />
        <Texts />
        <Cbtns />
      </div>
    )
  }
}
class Cbtns extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  render() {
    return (
      <div className="sogyun-btns">
        <button type="button" className="btn btn-secondary sogyon-update" onClick={() => {

          fetch("http://192.168.0.7:8080/feedback/update", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ // 스프링에 전달할 값
              bno: Number(str),
              dno: myno,
              popen: $(".check-pro").is(':checked'),
              visit: $(".check-visit").is(':checked'),
              money: $(".sogyon-money").val(),
              content: $(".sogyon-text").val()
            })
          })
            .then(() => {
              ReactDOM.createRoot(document.getElementById('react-window')).render();
              window.location.reload();
            })

        }}>
          저 장
        </button>
        <button type="button" className="btn btn-secondary sogyon-close" onClick={() => {
          ReactDOM.createRoot(document.getElementById('react-window')).render();
        }}>
          닫 기
        </button>
      </div>
    )
  }
}


