
const comment = {
  date: new Date(),
  text: 'I hope you enjoy learning React!',
  author: {
    name: 'Hello Kitty',
    avatarUrl: 'http://placekitten.com/g/64/64'
  }
};
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

function App() {
  return (
    <div>
      <Welcome name="Sara" />
      <Welcome name="Cahal" />
      <Welcome name="Edite" />
    </div>
  );
}



class Spans extends React.Component {
  constructor(props) {
    super(props);
    props = props.props;
    this.state = {
      title: props.title,
      createdDate: props.createdDate,
      password: props.password,
      pain: props.pain,
      another: props.another
    }
  }

  render() {
    return (
      <div className="spans">
        <Span prop={"제목 : " + this.state.title}></Span>
        <Span prop={"작성일 : " + this.state.createdDate}></Span>
        <Span prop={"비밀번호 : " + this.state.password}></Span>
        <Span prop={"증상 : " + this.state.pain}></Span>
        <Span prop={"그 외 : " + this.state.another}></Span>
      </div>
    );
  }
}

function Span(props) {
  console.log(props)
  return (<p>{props.prop}</p>)
}

var stat = 0;
var catSelect = "";

const roots = ReactDOM.createRoot(document.getElementById('roots'));


let myno = 0;
let mydata;

fetch(`http://175.106.99.31/auth/user`, {
  method: 'GET'
})
  .then(response => response.json())
  .then(data => {
    if (data.status == "success" && data.data.phy !== undefined) {
      console.log(data)
      myno = data.data.no;
      mydata = data.data;
      console.log(mydata)
      $(".log-btn").text("로그아웃")
      $(".log-mypage").css("display", "")
      $(".btn-3").css("width", "-1px")
      setTimeout(() => {
        $(".btn-3").css("display", "none")
      }, 100);
      $(".btn-3").text("")
      $(".btn-1").css("width", "99%")
      // $(".btn-2").css("width", "49%")
      $(".log-mypage").click(() => {
        location.href = "patients-profile.html"
      })
      $(".log-btn").attr("class", "btn btn-outline-secondary logout-btn")
      $(".logout-btn").click(() => {
        fetch(`http://175.106.99.31/auth/logout`, {
          method: 'GET'
        })
          .then(response => response.json())
          .then(data => {
            if (data.status == "success") {
              location.href = ""
            } else {
              alert("로그아웃 실패")
              location.href = ""
            }
          })
      })
    }else if(data.status == "success" && data.data.admin) {
      $(".log-btn").text("관리자")
    }else {
      $(".log-btn").text("로그인")
    }
  })

$(".log-btn").click(() => {
  location.href = "../auth/patients-login.html"
})

