var tooltipTriggerList = [].slice.call(
  document.querySelectorAll('[data-bs-toggle="tooltip"]')
);
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl);
});

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

const backBtn = document.getElementById("btn_Back");
backBtn.addEventListener("click", () => {
  document.location.href = "/index.html";
});

const newBtn = document.getElementById("btn_New");
newBtn.addEventListener("click", () => {
  document.location.href = "/form.html?mode=new";
});

// const staBtn = document.getElementById("btn_Statistic");
// staBtn.addEventListener("click", () => {
//   document.location.href = "/satistics.html";
// });

// const refreshBtn = document.getElementById("btn_Refresh");
// refreshBtn.addEventListener("click", () => {
//   document.location.reload();
// });

// const delBtn = document.getElementById("btn_Delete");
// delBtn.addEventListener("click", () => {
//   let inpElm = document.getElementsByTagName("input");
//   let delArr = [];

//   for (let i = 0; i < inpElm.length; i++) {
//     if (
//       inpElm[i].id != "chkAll" &&
//       inpElm[i].type == "checkbox" &&
//       inpElm[i].checked == true
//     ) {
//       delArr.push(inpElm[i].value);
//       //console.log(delArr);
//     }
//   }

//   delArr.forEach((record) => {
//     //console.log(record);
//     fetch(
//       "https://api.sheety.co/8f2d0776cec55794d25d35becbdcfc1d/appData/transaction/" +
//         record,
//       {
//         method: "DELETE",
//         headers: {
//           Authorization: "Bearer thisisasecretkeyforthisapi",
//           "Content-Type": "application/json",
//         },
//       }
//     )
//       .then(() => {
//         //console.log('Object deleted');
//         document.location.reload();
//       })
//       .catch((err) => {
//         //alert("There was an error!");
//         console.log(err);
//       });
//   });
// });

fetch(
  "https://api.sheety.co/8f2d0776cec55794d25d35becbdcfc1d/appData/transaction",
  {
    headers: {
      Authorization: "Bearer thisisasecretkeyforthisapi",
      "Content-Type": "application/json",
    },
  }
)
  .then((response) => response.json())
  .then((data) => {
    //alert("Data successfully retrieved!");
    //console.log(data.transaction);
    const dataset = data.transaction;

    dataset.forEach((data, index) => {
      let tableRow = document.createElement("tr");

      let tableDetail0 = document.createElement("td");
      let chkbox = document.createElement("input");
      chkbox.type = "checkbox";
      chkbox.name = "chk_" + index;
      chkbox.id = "chk_" + index;
      chkbox.value = data.id;
      tableDetail0.appendChild(chkbox);
      tableRow.appendChild(tableDetail0);
      //<input type="checkbox" name="chk_0" id="chk_0">

      let tableDetail1 = document.createElement("td");
      tableDetail1.innerText = data.srcBrn;
      tableRow.appendChild(tableDetail1);

      let tableDetail2 = document.createElement("td");
      let trxLink = document.createElement("a");
      trxLink.innerText = data.refNo;
      trxLink.href = "/form.html?mode=edt&trxId=" + data.id;
      tableDetail2.appendChild(trxLink);
      tableRow.appendChild(tableDetail2);

      let tableDetail3 = document.createElement("td");
      tableDetail3.innerText = data.cifName;
      tableRow.appendChild(tableDetail3);

      let tableDetail4 = document.createElement("td");
      tableDetail4.innerText = data.currType;
      tableRow.appendChild(tableDetail4);

      let tableDetail5 = document.createElement("td");
      tableDetail5.innerText = data.lcAmt;
      tableDetail5.className = "text-end";
      tableRow.appendChild(tableDetail5);

      let tableDetail6 = document.createElement("td");
      switch (data.trxStatus) {
        case "FullApp":
          tableDetail6.innerText = "Fully Approved";
          break;
        case "NewReg":
          tableDetail6.innerText = "New Registration";
          break;
        case "RegCan":
          tableDetail6.innerText = "Registration Cancelled";
          break;
      }
      tableDetail6.className = "text-start";
      tableRow.appendChild(tableDetail6);

      let tableDetail7 = document.createElement("td");
      let divDropdown7 = document.createElement("div");
      divDropdown7.className = "dropdown";

      let anchorDetail7 = document.createElement("button");
      anchorDetail7.className = "btn dropdown-toggle";
      anchorDetail7.id = "dropdownMenuLink" + data.id;
      anchorDetail7.setAttribute("type", "button");
      anchorDetail7.setAttribute("data-bs-toggle", "dropdown");
      anchorDetail7.setAttribute("aria-expanded", "false");
      //<button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1"
      // data-bs-toggle="dropdown" aria-expanded="false">
      anchorDetail7.innerText = "Actions";
      let divDetail7 = document.createElement("ul");
      divDetail7.className = "dropdown-menu";
      divDetail7.setAttribute("aria-labelledby", "dropdownMenuLink" + data.id);
      let liDtl7 = document.createElement("li");

      let inqDtl7 = document.createElement("a");
      inqDtl7.innerText = "Inquiry";
      inqDtl7.className = "dropdown-item";
      inqDtl7.href = "/form.html?mode=inq&trxId=" + data.id;
      liDtl7.appendChild(inqDtl7);
      divDetail7.appendChild(liDtl7);

      let edtDtl7 = document.createElement("a");
      edtDtl7.innerText = "Edit";
      edtDtl7.className = "dropdown-item";
      edtDtl7.href = "/form.html?mode=edt&trxId=" + data.id;
      liDtl7.appendChild(edtDtl7);
      divDetail7.appendChild(liDtl7);

      let cpyDtl7 = document.createElement("a");
      cpyDtl7.innerText = "Copy";
      cpyDtl7.className = "dropdown-item";
      cpyDtl7.href = "/form.html?mode=cpy&trxId=" + data.id;
      liDtl7.appendChild(cpyDtl7);
      divDetail7.appendChild(liDtl7);

      let aprDtl7 = document.createElement("a");
      aprDtl7.innerText = "Approve";
      aprDtl7.className = "dropdown-item";
      aprDtl7.href = "/form.html?mode=apr&trxId=" + data.id;
      liDtl7.appendChild(aprDtl7);
      divDetail7.appendChild(liDtl7);

      let delDtl7 = document.createElement("a");
      delDtl7.innerText = "Delete";
      delDtl7.className = "dropdown-item";
      delDtl7.href = "/form.html?mode=del&trxId=" + data.id;
      liDtl7.appendChild(delDtl7);
      divDetail7.appendChild(liDtl7);

      divDropdown7.appendChild(anchorDetail7);
      divDropdown7.appendChild(divDetail7);

      tableDetail7.appendChild(divDropdown7);
      tableRow.appendChild(tableDetail7);

      let tableList = document.getElementById("trxDetail");
      tableList.appendChild(tableRow);
      //console.log(tableRow);
    });
  })
  .catch((err) => {
    //alert("There was an error!");
    console.log(err);
  });
