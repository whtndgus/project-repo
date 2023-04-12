
tbody = document.querySelector('community-list');


fetch('http://localhost:8080/community')
  .then((response) => {
    return response.json();
  })
  .then((obj) => {
    console.log(obj);
    var html = '';
    for (var f of obj.data) {
      html += `<tr>
          <td>${no}</td>
          <td>${title}</td>
          <td>${doctorNo}</td>
          <td>${category}</td>
          <td>${viewCnt}</td>
          <td>${createdDate}</td>
          </tr>\n`;
    }
    tbody.innerHTML = html;
  })
  .catch((err) => {
    alert('서버 요청 오류!');
    console.log(err);
  });