$(".btn-1").click(() => {
  btnoff($(".btn-1"));
  btnon($(".btn-2"));
  btnon($(".btn-3"));
  if (stat == 1)
    return
  stat = 1
  roots.render()
  setTimeout(() => {
    if (myno > 0) {
      roots.render(
        <div id="root">
          <div className="insert-left">
            <h3><strong>필수 입력항목</strong></h3>
            <div className="input-group mb-3" style={{ height: 50, float: "left" }}>
              <span className="input-group-text" id="basic-addon1">
                제목
              </span>
              <input
                type="text"
                className="form-control insert-title"
                placeholder="글의 제목이 되는 부분으로 증상의 간단한 설명을 작성하십시오"
                aria-label="Username"
                aria-describedby="basic-addon1"
              />
            </div>
            <h5>증상 부위 또는 증상의 종류</h5>
            <div className="input-group mb-3">
              <div className="input-group-text">
                <span className="font13" style={{ marginRight: 2 }}>머리</span>
                <input
                  className="form-check-input mt-0"
                  type="checkbox"
                  defaultValue="머리"
                  aria-label="Checkbox for following text input"
                />
              </div>
              <div className="input-group-text">
                <span className="font13" style={{ marginRight: 2 }}>인후</span>
                <input
                  className="form-check-input mt-0"
                  type="checkbox"
                  defaultValue="인후"
                  aria-label="Checkbox for following text input"
                />
              </div>
              <div className="input-group-text">
                <span className="font13" style={{ marginRight: 2 }}>가슴</span>
                <input
                  className="form-check-input mt-0"
                  type="checkbox"
                  defaultValue="가슴"
                  aria-label="Checkbox for following text input"
                />
              </div>
              <div className="input-group-text">
                <span className="font13" style={{ marginRight: 2 }}>복부</span>
                <input
                  className="form-check-input mt-0"
                  type="checkbox"
                  defaultValue="복부"
                  aria-label="Checkbox for following text input"
                />
              </div>
              <div className="input-group-text">
                <span className="font13" style={{ marginRight: 2 }}>손,발</span>
                <input
                  className="form-check-input mt-0"
                  type="checkbox"
                  defaultValue="손발"
                  aria-label="Checkbox for following text input"
                />
              </div>
              <div className="input-group-text">
                <span className="font13" style={{ marginRight: 2 }}>팔</span>
                <input
                  className="form-check-input mt-0"
                  type="checkbox"
                  defaultValue="팔"
                  aria-label="Checkbox for following text input"
                />
              </div>
              <div className="input-group-text">
                <span className="font13" style={{ marginRight: 2 }}>하체</span>
                <input
                  className="form-check-input mt-0"
                  type="checkbox"
                  defaultValue="하체"
                  aria-label="Checkbox for following text input"
                />
              </div>
              <div className="input-group-text">
                <span className="font13" style={{ marginRight: 2 }}>허리</span>
                <input
                  className="form-check-input mt-0"
                  type="checkbox"
                  defaultValue="허리"
                  aria-label="Checkbox for following text input"
                />
              </div>
            </div>
            <div className="input-group mb-3" >
              <div className="input-group-text">
                <span className="font13" style={{ marginRight: 2 }}>두통</span>
                <input
                  className="form-check-input mt-0"
                  type="checkbox"
                  defaultValue="두통"
                  aria-label="Checkbox for following text input"
                />
              </div>
              <div className="input-group-text">
                <span className="font13" style={{ marginRight: 2 }}>흉통(가슴)</span>
                <input
                  className="form-check-input mt-0"
                  type="checkbox"
                  defaultValue="흉통"
                  aria-label="Checkbox for following text input"
                />
              </div>
              <div className="input-group-text">
                <span className="font13" style={{ marginRight: 2 }}>복통</span>
                <input
                  className="form-check-input mt-0"
                  type="checkbox"
                  defaultValue="복통"
                  aria-label="Checkbox for following text input"
                />
              </div>
              <div className="input-group-text">
                <span className="font13" style={{ marginRight: 2 }}>요통</span>
                <input
                  className="form-check-input mt-0"
                  type="checkbox"
                  defaultValue="요통"
                  aria-label="Checkbox for following text input"
                />
              </div>
              <div className="input-group-text">
                <span className="font13" style={{ marginRight: 2 }}>치통</span>
                <input
                  className="form-check-input mt-0"
                  type="checkbox"
                  defaultValue="치통"
                  aria-label="Checkbox for following text input"
                />
              </div>
            </div>
            
            <h3>추가 입력항목</h3>

            <div className="input-group mb-3">
              <form>
              <span>
                <h5>증상 사진 첨부</h5> 
                <input id="formFileMultiple" className="form-control" type="file" name="files" multiple="multiple" accept="image/*" style={{ width: 250 }} />
                </span>
              </form>
            </div>

            <div className="insert-btns">
              <button type="button" className="btn btn-outline-secondary insert-btn" onClick={() => {
                // 저장버튼 툴린후에 발생할 코드 입력 필요
                let pa = "";
                let vaol = $(".form-check-input:checked");
                for (let i = 0; i < vaol.length; i++) {
                  if (vaol[i].value.length > 0) {
                    pa = pa + (vaol[i].value);
                    if (i != vaol.length - 1) {
                      pa = pa + ",";
                    }
                  }
                }
                if ($(".insert-title").val().length > 0 && $(".form-check-input:checked").length > 0) {

                  fetch('http://175.106.99.31/insert', {
                    method: 'POST', // 또는 'PUT'
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ // 스프링에 전달할 값
                      no: myno,
                      title: $(".insert-title").val(),
                      pain: pa,
                      name: mydata.name,
                      age: new Date().getYear() + 1900-mydata.birth.split("-")[0],
                      tel: mydata.tel,
                      addr1: mydata.addr,
                      addr2: "",
                      another: mydata.phy + "\n" + mydata.drug,
                      gender: mydata.gender ? "남" : "여",
                    }),
                  }).then(data => data.json())
                    .then(data => {
                      console.log(data)
                      let bno = data.no;
                      submitFiles(bno);
                    })
                    .then(() => {
                      stat = 0
                      roots.render(
                      );
                      btnon($(".btn-1"));
                      btnon($(".btn-2"));
                      btnon($(".btn-3"));
                    })
                } else {
                  Swal.fire({
                    icon: 'question',
                    title: '제목 및 필수 선택 사항 입력 필요',
                    width: 400,
                    height: 320,
                    showConfirmButton: false,
                    timer: 750
                  });
                }
                // .then((response) => response.json())
                // .then((data) => console.log(data));
              }}>
                저장
              </button>
              <button type="button" className="btn btn-outline-secondary close-btn" onClick={() => {
                // 취소버튼 툴린후에 발생할 코드 입력 필요
                  stat = 0;
                  roots.render(
                  );
                  btnon($(".btn-1"));
                  btnon($(".btn-2"));
                  btnon($(".btn-3"));
              }}>
                취소
              </button>
            </div>
          </div>
        </div>
      );
    } else {
      roots.render(
        <div id="root">
          <div className="insert-left">
            <h3><strong>필수 입력항목</strong></h3>
            <div className="input-group mb-3" style={{ height: 50, float: "left" }}>
              <span className="input-group-text" id="basic-addon1">
                제목
              </span>
              <input
                type="text"
                className="form-control insert-title"
                placeholder="글의 제목이 되는 부분으로 증상의 간단한 설명을 작성하십시오"
                aria-label="Username"
                aria-describedby="basic-addon1"
              />
            </div>
            <h5>증상 부위 또는 증상의 종류</h5>
            <div className="input-group mb-3" >
              <div className="input-group-text">
                <span className="font13" style={{ marginRight: 2 }}>머리</span>
                <input
                  className="form-check-input mt-0"
                  type="checkbox"
                  defaultValue="머리"
                  aria-label="Checkbox for following text input"
                />
              </div>
              <div className="input-group-text">
                <span className="font13" style={{ marginRight: 2 }}>인후</span>
                <input
                  className="form-check-input mt-0"
                  type="checkbox"
                  defaultValue="인후"
                  aria-label="Checkbox for following text input"
                />
              </div>
              <div className="input-group-text">
                <span className="font13" style={{ marginRight: 2 }}>가슴</span>
                <input
                  className="form-check-input mt-0"
                  type="checkbox"
                  defaultValue="가슴"
                  aria-label="Checkbox for following text input"
                />
              </div>
              <div className="input-group-text">
                <span className="font13" style={{ marginRight: 2 }}>복부</span>
                <input
                  className="form-check-input mt-0"
                  type="checkbox"
                  defaultValue="복부"
                  aria-label="Checkbox for following text input"
                />
              </div>
              <div className="input-group-text">
                <span className="font13" style={{ marginRight: 2 }}>손,발</span>
                <input
                  className="form-check-input mt-0"
                  type="checkbox"
                  defaultValue="손발"
                  aria-label="Checkbox for following text input"
                />
              </div>
              <div className="input-group-text">
                <span className="font13" style={{ marginRight: 2 }}>팔</span>
                <input
                  className="form-check-input mt-0"
                  type="checkbox"
                  defaultValue="팔"
                  aria-label="Checkbox for following text input"
                />
              </div>
              <div className="input-group-text">
                <span className="font13" style={{ marginRight: 2 }}>하체</span>
                <input
                  className="form-check-input mt-0"
                  type="checkbox"
                  defaultValue="하체"
                  aria-label="Checkbox for following text input"
                />
              </div>
              <div className="input-group-text">
                <span className="font13" style={{ marginRight: 2 }}>허리</span>
                <input
                  className="form-check-input mt-0"
                  type="checkbox"
                  defaultValue="허리"
                  aria-label="Checkbox for following text input"
                />
              </div>
            </div>
            <div className="input-group mb-3" style={{  }}>
              <div className="input-group-text">
                <span className="font13" style={{ marginRight: 2 }}>두통</span>
                <input
                  className="form-check-input mt-0"
                  type="checkbox"
                  defaultValue="두통"
                  aria-label="Checkbox for following text input"
                />
              </div>
              <div className="input-group-text">
                <span className="font13" style={{ marginRight: 2 }}>흉통(가슴)</span>
                <input
                  className="form-check-input mt-0"
                  type="checkbox"
                  defaultValue="흉통"
                  aria-label="Checkbox for following text input"
                />
              </div>
              <div className="input-group-text">
                <span className="font13" style={{ marginRight: 2 }}>복통</span>
                <input
                  className="form-check-input mt-0"
                  type="checkbox"
                  defaultValue="복통"
                  aria-label="Checkbox for following text input"
                />
              </div>
              <div className="input-group-text">
                <span className="font13" style={{ marginRight: 2 }}>요통</span>
                <input
                  className="form-check-input mt-0"
                  type="checkbox"
                  defaultValue="요통"
                  aria-label="Checkbox for following text input"
                />
              </div>
              <div className="input-group-text">
                <span className="font13" style={{ marginRight: 2 }}>치통</span>
                <input
                  className="form-check-input mt-0"
                  type="checkbox"
                  defaultValue="치통"
                  aria-label="Checkbox for following text input"
                />
              </div>
            </div>

            <h3>추가 입력항목</h3>
            <div style={{ marginBottom: 0  }}>
            <div className="input-group mb-3" style={{ width: 200, float: "left" }}>
              <span className="input-group-text" id="basic-addon1">
                이름
              </span>
              <input
                type="text"
                className="form-control insert-name"
                placeholder="이름"
                aria-label="Username"
                aria-describedby="basic-addon1"
              />
            </div>
            <div className="input-group mb-3" style={{ marginLeft: 20, width: 120, float: "left" }}>
              <span className="input-group-text" id="basic-addon1">
                나이
              </span>
              <input
                type="text"
                className="form-control insert-age"
                placeholder="대략"
                aria-label="Username"
                aria-describedby="basic-addon1"
              />
            </div>
            <div className="input-group mb-3" style={{ marginLeft: 20, width: 200, float: "left" }}>
              <span className="input-group-text" id="basic-addon1">
                연락처
              </span>
              <input
                type="text"
                className="form-control insert-tel"
                placeholder="연락처"
                aria-label="Username"
                aria-describedby="basic-addon1"
              />
            </div>

            <div className="form-check form-check-inline" style={{ padding: 0, lineHeight: 2, with: 40, height: 40, marginLeft: 20, float: "left" }}>
              <input
                type="radio"
                name="inlineRadioOptions"
                id="inlineRadio1"
                defaultValue="남"
              />
              <label className="form-check-label" htmlFor="inlineRadio1">
                남
              </label>
            </div>
            <div className="form-check form-check-inline" style={{ padding: 0, lineHeight: 2, with: 40, height: 40, marginLeft: 0, float: "left" }}>
              <input
                type="radio"
                name="inlineRadioOptions"
                id="inlineRadio2"
                defaultValue="여"
              />
              <label className="form-check-label" htmlFor="inlineRadio2">
                여
              </label>
            </div>
            </div>

            {/* <div className="input-group mb-3" style={{ marginLeft: 5, marginRight: 5, width: 320, float: "left" }}>
              <span className="input-group-text" id="basic-addon1">
                비밀번호
              </span>
              <input
                type="password"
                className="form-control insert-password"
                placeholder="작성글 조회시에 필요합니다"
                aria-label="Username"
                aria-describedby="basic-addon1"
              />
            </div> */}

            {/* <button type="button" className="btn btn-primary insert-btn" onClick={() => {
              // 비밀번호 중복 조회
              if ($(".insert-password").val().length > 3) {
                fetch("http://175.106.99.31/boardPassword", {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({ // 스프링에 전달할 값
                    password: $(".insert-password").val(),
                  })
                })
                  .then(response => response.json())
                  .then(data => {
                    if (data.status == "success") {
                      alert("중복 된 비밀번호")
                    } else {
                      alert("사용가능한 비밀번호")
                      bool = $(".insert-password").val();
                    }
                  })
  
              } else {
                alert("비밀번호 4자리 이상 입력 필요")
              }
              // .then((response) => response.json())
              // .then((data) => console.log(data));
            }}>
              중복확인
            </button> */}
            <div className="input-group mb-3">
               <form>
                <span>
                  <h5>증상 사진 첨부</h5> 
                  <input id="formFileMultiple" className="form-control" type="file" name="files" multiple="multiple" accept="image/*" style={{ width: 250 }} />
                </span>
              </form>
             </div>
          

            <div className="input-group mb-3" style={{ width: 500, float: "left", marginTop: 10}}>
              <span className="input-group-text" id="basic-addon1">
                주소
              </span>
              <input
                type="text"
                className="form-control insert-addr1"
                placeholder="새주소?"
                aria-label="Username"
                aria-describedby="basic-addon1"
                readOnly="true"
                id="extraAddress"
              />
              <div class="col-sm-3" style={{marginLeft:20}}>
                <input type="button" onClick={execDaumPostcode} defaultValue="우편번호 찾기" className="btn btn-outline-secondary"/>
              </div>
            </div>

            <div className="input-group mb-3" style={{ width: 700, float: "left"}}>
              <span className="input-group-text" id="basic-addon1">
                상세주소
              </span>
              <input
                type="text"
                className="form-control insert-addr2"
                placeholder="예: xxx동 xxx호"
                aria-label="Username"
                aria-describedby="basic-addon1"
              />
            </div>
            <div className="input-group" style={{ height: 150 }}>
              <span className="input-group-text">
                그 외<br />
                전달사항
              </span>
              <textarea
                className="form-control insert-another"
                aria-label="With textarea"
                defaultValue={""}
              />
            </div>
            <div className="insert-btns">
              <button type="button" className="btn btn-outline-secondary insert-btn" onClick={() => {
                // 저장버튼 툴린후에 발생할 코드 입력 필요
                let pa = "";
                let vaol = $(".form-check-input:checked");
                for (let i = 0; i < vaol.length; i++) {
                  if (vaol[i].value.length > 0) {
                    pa = pa + (vaol[i].value);
                    if (i != vaol.length - 1) {
                      pa = pa + ",";
                    }
                  }
                }
                if ($(".insert-title").val().length > 0 && $(".form-check-input:checked").length > 0) {

                  fetch('http://175.106.99.31/insert', {
                    method: 'POST', // 또는 'PUT'
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ // 스프링에 전달할 값
                      no: myno,
                      title: $(".insert-title").val(),
                      pain: pa,
                      name: $(".insert-name").val(),
                      age: $(".insert-age").val(),
                      tel: $(".insert-tel").val(),
                      addr1: $(".insert-addr1").val(),
                      addr2: $(".insert-addr2").val(),
                      another: $(".insert-another").val(),
                      gender: $("input[name=inlineRadioOptions]:checked").val(),
                    }),
                  }).then(data => data.json())
                    .then(data => {
                      let bno = data.no;
                      submitFiles(bno);
                      Swal.fire(`인증 번호\n(작성글 조회시에 필요 합니다)\n[ ${data.serial} ]`);
                    })
                    .then(() => {
                      stat = 0
                      roots.render(
                      );
                      btnon($(".btn-1"));
                      btnon($(".btn-2"));
                      btnon($(".btn-3"));
                    })
                } else {
                  Swal.fire({
                    icon: 'question',
                    title: '제목 및 필수 선택 사항 입력 필요',
                    width: 400,
                    height: 320,
                    showConfirmButton: false,
                    timer: 750
                  });
                }
                // .then((response) => response.json())
                // .then((data) => console.log(data));
              }}>
                저장
              </button>
              <button type="button" className="btn btn-outline-secondary close-btn" onClick={() => {
                // 취소버튼 툴린후에 발생할 코드 입력 필요
                  stat = 0;
                  roots.render(
                  );
                  btnon($(".btn-1"));
                  btnon($(".btn-2"));
                  btnon($(".btn-3"));
              }}>
                취소
              </button>
            </div>
          </div>
        </div>
      );
    }
  }, 10);

})
$(".btn-2").click(() => {
  btnoff($(".btn-2"));
  btnon($(".btn-1"));
  btnon($(".btn-3"));
  if (stat == 2)
    return
  stat = 2
  roots.render()
  setTimeout(() => {
    roots.render(
      <div id="root_1">
        <div className="insert-left">
          <h3>검색</h3>
          <div className="input-group mb-3" style={{ height: 50, float: "left" }}>
            <input
              type="text"
              className="form-control insert-title"
              placeholder="이용자 분들의 질문을 기반으로 의료 전문가들이 삼담 또는 진단한 내용을 찾아볼 수 있습니다"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
            <button className="btn btn-dark" type="button" onClick={(e) => { // 검색 탭 검색버튼 클릭시 액션
              let ser = $(".insert-title").val();
              if (ser.length > 0) {
                fetch("http://175.106.99.31/boardSearch", {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({ // 스프링에 전달할 값
                    search: ser,
                    tags: $(".search-tags").val()
                  })
                })
                  .then(response => response.json())
                  .then(data => {
                    let lists = [];
                    data.forEach(e => {
                      let n = new Date();
                      let n_year = n.getYear() + 1900;
                      let n_month = n.getMonth() + 1;
                      let n_day = n.getDate();
                      let e_year = Number(e.createdDate.split("-")[0]);
                      let e_month = Number(e.createdDate.split("-")[1]);
                      let e_day = Number(e.createdDate.split("-")[2]) + 1;
                      if (n_year > e_year) {
                        e.createdDate = (n_year - e_year) + "년 전";
                      } else if (n_month > e_month) {
                        e.createdDate = (n_month - e_month) + "개월 전";
                      } else if (n_day > e_day) {
                        e.createdDate = (n_day - e_day) + "일 전";
                      } else {
                        e.createdDate = "오늘 작성";
                      }
                      lists.push(<SearchBoardList params={e} />)
                    })
                    ReactDOM.createRoot($(".list-group")[0]).render(
                      lists
                    );
                  })
                $(".insert-title").val("")
              } else {
                Swal.fire({
                  icon: 'question',
                  title: '검색어 입력 필요',
                  width: 400,
                  height: 320,
                  showConfirmButton: false,
                  timer: 750
                });
              }

            }}>
              검색
            </button>
          </div>
          <div
            className="input-group"
            style={{ width: 950, float: "left", marginLeft: 5 }}
          >
            <input
              type="text"
              className="form-control search-tags"
              defaultValue=""
              aria-label="Username"
              aria-describedby="addon-wrapping"
            />
          </div>
          <input
            type="button"
            className="btn btn-outline-secondary"
            defaultValue="검색 옵션 추가"
            style={{ width: 135, float: "right", marginRight: 5 }}
            onClick={() => {   // 검색 창에서 Tag 선택 버튼 클릭시 액션
              ReactDOM.createRoot(document.getElementById('new-windows')).render(
                <div className="new-window scroll">
                  <div className="new-window-tag">머리</div>
                  <div className="new-window-tag">인후</div>
                  <div className="new-window-tag">가슴</div>
                  <div className="new-window-tag">복부</div>
                  <div className="new-window-tag">손발</div>
                  <div className="new-window-tag">팔</div>
                  <div className="new-window-tag">하체</div>
                  <div className="new-window-tag">두통</div>
                  <div className="new-window-tag">흉통</div>
                  <div className="new-window-tag">복통</div>
                  <div className="new-window-tag">요통</div>
                  <div className="new-window-tag">치통</div>
                  <div className="new-window-tag">증상1</div>
                  <div className="new-window-tag">증상2</div> 
                  <div className="new-window-tag">증상3</div>
                  <div className="new-window-tag">증상4</div>
                  <div className="new-window-tag">증상5</div>
                  <div className="new-window-tag">증상6</div>
                  <div className="new-window-tag">증상7</div>
                  <div className="new-window-tag">증상8</div>
                  <div className="new-window-tag">증상9</div>
                  <div className="new-window-tag">증상10</div>
                  <div className="new-window-tag">증상11</div>
                  <div className="new-window-tag">증상12</div>
                  <div className="new-window-tag">증상13</div>
                  <div className="new-window-tag">증상14</div>
                  <div className="new-window-tag">증상15</div>
                  <div className="new-window-tag">증상16</div>
                  <div className="new-window-tag">증상17</div>
                  <div className="new-window-tag">증상18</div>
                  <div className="new-window-tag">증상19</div>
                  <div className="new-window-tag">증상20</div>
                  <div className="new-window-tag">증상21</div>
                  <div className="new-window-close"
                    onClick={() => {
                      ReactDOM.createRoot(document.querySelector("#new-windows")).render()
                    }}>닫기</div>
                </div>
              );
              setTimeout(() => {
                $(".new-window-tag").click((e) => {
                  if (!$(".search-tags").val().includes(e.target.innerText)) {
                    $(".search-tags").val($(".search-tags").val() + " " + "#" + e.target.innerText + ",")
                  }
                });
              }, 1);
            }}
          />
        </div>
        <div id="search-list" className="scroll">
          <div className="list-group">

          </div>
        </div>
      </div>
    );
  }, 10);

})

