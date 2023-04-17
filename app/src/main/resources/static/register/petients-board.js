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

let feedlist= [];

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

if (window.localStorage.getItem("boardNo") != null) {
  str = window.localStorage.getItem("boardNo");
  fetch("http://localhost:8080/boardNo", {
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
      $(".board-title").html(data.title);
      $(".board-pain").html(data.pain);
      $(".board-another").html((data.another.split(",")[5] != "null" && data.another.split(",")[5].length > 0 ? data.another.split(",")[5] : "-"));
      $(".board-name").val(data.another.split(",")[0] != "null" && data.another.split(",")[0].length > 0 ? data.another.split(",")[0] : "-");
      $(".board-gender").val(data.another.split(",")[2] != "null" && data.another.split(",")[2].length > 0 ? data.another.split(",")[2] : "-");
      $(".board-age").val(data.another.split(",")[1] != "null" && data.another.split(",")[1].length > 0 ? data.another.split(",")[1] : "-");
      $(".board-addr").val(data.another.split(",")[4] != "null" && data.another.split(",")[4].length > 0 ? data.another.split(",")[4] : "-");
      $(".board-tel").val(data.another.split(",")[3] != "null" && data.another.split(",")[3].length > 0 ? data.another.split(",")[3] : "-");
    })

  fetch("http://localhost:8080/findAllBoardImg", {
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

  fetch("http://localhost:8080/feedback/findByBno", {
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
          if (feed.content.length > 25) {
            feed.title = feed.content.substr(0, 25) + " . . . ";
          }else {
            feed.title = feed.content
          }
          feeds.push(<Sogyun props={feed} />)
        })
        feedlist = feeds;
        ReactDOM.createRoot(document.getElementById('sogyon-list')).render(
          feedlist
        );
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
          ReactDOM.createRoot(document.getElementById('sogyon-list')).render(
            <FeedPage props={this.state.data}/>
          );
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
          console.log(this.state.data)
          ReactDOM.createRoot(document.getElementById('sogyon-list')).render(
            <FeedPage props={this.state.data}/>
          );
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

          fetch("http://localhost:8080/feedback/insert", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ // 스프링에 전달할 값
              bno: str,
              dno: 1,
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


class FeedPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.props
    }
  }
  render() {
    return (
      <div className="FeedText">
        {/* <Btn /> */}
        <DocInfo props={this.state.data}/>
        <FedText props={this.state.data}/>
        <Review props={this.state.data}/>
      </div>
    )
  }
}




class DocInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.props
    }
  }  
  render() {
    return (
      <div className="top-area text-center">
        <div className="doc-area">
          <img className="doc-img" src={this.state.data.doc_image} alt="의사 이미지"/>
          <span className="doc-name">
            <i className="bx bx-user"></i>{' '}{this.state.data.doc_name}
          </span>
        </div>
        <div className="doc-career">
          <span class="badge custom-badge text-dark"><i class="fas fa-solid fa-certificate"></i>{' '}경력 사항</span>
        </div>
        <div className="hos-area">
          <span className="hos-name"><i class="bx bx-plus-medical"></i>{' '}{this.state.data.hos_name}</span>
          <span className="hos-info" ><i class="fas fa-stethoscope"></i>{' '}병원 진료 과목</span>
          <span className="hos-addr"><i class="bi-hospital"></i>{' '}{this.state.data.hos_addr}</span>
        </div>
      </div>  
    )
  }
}

class FedText extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.props
    }
  }
  render() {
    return (
      <div className="middle-area">
        <span className="fed-text">
          -진단 내용-<br/>
          {this.state.data.content}
        </span>
      </div>  
    )
  }
}

class Review extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.props
    }
  }
  render() {
    return (
      <div className="review-area">
        리뷰영역
      </div>  
    )
  }
}


$(".patients-change-btn").click(() => {
  fetch('http://localhost:8080/boardUpdata', {
    method: 'POST', // 또는 'PUT'
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ // 스프링에 전달할 값
      no: Number(str),
      title: $(".board-title").html(),
      pain: $(".board-pain").html(),
      name: $(".board-name").val(),
      age: $(".board-age").val(),
      tel: $(".board-tel").val(),
      addr: $(".board-addr").val(),
      another: $(".board-another").val(),
      gender: $("board-gender").val(),
    }),
  }).then(data => data.json())
    .then(data => {
      window.location.reload();
    })
})
