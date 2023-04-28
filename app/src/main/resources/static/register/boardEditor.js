const tooltipTriggerList = document.querySelectorAll(
  '[data-bs-toggle="tooltip"]'
);
const tooltipList = [...tooltipTriggerList].map(
  (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
);

class Pbtr extends React.Component {
  constructor(props) {
    super(props);
    props = props.props;
    this.state = props;
  }
  render() {
    if (this.state.filter) {
      return (
        <tr onClick={() => { }}>
          <th>{this.state.name}</th>
          <td>{this.state.titles}</td>
          <td>{this.state.anos != "null" ? this.state.anos : "-"}</td>
          <td>
            <button
              type="button"
              className="btn btn-outline-success"
              style={{ width: 50, height: 25, padding: 0, fontSize: "70%" }}
              onClick={() => {
                ReactDOM.createRoot($(".new-windows")[0]).render(
                  <Pboardc props={this.state} />
                );
              }}
            >
              검증
            </button>
          </td>
          <td>{this.state.createdDate}</td>
        </tr>
      );
    } else {
      return (
        <tr onClick={() => { }}>
          <th>{this.state.name}</th>
          <td>{this.state.titles}</td>
          <td>{this.state.anos != "null" ? this.state.anos : "-"}</td>
          <td>
            <button
              type="button"
              className="btn btn-outline-danger"
              style={{ width: 50, height: 25, padding: 0, fontSize: "70%" }}
              onClick={() => {
                ReactDOM.createRoot($(".new-windows")[0]).render(
                  <Pboard props={this.state} />
                );
              }}
            >
              검증필요
            </button>
          </td>
          <td>{this.state.createdDate}</td>
        </tr>
      );
    }
  }
}

class Dctr extends React.Component {
  constructor(props) {
    super(props);
    props = props.props;
    this.state = props;
  }
  render() {
    if (this.state.filter) {
      return (
        <tr onClick={() => { }}>
          <th>{this.state.doctorName}</th>
          <td>{this.state.titles}</td>
          <td>{this.state.contents}</td>
          <td>
            <button
              type="button"
              className="btn btn-outline-success"
              style={{ width: 50, height: 25, padding: 0, fontSize: "70%" }}
              onClick={() => {
                ReactDOM.createRoot($(".new-windows")[0]).render(
                  <Dcommc props={this.state} />
                );
              }}
            >
              증명
            </button>
          </td>
          <td>{this.state.createdDate}</td>
        </tr>
      );
    } else {
      return (
        <tr onClick={() => { }}>
          <th>{this.state.doctorName}</th>
          <td>{this.state.titles}</td>
          <td>{this.state.contents}</td>
          <td>
            <button
              type="button"
              className="btn btn-outline-danger"
              style={{ width: 50, height: 25, padding: 0, fontSize: "70%" }}
              onClick={() => {
                ReactDOM.createRoot($(".new-windows")[0]).render(
                  <Dcomm props={this.state} />
                );
              }}
            >
              증명필요
            </button>
          </td>
          <td>{this.state.createdDate}</td>
        </tr>
      );
    }
  }
}

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

fetch("http://175.106.99.31/boardSearch")
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    let patients = [];
    data.forEach((patient) => {
      patient.name = patient.another.split("@")[0];
      patient.ano = patient.another.split("@")[5];

      if (patient.title.length > 8) {
        patient.titles = patient.title.substring(0, 8) + ". . .";
      } else {
        patient.titles = patient.title;
      }
      if (patient.ano.length > 6) {
        patient.anos = patient.ano.substring(0, 6) + ". . .";
      } else if (patient.ano == "null") {
        patient.ano = "-";
      }

      patients.push(<Pbtr props={patient} />);
    });
    return patients;
  })
  .then((list) => {
    ReactDOM.createRoot($(".patients-members")[0]).render(list);
  });

fetch("http://175.106.99.31/community/list")
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    let doctors = [];
    data.data.forEach((doctor) => {
      if (doctor.category == 1) {
        doctor.category = "자유 게시판";
      } else if (doctor.category == 2) {
        doctor.category = "의학 뉴스";
      } else if (doctor.category == 3) {
        doctor.category = "질문 게시판";
      }
      if (doctor.title.length > 6) {
        doctor.titles = doctor.title.substring(0, 6) + ". . .";
      } else {
        doctor.titles = doctor.title;
      }

      if (doctor.content.length > 6) {
        doctor.contents = doctor.content.substring(0, 6) + ". . .";
      } else {
        doctor.contents = doctor.content;
      }

      doctors.push(<Dctr props={doctor} />);
    });
    return doctors;
  })
  .then((list) => {
    ReactDOM.createRoot($(".doctors-members")[0]).render(list);
  });