$(".btn-3").click(() => {
  btnoff($(".btn-3"));
  btnon($(".btn-1"));
  btnon($(".btn-2"));

  
  if (stat == 3)
    return
  stat = 3
  roots.render()
  setTimeout(() => {
    roots.render(
      <div id="root_2" style={{ width: 600, height: 150 }}>
        <h4>비회원 작성글 조회</h4>
        <div className="input-group">
          <input
            type="password"
            className="form-control search-board"
            placeholder="작성글에 입력한 비밀번호"
            aria-label="Text input with segmented dropdown button"
          />
          <button type="button" className="btn btn-warning search-board-btn" onClick={() => {   // 비회원 작성글 비밀번호 조회 버튼 눌렸을 때 액션
            if ($(".search-board").val().length <= 4) {
              Swal.fire({
                icon: 'error',
                title: '잘못된 일련번호',
                width: 400,
                height: 320,
                showConfirmButton: false,
                timer: 750
              });
              return;
            }
            fetch("http://175.106.99.31/boardPassword", {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ // 스프링에 전달할 값
                password: $(".search-board").val(),
              })
            })
              .then(response => response.json())
              .then(data => {
                if (data.status == "success") {
                  let no = data.data.no
                  window.localStorage.setItem("boardNo", no);
                  location.href = "patients-record-be.html?no=" + no;

                } else {
                  Swal.fire({
                    icon: 'error',
                    title: '잘못된 비밀번호 입니다',
                    width: 400,
                    height: 320,
                    showConfirmButton: false,
                    timer: 750
                  });
                }
              })
          }}>
            작성글 조회
          </button>
        </div>
      </div>
    );
  }, 10);

})


