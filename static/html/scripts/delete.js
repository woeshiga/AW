function del(e) {
  let usr_id = $("#id_del").val();
  $.ajax({
    url: `${cfg.HOST}${cfg.PORT}${cfg.DELETE_USER_PATH}?id=${usr_id}&token=${localStorage.getItem("token")}`,
    type: "DELETE",
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
  });
}

function sets(e) {
  
}
