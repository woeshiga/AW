$(function() {
  $("#statusBtn").click(function() {
    let usr_id = $("#id_status").val();
    let status = $("#status").val();
    // console.log(cfg);
    alert(`${cfg.HOST}${cfg.PORT}${cfg.SET_USER_STATUS_PATH_DEFAULT}?id=${usr_id}&token=${localStorage.getItem("token")}?status=${status}`);
    $.ajax({
      url: `${cfg.HOST}${cfg.PORT}${cfg.SET_USER_STATUS_PATH_DEFAULT}?id=${usr_id}&token=${localStorage.getItem("token")}?status=${status}`,
      type: "UPDATE",
      responseType: "application/json"
    })
    .done(function (resp) {
      const data = JSON.parse(resp);
      if (data.status == "OK") {
        alert(data.message);
        window.location.reload();
      } else {
        alert(data.error);
      }
    })
    .fail(function () {
      alert("Update error!");
    });
  });

  $.ajax({
    url: `${cfg.HOST}${cfg.PORT}${cfg.GET_USERS_PATH}?token=${localStorage.getItem("token")}`,
    type: "GET",
    responseType: "application/json"
  })
  .done(function(resp) {
    const data = JSON.parse(resp);
    console.log(data);
    if (data.status == "OK") {
      let usrTable = $("<td class='usersTable'></td>").attr({cellpadding: 2, cellspacing: 2, border: 1});
      usrTable.append("<tr><th>ID</th><th>Login</th><th>Status</th></tr>")
      data.data.forEach(user => {
        let usrRow = $("<tr id='"+user.id+"'></tr>");
        usrRow.append("<td>"+user.id+"</td><td>"+user.login+"</td><td>"+user.status+"</td>")
        usrTable.append(usrRow);
      });
      $("main").append(usrTable);
    } else {
      alert(data.error);
    }
  });
});
