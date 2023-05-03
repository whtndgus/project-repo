const tooltipTriggerList = document.querySelectorAll(
  '[data-bs-toggle="tooltip"]'
);
const tooltipList = [...tooltipTriggerList].map(
  (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
);

class Ptr extends React.Component {
  constructor(props) {
    super(props);
    props = props.props;
    this.state = props;
  }
  render() {
    return (
      <tr onClick={() => {}}>
        <th>{this.state.id}</th>
        <td>{this.state.name}</td>
        <td>{this.state.drug}</td>
        <td>{this.state.phy}</td>
      </tr>
    );
  }
}

class Dtr extends React.Component {
  constructor(props) {
    super(props);
    props = props.props;
    this.state = props;
  }
  render() {
    if (this.state.check) {
      return (
        <tr onClick={() => {}}>
          <th>{this.state.id}</th>
          <td>{this.state.name}</td>
          <td>
            <button
              type="button"
              className="btn btn-outline-success"
              style={{ width: 50, height: 25, padding: 0, fontSize: "70%" }}
              onClick={() => {
                ReactDOM.createRoot($(".new-windows")[0]).render(
                  //<div className="new-windows border border-2">
                  this.state.licenseList
                  //</div>
                );
              }}
            >
              증명
            </button>
          </td>
          <td>{this.state.hosName}</td>
        </tr>
      );
    } else {
      return (
        <tr onClick={() => {}}>
          <th>{this.state.id}</th>
          <td>{this.state.name}</td>
          <td>
            <button
              type="button"
              className="btn btn-outline-danger"
              style={{ width: 50, height: 25, padding: 0, fontSize: "70%" }}
              onClick={() => {
                ReactDOM.createRoot($(".new-windows")[0]).render(
                  //<div className="new-windows border border-2">
                  this.state.licenseList
                  //</div>
                );
              }}
            >
              증명필요
            </button>
          </td>
          <td>{this.state.hosName}</td>
        </tr>
      );
    }
  }
}
let myno = 0;
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
      myno = user.no;
    } else {
      location.href = "index.html";
    }
  });

fetch("http://175.106.99.31/patients")
  .then((response) => response.json())
  .then((data) => {
    let patients = [];
    data.data.forEach((patient) => {
      patient.id = patient.id.substring(0, 2) + "**" + patient.id.slice(-2);
      patients.push(<Ptr props={patient} />);
    });
    return patients;
  })
  .then((list) => {
    ReactDOM.createRoot($(".patients-members")[0]).render(list);
  });

fetch("http://175.106.99.31/doctors")
  .then((response) => response.json())
  .then((data) => {
    let doctors = [];
    data.data.forEach((doctor) => {
      doctor.check = false;
      let liList = [];
      console.log(doctor);
      doctor.id = doctor.id.substring(0, 2) + "**" + doctor.id.slice(-2);
      doctor.licenses.forEach((license) => {
        license.fname = license.licensename.split(" ")[0];
        license.sname = license.licensename.split(" ")[1];
        if (license.licenseOx) {
          doctor.check = true;
          liList.push(<Doclic props={license} />);
        } else {
          liList.push(<Docli props={license} />);
        }
      });
      doctor.licenseList = <DocList props={liList} />;
      doctors.push(<Dtr props={doctor} />);
    });
    return doctors;
  })
  .then((list) => {
    ReactDOM.createRoot($(".doctors-members")[0]).render(list);
  });

function DocList(props) {
  return (
    <div className="new-window">
      <h2>면허/자격증 리스트</h2>
      <ul className="list-group doctor-licence-list">{props.props}</ul>
      <div className="btn-content">
        <button
          type="button"
          className="btn btn-primary license-close"
          onClick={() => {
            ReactDOM.createRoot($(".new-windows")[0]).render();
          }}
        >
          닫기
        </button>
      </div>
    </div>
  );
}

function Docli(props) {
  return (
    <li className="list-group-item">
      <span className="license-first">{props.props.fname}</span>
      <span className="license-second">{props.props.sname}</span>
      <span className="license-filename">{props.props.phoFilename}</span>
      <span className="license-download">
        <a
          href={
            "https://kr.object.ncloudstorage.com/study-bucket/license-img/" +
            props.props.licensePhoto
          }
          download="true"
          target="_blank"
        >
          <button type="button" className="btn btn-outline-info">
            다운로드
          </button>
        </a>
      </span>
      <span className="license-check">
        <button
          type="button"
          className="btn btn-outline-danger"
          onClick={() => {
            fetch("http://175.106.99.31/doctors/changeLicenseCheck", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                // 스프링에 전달할 값
                dno: props.props.doctorNo,
                lno: props.props.licenseNo,
                filter: true,
              }),
            }).then(() => {
              location.href = "";
            });
          }}
        >
          자격증명필요
        </button>
      </span>
    </li>
  );
}
function Doclic(props) {
  return (
    <li className="list-group-item">
      <span className="license-first">{props.props.fname}</span>
      <span className="license-second">{props.props.sname}</span>
      <span className="license-filename">{props.props.phoFilename}</span>
      <span className="license-download">
        <a
          href={
            "https://kr.object.ncloudstorage.com/study-bucket/license-img/" +
            props.props.licensePhoto
          }
          download="true"
          target="_blank"
        >
          <button type="button" className="btn btn-outline-info">
            다운로드
          </button>
        </a>
      </span>
      <span className="license-check">
        <button
          type="button"
          className="btn btn-outline-success"
          onClick={() => {
            fetch("http://175.106.99.31/doctors/changeLicenseCheck", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                // 스프링에 전달할 값
                dno: props.props.doctorNo,
                lno: props.props.licenseNo,
                filter: false,
              }),
            }).then(() => {
              location.href = "";
            });
          }}
        >
          자격증명필요
        </button>
      </span>
    </li>
  );
}
