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

const newBtn = document.getElementById("btn_New");
newBtn.addEventListener("click", () => {
  document.location.href = "/form.html";
});

const staBtn = document.getElementById("btn_Statistic");
staBtn.addEventListener("click", () => {
  document.location.href = "/satistics.html";
});

const refreshBtn = document.getElementById("btn_Refresh");
refreshBtn.addEventListener("click", () => {
  document.location.reload();
});

fetch(
  "https://api.sheety.co/d291cbf8645a5a9b69ebbd3f71080f59/mockData/transaction",
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
      trxLink.href = "/form.html?trxId=" + data.id;
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

      let tableList = document.getElementById("trxDetail");
      tableList.appendChild(tableRow);
      //console.log(tableRow);
    });
  })
  .catch((err) => {
    //alert("There was an error!");
    console.log(err);
  });

const delBtn = document.getElementById("btn_Delete");
delBtn.addEventListener("click", () => {
  let inpElm = document.getElementsByTagName("input");
  let delArr = [];

  for (let i = 0; i < inpElm.length; i++) {
    if (
      inpElm[i].id != "chkAll" &&
      inpElm[i].type == "checkbox" &&
      inpElm[i].checked == true
    ) {
      delArr.push(inpElm[i].value);
      //console.log(delArr);
    }
  }

  delArr.forEach((record) => {
    //console.log(record);
    fetch(
      "https://api.sheety.co/d291cbf8645a5a9b69ebbd3f71080f59/mockData/transaction/" +
        record,
      {
        method: "DELETE",
        headers: {
          Authorization: "Bearer thisisasecretkeyforthisapi",
          "Content-Type": "application/json",
        },
      }
    )
      .then(() => {
        //console.log('Object deleted');
        document.location.reload();
      })
      .catch((err) => {
        //alert("There was an error!");
        console.log(err);
      });
  });
});