function Pboard(props) {
  return (
    <div className="new-window">
      <div className="form-check form-switch window-check-cover">
        <label className="form-check-label window-check-text">검증 여부</label>
        <input
          className="form-check-input window-check"
          type="checkbox"
          role="switch"
        />
      </div>
      <div className="top-content">
        <h4>증상 내용</h4>
        <strong>제목 :</strong>
        <input
          type="text"
          className="form-control board-title"
          placeholder=""
          defaultValue={props.props.title}
          readOnly="true"
        />
        <strong>증상 :</strong>
        <input
          type="text"
          className="form-control board-pain"
          placeholder=""
          defaultValue={props.props.pain}
          readOnly="true"
        />
      </div>
      <div className="middle-content">
        <h4>인적 사항</h4>
        <strong>이름 :</strong>
        <input
          type="text"
          className="form-control board-name"
          placeholder=""
          defaultValue={props.props.another.split("@")[0]}
          readOnly="true"
        />
        <strong>나이 :</strong>
        <input
          type="text"
          className="form-control board-age"
          placeholder=""
          defaultValue={props.props.another.split("@")[1]}
          readOnly="true"
        />
        <strong>연락처 :</strong>
        <input
          type="text"
          className="form-control board-tel"
          placeholder=""
          defaultValue={props.props.another.split("@")[3]}
          readOnly="true"
        />
        <strong>주소 :</strong>
        <input
          type="text"
          className="form-control board-addr"
          placeholder=""
          defaultValue={props.props.another.split("@")[4]}
          readOnly="true"
        />
      </div>
      <div className="bottom-content">
        <div className="form-floating">
          <textarea
            className="form-control board-another"
            placeholder="Leave a comment here"
            id="floatingTextarea2"
            style={{ height: 100 }}
            defaultValue={props.props.ano}
            readOnly="true"
          />
          <label htmlFor="floatingTextarea2">특이사항</label>
        </div>
      </div>
      <div className="btn-content">
        <button
          type="button"
          className="btn btn-outline-success board-close"
          onClick={() => {
            ReactDOM.createRoot($(".new-windows")[0]).render();
          }}
        >
          닫기
        </button>
        <button
          type="button"
          className="btn btn-outline-danger board-delete"
          onClick={() => {
            Swal.fire({
              title: `작성글을 삭제 하시겠습니까?\n진단글 수 : ${props.props.fedcount}개`,
              showDenyButton: true,
              showConfirmButton: false,
              showCancelButton: true,
              denyButtonText: `삭제`,
            }).then((result) => {
              if (result.isDenied) {
                fetch("http://175.106.99.31/deleteByNo", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    // 스프링에 전달할 값
                    no: props.props.no,
                  }),
                })
                  .then((response) => response.json())
                  .then((data) => {
                    ReactDOM.createRoot($(".new-windows")[0]).render();
                    return data.status;
                  })
                  .then((status) => {
                    if (status == "success") {
                      Swal.fire({
                        icon: 'success',
                        title: '삭제 완료',
                        width: 400,
                        height: 320,
                        showConfirmButton: false,
                        timer: 750
                      })
                      location.href = ""
                    };
                  });
              }
            })
          }}
        >
          삭제
        </button>
        <button
          type="button"
          className="btn btn-outline-success board-insert"
          onClick={() => {
            fetch("http://175.106.99.31/auth/adminBoard", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                // 스프링에 전달할 값
                no: props.props.no,
                filter: $(".window-check").prop("checked"),
              }),
            })
              .then((response) => response.json())
              .then((data) => {
                ReactDOM.createRoot($(".new-windows")[0]).render();
                return data.status;
              })
              .then((status) => {
                if (status == "success") location.href = "";
              });
          }}
        >
          적용
        </button>
      </div>
    </div>
  );
}
function Pboardc(props) {
  return (
    <div className="new-window">
      <div className="form-check form-switch window-check-cover">
        <label className="form-check-label window-check-text">검증 여부</label>
        <input
          className="form-check-input window-check"
          type="checkbox"
          role="switch"
          defaultChecked="checked"
        />
      </div>
      <div className="top-content">
        <h4>증상 내용</h4>
        <strong>제목 :</strong>
        <input
          type="text"
          className="form-control board-title"
          placeholder=""
          defaultValue={props.props.title}
          readOnly="true"
        />
        <strong>증상 :</strong>
        <input
          type="text"
          className="form-control board-pain"
          placeholder=""
          defaultValue={props.props.pain}
          readOnly="true"
        />
      </div>
      <div className="middle-content">
        <h4>인적 사항</h4>
        이름 :
        <input
          type="text"
          className="form-control board-name"
          placeholder=""
          defaultValue={props.props.another.split("@")[0]}
          readOnly="true"
        />
        나이 :
        <input
          type="text"
          className="form-control board-age"
          placeholder=""
          defaultValue={props.props.another.split("@")[1]}
          readOnly="true"
        />
        연락처 :
        <input
          type="text"
          className="form-control board-tel"
          placeholder=""
          defaultValue={props.props.another.split("@")[3]}
          readOnly="true"
        />
        주소 :
        <input
          type="text"
          className="form-control board-addr"
          placeholder=""
          defaultValue={props.props.another.split("@")[4]}
          readOnly="true"
        />
      </div>
      <div className="bottom-content">
        <div className="form-floating">
          <textarea
            className="form-control board-another"
            placeholder="Leave a comment here"
            id="floatingTextarea2"
            style={{ height: 100 }}
            defaultValue={props.props.ano}
            readOnly="true"
          />
          <label htmlFor="floatingTextarea2">특이사항</label>
        </div>
      </div>
      <div className="btn-content">
        <button
          type="button"
          className="btn btn-outline-success board-close"
          onClick={() => {
            ReactDOM.createRoot($(".new-windows")[0]).render();
          }}
        >
          닫기
        </button>
        <button
          type="button"
          className="btn btn-outline-danger board-delete"
          onClick={() => {
            Swal.fire({
              title: `작성글을 삭제 하시겠습니까?\n진단글 수 : ${props.props.fedcount}개`,
              showDenyButton: true,
              showConfirmButton: false,
              showCancelButton: true,
              denyButtonText: `삭제`,
            }).then((result) => {
              if (result.isDenied) {
                fetch("http://175.106.99.31/deleteByNo", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    // 스프링에 전달할 값
                    no: props.props.no,
                  }),
                })
                  .then((response) => response.json())
                  .then((data) => {
                    ReactDOM.createRoot($(".new-windows")[0]).render();
                    return data.status;
                  })
                  .then((status) => {
                    if (status == "success") {
                      Swal.fire({
                        icon: 'success',
                        title: '삭제 완료',
                        width: 400,
                        height: 320,
                        showConfirmButton: false,
                        timer: 750
                      })
                      location.href = ""
                    };
                  });
              }
            })
          }}
        >
          삭제
        </button>
        <button
          type="button"
          className="btn btn-outline-success board-insert"
          onClick={() => {
            fetch("http://175.106.99.31/auth/adminBoard", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                // 스프링에 전달할 값
                no: props.props.no,
                filter: $(".window-check").prop("checked"),
              }),
            })
              .then((response) => response.json())
              .then((data) => {
                ReactDOM.createRoot($(".new-windows")[0]).render();
                return data.status;
              })
              .then((status) => {
                if (status == "success") location.href = "";
              });
          }}
        >
          적용
        </button>
      </div>
    </div>
  );
}