function formatDate(date) {
  return date.toLocaleDateString();
}

function Comment(props) {
  return (
    <div className="Comment">
      <div className="UserInfo">
        <img className="Avatar"
          src={props.author.avatarUrl}
          alt={props.author.name} />
        <div className="UserInfo-name">
          {props.author.name}
        </div>
      </div>
      <div className="Comment-text">
        {props.text}
      </div>
      <div className="Comment-date">
        {formatDate(props.date)}
      </div>
    </div>
  );
}


$(".new-window-close").click(() => {
  $(".new-windows")[0].innerHTML = "";
})

// FB.getLoginStatus(function(response) {
//   statusChangeCallback(response);
// });


function SearchBoardList(param) {
  let params = param.params;
  return (
    <a href="#" class="list-group-item list-group-item-action">
      <div class="d-flex w-100 justify-content-between">
        <h5 class="mb-1 fw-bold">{params.title}</h5>
        <small class="text-muted">{params.createdDate}</small>
      </div>
      <p class="mb-1">
        {params.pain}
      </p>
    </a>
  )
}

function submitFiles(no) {
  let formData = new FormData();
  let files = $("input[name=files]")[0].files;
  let i = 0;
  if (files.length == 0) {
    return
  }
  for (i = 0; i < files.length; i++) {
    formData.append("files", files[i]);
    formData.append("boardNo", no); //  여기 입력되는 정수가 보드 번호여야 한다
  }

  $.ajax({
    url: 'http://175.106.99.31/insertBoardImg',
    data: formData,
    cache: false,
    contentType: false,
    processData: false,
    type: 'POST',
    success: function (data) {
      console.log("데이터 업로드 성공");
    },
    error: function (e) {
      console.log("데이터 업로드 실패");
    }
  });
}

