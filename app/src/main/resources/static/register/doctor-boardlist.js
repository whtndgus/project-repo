let boardList = [];

function Span(props) {
  return (<span className={props.data[1]}>{props.data[0]}</span>)
}
function Tds(props) {
  return (<td><Span data={props.data}></Span></td>)
}

function Td(props) {
  return (<td>{props.data}</td>)
}

  let myno = 0; 

  fetch(`http://localhost:8080/auth/user`, {
    method: 'GET'
  })
    .then(response => response.json())
    .then(data => {
      if (data.status == "success") {
        document.querySelector('#username').innerHTML = data.data.name;
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

class BoardLists extends React.Component {
  constructor(props) {
    super(props);
    props = props.props;
    this.state = {
      answer: props.answer,
      no: props.no,
      title: props.title,
      warn: props.warn,
      writer: props.writer,
      date: props.date,
      warnLevel: props.warnLevel
    }
  }
  render() {
    return (
      <tr className="selects" onClick={() => {
        window.localStorage.setItem("boardNo", this.state.no)
        location.href = "doctors-records.html?no=" + this.state.no;
      }}>
        <Td data={this.state.answer}></Td>
        <Td data={this.state.no}></Td>
        <Td data={this.state.title}></Td>
        <Tds data={[this.state.warn, this.state.warnLevel]}></Tds>
        <Td data={this.state.writer}></Td>
        <Td data={this.state.date}></Td>
      </tr>
    );
  }
}

reflesh("")

$(".search-btn").click(() => {
  reflesh($(".search-filter").val())
});

function reflesh(string) {
  let lists;

  fetch("http://192.168.0.7:8080/boardSearch", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ // 스프링에 전달할 값
      search: string,
      tags: $(".search-tags").val()
    })
  })
    .then(response => response.json())
    .then(data => {
      boardList = data;
      let list = [];
      new Promise(resolve => {
        data.forEach(board => {
          

          let n = new Date();
          let countday = n.getDate() - board.createdDate.split("-")[2];
          let countmon = n.getMonth() - board.createdDate.split("-")[1];
          let str = "";
          if (countmon >= 0) {
            str = "badge bg-danger text-dark";
          } else if (countday > 8) {
            str = "badge bg-danger text-dark";
          } else if (countday > 5) {
            str = "badge bg-warning";
          } else {
            str = "badge bg-success";
          }

          let obj = {
            answer: board.fedcount,
            no: board.no,
            title: board.title,
            warn: "경고",
            warnLevel: str,
            writer: board.another.split(",")[0].length > 0 ? board.another.split(",")[0] : "-",
            date: board.createdDate,
          }
          if (board.title.includes($(".search-filter").val())) {
            list.push(<BoardLists props={obj} />)
          }
        });
        resolve();
      })
      .then(() => {
        lists = list;
      })
    })
    .then(() => {
      ReactDOM.createRoot($(".table tbody")[0]).render(
        lists
      )
    })
}

function name(params) {
  
}