let patientsBoardList = <Pboard props={0} />;

function Dcomm(props) {
  return (
    <div className="new-window">
      <div className="form-check form-switch window-check-cover">
        <label className="form-check-label window-check-text">검증 여부</label>
        <input
          className="form-check-input window-check"
          type="checkbox"
          role="switch"
        />
      </div>
      <div className="top-content">
        <h4>증상 내용</h4>
        <strong>제목 :</strong>
        <input
          type="text"
          className="form-control comm-title"
          placeholder=""
          defaultValue={props.props.title}
          readOnly="true"
        />
      </div>
      <div className="middle-content">
        <h4>인적 사항</h4>
        카테고리 :
        <input
          type="text"
          className="form-control comm-cat"
          placeholder=""
          defaultValue={props.props.category}
          readOnly="true"
        />
        작성자 :
        <input
          type="text"
          className="form-control comm-name"
          placeholder=""
          defaultValue={props.props.doctorName}
          readOnly="true"
        />
        작성일 :
        <input
          type="text"
          className="form-control comm-date"
          placeholder=""
          defaultValue={props.props.createdDate}
          readOnly="true"
        />
      </div>
      <div className="bottom-content">
        <div className="form-floating">
          <textarea
            className="form-control comm-comtent"
            placeholder="Leave a comment here"
            id="floatingTextarea2"
            style={{ height: 100 }}
            defaultValue={props.props.content}
            readOnly="true"
          />
          <label htmlFor="floatingTextarea2">내용</label>
        </div>
      </div>
      <div className="btn-content">
        <button
          type="button"
          className="btn btn-outline-success comm-close"
          onClick={() => {
            ReactDOM.createRoot($(".new-windows")[0]).render();
          }}
        >
          닫기
        </button>
        <button
          type="button"
          className="btn btn-outline-danger comm-delete"
          onClick={() => {
            Swal.fire({
              title: `작성글을 삭제 하시겠습니까?`,
              showConfirmButton: false,
              showDenyButton: true,
              showCancelButton: true,
              denyButtonText: `삭제`,
            }).then((result) => {
              if (result.isDenied) {
                fetch(`http://175.106.99.31/community/${props.props.no}`, {
                  method: "DELETE",
                  headers: {
                    "Content-Type": "application/json",
                  },
                })
                  .then((response) => response.json())
                  .then((data) => {
                    ReactDOM.createRoot($(".new-windows")[0]).render();
                    return data.status;
                  })
                  .then((status) => {
                    if (status == "success") location.href = "";
                  });
              } else {
              }
            })
          }}
        >
          삭제
        </button>
        <button
          type="button"
          className="btn btn-outline-success comm-insert"
          onClick={() => {
            fetch("http://175.106.99.31/auth/adminComm", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                // 스프링에 전달할 값
                no: props.props.no,
                filter: $(".window-check").prop("checked"),
              }),
            })
              .then((response) => response.json())
              .then((data) => {
                ReactDOM.createRoot($(".new-windows")[0]).render();
                return data.status;
              })
              .then((status) => {
                if (status == "success") location.href = "";
              });
          }}
        >
          적용
        </button>
      </div>
    </div>
  );
}
function Dcommc(props) {
  return (
    <div className="new-window">
      <div className="form-check form-switch window-check-cover">
        <label className="form-check-label window-check-text">검증 여부</label>
        <input
          className="form-check-input window-check"
          type="checkbox"
          role="switch"
          defaultChecked="checked"
        />
      </div>
      <div className="top-content">
        <h4>증상 내용</h4>
        <strong>제목 :</strong>
        <input
          type="text"
          className="form-control comm-title"
          placeholder=""
          defaultValue={props.props.title}
          readOnly="true"
        />
      </div>
      <div className="middle-content">
        <h4>인적 사항</h4>
        카테고리 :
        <input
          type="text"
          className="form-control comm-cat"
          placeholder=""
          defaultValue={props.props.category}
          readOnly="true"
        />
        작성자 :
        <input
          type="text"
          className="form-control comm-name"
          placeholder=""
          defaultValue={props.props.doctorName}
          readOnly="true"
        />
        작성일 :
        <input
          type="text"
          className="form-control comm-date"
          placeholder=""
          defaultValue={props.props.createdDate}
          readOnly="true"
        />
      </div>
      <div className="bottom-content">
        <div className="form-floating">
          <textarea
            className="form-control comm-comtent"
            placeholder="Leave a comment here"
            id="floatingTextarea2"
            style={{ height: 100 }}
            defaultValue={props.props.content}
            readOnly="true"
          />
          <label htmlFor="floatingTextarea2">내용</label>
        </div>
      </div>
      <div className="btn-content">
        <button
          type="button"
          className="btn btn-outline-success comm-close"
          onClick={() => {
            ReactDOM.createRoot($(".new-windows")[0]).render();
          }}
        >
          닫기
        </button>
        <button
          type="button"
          className="btn btn-outline-danger comm-delete"
          onClick={() => {
            Swal.fire({
              title: `작성글을 삭제 하시겠습니까?`,
              showConfirmButton: false,
              showDenyButton: true,
              showCancelButton: true,
              denyButtonText: `삭제`,
            }).then((result) => {
              if (result.isDenied) {
                fetch(`http://175.106.99.31/community/${props.props.no}`, {
                  method: "DELETE",
                  headers: {
                    "Content-Type": "application/json",
                  },
                })
                  .then((response) => response.json())
                  .then((data) => {
                    ReactDOM.createRoot($(".new-windows")[0]).render();
                    return data.status;
                  })
                  .then((status) => {
                    if (status == "success") location.href = "";
                  });
              } else {
              }
            })
          }}
        >
          삭제
        </button>
        <button
          type="button"
          className="btn btn-outline-success comm-insert"
          onClick={() => {
            fetch("http://175.106.99.31/auth/adminComm", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                // 스프링에 전달할 값
                no: props.props.no,
                filter: $(".window-check").prop("checked"),
              }),
            })
              .then((response) => response.json())
              .then((data) => {
                ReactDOM.createRoot($(".new-windows")[0]).render();
                return data.status;
              })
              .then((status) => {
                if (status == "success") location.href = "";
              });
          }}
        >
          적용
        </button>
      </div>
    </div>
  );
}