let scleft = true;
let scright = true;



$(".backmov-left").click(() => {
  if ($(document).scrollLeft() == 0) {

  } else if ($(document).scrollLeft() == screen.availWidth) {
    scrollmov(0)
  } else if ($(document).scrollLeft() == screen.availWidth*2) {
    scrollmov(screen.availWidth)
  } else if ($(document).scrollLeft() == screen.availWidth*3) {
    scrollmov(screen.availWidth*2)
  } else if ($(document).scrollLeft() == screen.availWidth*4) {
    scrollmov(screen.availWidth*3)
  }
})

$(".backmov-right").click(() => {
  if ($(document).scrollLeft() == 0) {
    scrollmov(screen.availWidth)
  } else if ($(document).scrollLeft() == screen.availWidth) {
    scrollmov(screen.availWidth*2)
  } else if ($(document).scrollLeft() == screen.availWidth*2) {
    scrollmov(screen.availWidth*3)
  } else if ($(document).scrollLeft() == screen.availWidth*3) {
    scrollmov(screen.availWidth*4)
  } else if ($(document).scrollLeft() == screen.availWidth*4) {

  }
})

$(".body-cover").css("width", screen.availWidth)
$("body").css("width", screen.availWidth*3)
$("body").css("background-size", screen.availWidth*3)

