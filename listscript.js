const chkAll = document.getElementById("chkAll");
chkAll.addEventListener("click", () => {
  let inpElm = document.getElementsByTagName("input");
  for (let i = 0; i < inpElm.length; i++) {
    if (inpElm[i].id != "chkAll" && inpElm[i].type == "checkbox") {
      if (inpElm[i].checked == false) {
        inpElm[i].checked = true;
      } else {
        inpElm[i].checked = false;
      }
    }
  }
});
