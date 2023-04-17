
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

fetch(`http://localhost:8080/auth/user`, {
  method: 'GET'
})
  .then(response => response.json())
  .then(data => {
    if (data.status == "success") {
      myno = data.data.no;
      mydata = data.data;
      console.log(mydata)
    } else {

    }
})

$(".btn-1").click(() => {
  if (stat == 1)
    return
  stat = 1
  roots.render()
  setTimeout(() => {
    if(myno > 0) {
      roots.render(
        <div id="root">
          <div className="insert-left">
            <h3>필수 입력항목</h3>
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
            <div className="input-group mb-3" style={{ height: 38 }}>
              <div className="input-group-text">
                <span className="font12" style={{ marginRight: 2 }}>머리</span>
                <input
                  className="form-check-input mt-0"
                  type="checkbox"
                  defaultValue="머리"
                  aria-label="Checkbox for following text input"
                />
              </div>
              <div className="input-group-text">
                <span className="font12" style={{ marginRight: 2 }}>인후</span>
                <input
                  className="form-check-input mt-0"
                  type="checkbox"
                  defaultValue="인후"
                  aria-label="Checkbox for following text input"
                />
              </div>
              <div className="input-group-text">
                <span className="font12" style={{ marginRight: 2 }}>가슴</span>
                <input
                  className="form-check-input mt-0"
                  type="checkbox"
                  defaultValue="가슴"
                  aria-label="Checkbox for following text input"
                />
              </div>
              <div className="input-group-text">
                <span className="font12" style={{ marginRight: 2 }}>복부</span>
                <input
                  className="form-check-input mt-0"
                  type="checkbox"
                  defaultValue="복부"
                  aria-label="Checkbox for following text input"
                />
              </div>
              <div className="input-group-text">
                <span className="font12" style={{ marginRight: 2 }}>손,발</span>
                <input
                  className="form-check-input mt-0"
                  type="checkbox"
                  defaultValue="손발"
                  aria-label="Checkbox for following text input"
                />
              </div>
              <div className="input-group-text">
                <span className="font12" style={{ marginRight: 2 }}>팔</span>
                <input
                  className="form-check-input mt-0"
                  type="checkbox"
                  defaultValue="팔"
                  aria-label="Checkbox for following text input"
                />
              </div>
              <div className="input-group-text">
                <span className="font12" style={{ marginRight: 2 }}>하체</span>
                <input
                  className="form-check-input mt-0"
                  type="checkbox"
                  defaultValue="하체"
                  aria-label="Checkbox for following text input"
                />
              </div>
              <div className="input-group-text">
                <span className="font12" style={{ marginRight: 2 }}>허리</span>
                <input
                  className="form-check-input mt-0"
                  type="checkbox"
                  defaultValue="허리"
                  aria-label="Checkbox for following text input"
                />
              </div>
              <div className="input-group-text">
                <span className="font12" style={{ marginRight: 2 }}>두통</span>
                <input
                  className="form-check-input mt-0"
                  type="checkbox"
                  defaultValue="두통"
                  aria-label="Checkbox for following text input"
                />
              </div>
              <div className="input-group-text">
                <span className="font12" style={{ marginRight: 2 }}>흉통(가슴)</span>
                <input
                  className="form-check-input mt-0"
                  type="checkbox"
                  defaultValue="흉통"
                  aria-label="Checkbox for following text input"
                />
              </div>
              <div className="input-group-text">
                <span className="font12" style={{ marginRight: 2 }}>복통</span>
                <input
                  className="form-check-input mt-0"
                  type="checkbox"
                  defaultValue="복통"
                  aria-label="Checkbox for following text input"
                />
              </div>
              <div className="input-group-text">
                <span className="font12" style={{ marginRight: 2 }}>요통</span>
                <input
                  className="form-check-input mt-0"
                  type="checkbox"
                  defaultValue="요통"
                  aria-label="Checkbox for following text input"
                />
              </div>
              <div className="input-group-text">
                <span className="font12" style={{ marginRight: 2 }}>치통</span>
                <input
                  className="form-check-input mt-0"
                  type="checkbox"
                  defaultValue="치통"
                  aria-label="Checkbox for following text input"
                />
              </div>
              <div className="input-group-text">
                <span className="font12" style={{ marginRight: 2 }}>증상1</span>
                <input
                  className="form-check-input mt-0"
                  type="checkbox"
                  defaultValue="증상1"
                  aria-label="Checkbox for following text input"
                />
              </div>
              <div className="input-group-text">
                <span className="font12" style={{ marginRight: 2 }}>증상2</span>
                <input
                  className="form-check-input mt-0"
                  type="checkbox"
                  defaultValue="증상2"
                  aria-label="Checkbox for following text input"
                />
              </div>
            </div>
            <div className="input-group mb-3">
              <div className="input-group-text">
                <span className="font12" style={{ marginRight: 2 }}>증상4</span>
                <input
                  className="form-check-input mt-0"
                  type="checkbox"
                  defaultValue="증상4"
                  aria-label="Checkbox for following text input"
                />
              </div>
              <div className="input-group-text">
                <span className="font12" style={{ marginRight: 2 }}>증상5</span>
                <input
                  className="form-check-input mt-0"
                  type="checkbox"
                  defaultValue="증상5"
                  aria-label="Checkbox for following text input"
                />
              </div>
              <div className="input-group-text">
                <span className="font12" style={{ marginRight: 2 }}>증상6</span>
                <input
                  className="form-check-input mt-0"
                  type="checkbox"
                  defaultValue="증상6"
                  aria-label="Checkbox for following text input"
                />
              </div>
              <div className="input-group-text">
                <span className="font12" style={{ marginRight: 2 }}>증상7</span>
                <input
                  className="form-check-input mt-0"
                  type="checkbox"
                  defaultValue="증상7"
                  aria-label="Checkbox for following text input"
                />
              </div>
              <div className="input-group-text">
                <span className="font12" style={{ marginRight: 2 }}>증상8</span>
                <input
                  className="form-check-input mt-0"
                  type="checkbox"
                  defaultValue="증상8"
                  aria-label="Checkbox for following text input"
                />
              </div>
              <div className="input-group-text">
                <span className="font12" style={{ marginRight: 2 }}>증상</span>
                <input
                  className="form-check-input mt-0"
                  type="checkbox"
                  defaultValue="증상"
                  aria-label="Checkbox for following text input"
                />
              </div>
              <div className="input-group-text">
                <span className="font12" style={{ marginRight: 2 }}>증상</span>
                <input
                  className="form-check-input mt-0"
                  type="checkbox"
                  defaultValue="증상"
                  aria-label="Checkbox for following text input"
                />
              </div>
              <div className="input-group-text">
                <span className="font12" style={{ marginRight: 2 }}>증상</span>
                <input
                  className="form-check-input mt-0"
                  type="checkbox"
                  defaultValue="증상"
                  aria-label="Checkbox for following text input"
                />
              </div>
              <div className="input-group-text">
                <span className="font12" style={{ marginRight: 2 }}>증상</span>
                <input
                  className="form-check-input mt-0"
                  type="checkbox"
                  defaultValue="증상"
                  aria-label="Checkbox for following text input"
                />
              </div>
              <div className="input-group-text">
                <span className="font12" style={{ marginRight: 2 }}>증상</span>
                <input
                  className="form-check-input mt-0"
                  type="checkbox"
                  defaultValue="증상"
                  aria-label="Checkbox for following text input"
                />
              </div>
              <div className="input-group-text">
                <span className="font12" style={{ marginRight: 2 }}>증상</span>
                <input
                  className="form-check-input mt-0"
                  type="checkbox"
                  defaultValue="증상"
                  aria-label="Checkbox for following text input"
                />
              </div>
              <div className="input-group-text">
                <span className="font12" style={{ marginRight: 2 }}>증상</span>
                <input
                  className="form-check-input mt-0"
                  type="checkbox"
                  defaultValue="증상"
                  aria-label="Checkbox for following text input"
                />
              </div>
              <div className="input-group-text">
                <span className="font12" style={{ marginRight: 2 }}>증상</span>
                <input
                  className="form-check-input mt-0"
                  type="checkbox"
                  defaultValue="증상"
                  aria-label="Checkbox for following text input"
                />
              </div>
              <div className="input-group-text">
                <span className="font12" style={{ marginRight: 2 }}>증상</span>
                <input
                  className="form-check-input mt-0"
                  type="checkbox"
                  defaultValue="증상"
                  aria-label="Checkbox for following text input"
                />
              </div>
              <input
                type="text"
                className="form-control"
                placeholder="기타문항"
                aria-label="Text input with checkbox"
              />
            </div>
            <h3>추가 입력항목</h3>
  
            <form>
              <input type="file" name="files" multiple="multiple" style={{ width: 250 }} />
              <span style={{ fontWeight: 900 }}>증상 사진 선택</span>
            </form>
  
            <div className="insert-btns">
              <button type="button" className="btn btn-primary insert-btn" onClick={() => {
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
  
                  fetch('http://localhost:8080/insert', {
                    method: 'POST', // 또는 'PUT'
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ // 스프링에 전달할 값
                      no: myno,
                      title: $(".insert-title").val(),
                      pain: pa,
                      name: mydata.name,
                      age: mydata.birth.split("-")[0] - new Date().getYear()+1900,
                      tel: mydata.tel,
                      addr1: mydata.addr,
                      addr2: "",
                      another: mydata.phy + "\n" + mydata.drug,
                      gender: mydata.gender ? "남" : "여",
                    }),
                  }).then(data => data.json())
                    .then(data => {
                      let bno = data.no;
                      submitFiles(bno);
                      alert("인증 번호(비회원 작성글 조회시에 필요 합니다) : "+data.serial);
                    })
  
                  $("#root").fadeOut(1000)
                  setTimeout(() => {
                    roots.render(
                    );
                  }, 1000);
                } else {
                  alert("제목 및 필수 선택 사항 입력 필요")
                }
                // .then((response) => response.json())
                // .then((data) => console.log(data));
              }}>
                저장
              </button>
              <button type="button" className="btn btn-primary close-btn" onClick={() => {
                // 취소버튼 툴린후에 발생할 코드 입력 필요
                $("#root").fadeOut(400)
                setTimeout(() => {
                  roots.render(
                  );
                }, 400);
              }}>
                취소
              </button>
            </div>
          </div>
        </div>
      );
    }else {
      roots.render(
        <div id="root">
          <div className="insert-left">
            <h3>필수 입력항목</h3>
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
            <div className="input-group mb-3" style={{ height: 38 }}>
              <div className="input-group-text">
                <span className="font12" style={{ marginRight: 2 }}>머리</span>
                <input
                  className="form-check-input mt-0"
                  type="checkbox"
                  defaultValue="머리"
                  aria-label="Checkbox for following text input"
                />
              </div>
              <div className="input-group-text">
                <span className="font12" style={{ marginRight: 2 }}>인후</span>
                <input
                  className="form-check-input mt-0"
                  type="checkbox"
                  defaultValue="인후"
                  aria-label="Checkbox for following text input"
                />
              </div>
              <div className="input-group-text">
                <span className="font12" style={{ marginRight: 2 }}>가슴</span>
                <input
                  className="form-check-input mt-0"
                  type="checkbox"
                  defaultValue="가슴"
                  aria-label="Checkbox for following text input"
                />
              </div>
              <div className="input-group-text">
                <span className="font12" style={{ marginRight: 2 }}>복부</span>
                <input
                  className="form-check-input mt-0"
                  type="checkbox"
                  defaultValue="복부"
                  aria-label="Checkbox for following text input"
                />
              </div>
              <div className="input-group-text">
                <span className="font12" style={{ marginRight: 2 }}>손,발</span>
                <input
                  className="form-check-input mt-0"
                  type="checkbox"
                  defaultValue="손발"
                  aria-label="Checkbox for following text input"
                />
              </div>
              <div className="input-group-text">
                <span className="font12" style={{ marginRight: 2 }}>팔</span>
                <input
                  className="form-check-input mt-0"
                  type="checkbox"
                  defaultValue="팔"
                  aria-label="Checkbox for following text input"
                />
              </div>
              <div className="input-group-text">
                <span className="font12" style={{ marginRight: 2 }}>하체</span>
                <input
                  className="form-check-input mt-0"
                  type="checkbox"
                  defaultValue="하체"
                  aria-label="Checkbox for following text input"
                />
              </div>
              <div className="input-group-text">
                <span className="font12" style={{ marginRight: 2 }}>허리</span>
                <input
                  className="form-check-input mt-0"
                  type="checkbox"
                  defaultValue="허리"
                  aria-label="Checkbox for following text input"
                />
              </div>
              <div className="input-group-text">
                <span className="font12" style={{ marginRight: 2 }}>두통</span>
                <input
                  className="form-check-input mt-0"
                  type="checkbox"
                  defaultValue="두통"
                  aria-label="Checkbox for following text input"
                />
              </div>
              <div className="input-group-text">
                <span className="font12" style={{ marginRight: 2 }}>흉통(가슴)</span>
                <input
                  className="form-check-input mt-0"
                  type="checkbox"
                  defaultValue="흉통"
                  aria-label="Checkbox for following text input"
                />
              </div>
              <div className="input-group-text">
                <span className="font12" style={{ marginRight: 2 }}>복통</span>
                <input
                  className="form-check-input mt-0"
                  type="checkbox"
                  defaultValue="복통"
                  aria-label="Checkbox for following text input"
                />
              </div>
              <div className="input-group-text">
                <span className="font12" style={{ marginRight: 2 }}>요통</span>
                <input
                  className="form-check-input mt-0"
                  type="checkbox"
                  defaultValue="요통"
                  aria-label="Checkbox for following text input"
                />
              </div>
              <div className="input-group-text">
                <span className="font12" style={{ marginRight: 2 }}>치통</span>
                <input
                  className="form-check-input mt-0"
                  type="checkbox"
                  defaultValue="치통"
                  aria-label="Checkbox for following text input"
                />
              </div>
              <div className="input-group-text">
                <span className="font12" style={{ marginRight: 2 }}>증상1</span>
                <input
                  className="form-check-input mt-0"
                  type="checkbox"
                  defaultValue="증상1"
                  aria-label="Checkbox for following text input"
                />
              </div>
              <div className="input-group-text">
                <span className="font12" style={{ marginRight: 2 }}>증상2</span>
                <input
                  className="form-check-input mt-0"
                  type="checkbox"
                  defaultValue="증상2"
                  aria-label="Checkbox for following text input"
                />
              </div>
            </div>
            <div className="input-group mb-3">
              <div className="input-group-text">
                <span className="font12" style={{ marginRight: 2 }}>증상4</span>
                <input
                  className="form-check-input mt-0"
                  type="checkbox"
                  defaultValue="증상4"
                  aria-label="Checkbox for following text input"
                />
              </div>
              <div className="input-group-text">
                <span className="font12" style={{ marginRight: 2 }}>증상5</span>
                <input
                  className="form-check-input mt-0"
                  type="checkbox"
                  defaultValue="증상5"
                  aria-label="Checkbox for following text input"
                />
              </div>
              <div className="input-group-text">
                <span className="font12" style={{ marginRight: 2 }}>증상6</span>
                <input
                  className="form-check-input mt-0"
                  type="checkbox"
                  defaultValue="증상6"
                  aria-label="Checkbox for following text input"
                />
              </div>
              <div className="input-group-text">
                <span className="font12" style={{ marginRight: 2 }}>증상7</span>
                <input
                  className="form-check-input mt-0"
                  type="checkbox"
                  defaultValue="증상7"
                  aria-label="Checkbox for following text input"
                />
              </div>
              <div className="input-group-text">
                <span className="font12" style={{ marginRight: 2 }}>증상8</span>
                <input
                  className="form-check-input mt-0"
                  type="checkbox"
                  defaultValue="증상8"
                  aria-label="Checkbox for following text input"
                />
              </div>
              <div className="input-group-text">
                <span className="font12" style={{ marginRight: 2 }}>증상</span>
                <input
                  className="form-check-input mt-0"
                  type="checkbox"
                  defaultValue="증상"
                  aria-label="Checkbox for following text input"
                />
              </div>
              <div className="input-group-text">
                <span className="font12" style={{ marginRight: 2 }}>증상</span>
                <input
                  className="form-check-input mt-0"
                  type="checkbox"
                  defaultValue="증상"
                  aria-label="Checkbox for following text input"
                />
              </div>
              <div className="input-group-text">
                <span className="font12" style={{ marginRight: 2 }}>증상</span>
                <input
                  className="form-check-input mt-0"
                  type="checkbox"
                  defaultValue="증상"
                  aria-label="Checkbox for following text input"
                />
              </div>
              <div className="input-group-text">
                <span className="font12" style={{ marginRight: 2 }}>증상</span>
                <input
                  className="form-check-input mt-0"
                  type="checkbox"
                  defaultValue="증상"
                  aria-label="Checkbox for following text input"
                />
              </div>
              <div className="input-group-text">
                <span className="font12" style={{ marginRight: 2 }}>증상</span>
                <input
                  className="form-check-input mt-0"
                  type="checkbox"
                  defaultValue="증상"
                  aria-label="Checkbox for following text input"
                />
              </div>
              <div className="input-group-text">
                <span className="font12" style={{ marginRight: 2 }}>증상</span>
                <input
                  className="form-check-input mt-0"
                  type="checkbox"
                  defaultValue="증상"
                  aria-label="Checkbox for following text input"
                />
              </div>
              <div className="input-group-text">
                <span className="font12" style={{ marginRight: 2 }}>증상</span>
                <input
                  className="form-check-input mt-0"
                  type="checkbox"
                  defaultValue="증상"
                  aria-label="Checkbox for following text input"
                />
              </div>
              <div className="input-group-text">
                <span className="font12" style={{ marginRight: 2 }}>증상</span>
                <input
                  className="form-check-input mt-0"
                  type="checkbox"
                  defaultValue="증상"
                  aria-label="Checkbox for following text input"
                />
              </div>
              <div className="input-group-text">
                <span className="font12" style={{ marginRight: 2 }}>증상</span>
                <input
                  className="form-check-input mt-0"
                  type="checkbox"
                  defaultValue="증상"
                  aria-label="Checkbox for following text input"
                />
              </div>
              <input
                type="text"
                className="form-control"
                placeholder="기타문항"
                aria-label="Text input with checkbox"
              />
            </div>
            <h3>추가 입력항목</h3>
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
                fetch("http://localhost:8080/boardPassword", {
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
  
  
            <div className="input-group mb-3" style={{ marginLeft: 0, marginRight: 200, width: 500, float: "left" }}>
              <span className="input-group-text" id="basic-addon1">
                주소
              </span>
              <input
                type="text"
                className="form-control insert-addr1"
                placeholder="새주소?"
                aria-label="Username"
                aria-describedby="basic-addon1"
              />
            </div>
  
            <form>
              <input type="file" name="files" multiple="multiple" style={{ width: 250 }} />
              <span style={{ fontWeight: 900 }}>증상 사진 선택</span>
            </form>
  
            <div className="input-group mb-3" style={{ width: 700, float: "left" }}>
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
              <button type="button" className="btn btn-primary insert-btn" onClick={() => {
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
  
                  fetch('http://localhost:8080/insert', {
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
                      alert("인증 번호(비회원 작성글 조회시에 필요 합니다) : "+data.serial);
                    })
  
                  $("#root").fadeOut(1000)
                  setTimeout(() => {
                    roots.render(
                    );
                  }, 1000);
                } else {
                  alert("제목 및 필수 선택 사항 입력 필요")
                }
                // .then((response) => response.json())
                // .then((data) => console.log(data));
              }}>
                저장
              </button>
              <button type="button" className="btn btn-primary close-btn" onClick={() => {
                // 취소버튼 툴린후에 발생할 코드 입력 필요
                $("#root").fadeOut(400)
                setTimeout(() => {
                  roots.render(
                  );
                }, 400);
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
                fetch("http://localhost:8080/boardSearch", {
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
                      let e_day = Number(e.createdDate.split("-")[2]) +1 ;
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
                alert("검색어 입력 필요")
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
            className="btn btn-primary"
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
  console.log(11)
  location.href = "patients-profile.html"
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
              alert("잘못된 비밀번호 입니다")
              return;
            }
            fetch("http://localhost:8080/boardPassword", {
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
                  location.href = "/NiceAdmin/patients-record.html?no=" + no;

                } else {
                  alert("잘못된 비밀번호 입니다")
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
  if(files.length == 0) {
    return
  }
  for (i = 0; i < files.length; i++) {
    if (files[i].name.includes(".bmp") || files[i].name.includes(".jpeg") || files[i].name.includes(".jpg") || files[i].name.includes(".gif") || files[i].name.includes(".png") || files[i].name.includes(".tiff") || files[i].name.includes(".psd") || files[i].name.includes(".tga") || files[i].name.includes(".ai") || files[i].name.includes(".svg") || files[i].name.includes(".exif") || files[i].name.includes(".jfif")) {
      formData.append("files", files[i]);
      formData.append("boardNo", no); //  여기 입력되는 정수가 보드 번호여야 한다
    }
  }

  $.ajax({
    url: 'http://localhost:8080/insertBoardImg',
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
$(window).on("wheel", function (event){
  // deltaY obviously records vertical scroll
  
  // event.originalEvent → JavaScript 의 wheelEvent 객체
  // deltaY 값은 개인이 마우스 설정에서 설정한 휠 설정 값에 따라 다르다.
  if(event.originalEvent.deltaY == 100 && scright){
    console.log(event.originalEvent.deltaY +" "+$(document).scrollLeft());
    new Promise(resolve => {
      $('html').animate({scrollLeft : $(document).scrollLeft()+200}, 1)
      scright = false;
      resolve();
    })
    .then(() => {
      setTimeout(() => {
        scright = true;
        console.log(scright)
      }, 175)
    })
  }else if(event.originalEvent.deltaY == -100 && scleft) {
    console.log(event.originalEvent.deltaY +" "+$(document).scrollLeft());
    new Promise(resolve => {
      $('html').animate({scrollLeft : $(document).scrollLeft()-200}, 1)
      scleft = false;
      resolve();
    })
    .then(() => {
      setTimeout(() => {
        scleft = true;
        console.log(scleft)
      }, 175)
    })
  }

  if (event.originalEvent.deltaY < 0) {


  }
  else {


  }
});
// $(window).scroll(function (event) { 
//   console.log(event.originalEvent.deltaY +" "+$(document).scrollLeft());
// 	// var scrollValue = $(document).scrollLeft(); 
//   //   console.log(scrollValue); 
// });