setTimeout(() => {
  let s = $(document).scrollLeft();
  if (s == 0 || s == screen.availWidth || s == screen.availWidth*2 || s == screen.availWidth*3 || s == screen.availWidth*4) {
    
  }else if ($(document).scrollLeft() >= screen.availWidth*3.5) {
    scrollmov(screen.availWidth*4)
  }else if ($(document).scrollLeft() >= screen.availWidth*2.5) {
    scrollmov(screen.availWidth*3)
  }else if ($(document).scrollLeft() >= screen.availWidth*1.5) {
    scrollmov(screen.availWidth*2)
  }else if ($(document).scrollLeft() >= screen.availWidth*0.5) {
    scrollmov(screen.availWidth)
  }else {
    console.log($(document).scrollLeft())
    scrollmov(0)
  }
}, 500);
let bol = true;
setInterval(() => {
  if ($(document).scrollLeft() == 0) {
    scrollmov(screen.availWidth*1)
  }else if ($(document).scrollLeft() <= screen.availWidth*1) {
    if(bol) {
      scrollmov(screen.availWidth*2);
      bol = !bol;
    }else {
      scrollmov(screen.availWidth*0);
      bol = !bol;
    }
  }else if ($(document).scrollLeft() <= screen.availWidth*2) {
    scrollmov(screen.availWidth*1)
  }else if ($(document).scrollLeft() <= screen.availWidth*3) {
    scrollmov(screen.availWidth)
  }else {
    console.log($(document).scrollLeft())
    scrollmov(0)
  }
}, 5000);


// $(".body-cover").css("height", screen.availHeight)

// $(window).on("wheel", function (event){
//   // deltaY obviously records vertical scroll

//   // event.originalEvent → JavaScript 의 wheelEvent 객체
//   // deltaY 값은 개인이 마우스 설정에서 설정한 휠 설정 값에 따라 다르다.
//   if(event.originalEvent.deltaY == 100){
//     console.log(event.originalEvent.deltaY +" "+$(document).scrollLeft());
//     new Promise(resolve => {
//       $('html').animate({scrollLeft : screen.availWidth}, 1000)
//       resolve();
//     })
//   }else if(event.originalEvent.deltaY == -100) {
//     console.log(event.originalEvent.deltaY +" "+$(document).scrollLeft());
//     new Promise(resolve => {
//       $('html').animate({scrollLeft : screen.availWidth*2}, 1000)
//       resolve();
//     })
//   }

//   if (event.originalEvent.deltaY < 0) {


//   }
//   else {


//   }
// });
// $(window).scroll(function (event) { 
//   console.log(event.originalEvent.deltaY +" "+$(document).scrollLeft());
// 	// var scrollValue = $(document).scrollLeft(); 
//   //   console.log(scrollValue); 
// });


function scrollmov(code) {
  new Promise(resolve => {
    $(document).scrollLeft(code)
    resolve();
  })
    .then(() => {
      $(document).scrollLeft(code)
    })
}


function btnon(btn) {
  btn.css("margin-top", "")
  btn.css("opacity", "1")
  btn.css("box-shadow", "0 0 0 1px #7fccde inset, 0 0 0 2px rgba(255,255,255,0.15) inset, 0 8px 0 0 rgba(102, 164, 178, .6), 0 8px 0 1px rgba(0,0,0,.4), 0 8px 8px 1px rgba(0,0,0,0.5)")
}
function btnoff(btn) {
  btn.css("margin-top", "9px")
  btn.css("opacity", "0.8")
  btn.css("box-shadow", "0 0 0 1px #82c8a0 inset,0 0 0 2px rgba(255,255,255,0.15) inset,0 0 0 1px rgba(0,0,0,0.4)")
}
function execDaumPostcode() {
  new daum.Postcode({
    oncomplete: function (data) {
      // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

      // 도로명 주소의 노출 규칙에 따라 주소를 표시한다.
      // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
      var roadAddr = data.roadAddress; // 도로명 주소 변수
      var extraRoadAddr = ''; // 참고 항목 변수

      // 법정동명이 있을 경우 추가한다. (법정리는 제외)
      // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
      if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
        extraRoadAddr += data.bname;
      }
      // 건물명이 있고, 공동주택일 경우 추가한다.
      if (data.buildingName !== '' && data.apartment === 'Y') {
        extraRoadAddr +=
          extraRoadAddr !== ''
            ? ', ' + data.buildingName
            : data.buildingName;
      }
      // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
      if (extraRoadAddr !== '') {
        extraRoadAddr = ' (' + extraRoadAddr + ')';
      }

      // 우편번호와 주소 정보를 해당 필드에 넣는다.

      // 참고항목 문자열이 있을 경우 해당 필드에 넣는다.
      if (roadAddr !== '') {
        document.getElementById('extraAddress').value = data.roadAddress;
      } else {
        document.getElementById('extraAddress').value = '';
      }
    },
  }).open();
}