const urlParams = new URLSearchParams(window.location.search);
const trxId = urlParams.get("trxId");
const mode = urlParams.get("mode");
//console.log(trxId);

//if (trxId === null) {
switch (mode) {
  case "new":
    document.getElementById("btn_Add").style.display = "";
    document.getElementById("btn_Save").style.display = "none";
  case "inq":
    document.getElementById("btn_Add").style.display = "none";
    document.getElementById("btn_Save").style.display = "none";
  case "edt":
    document.getElementById("btn_Add").style.display = "";
    document.getElementById("btn_Save").style.display = "none";
  case "cpy":
    document.getElementById("btn_Add").style.display = "none";
    document.getElementById("btn_Save").style.display = "";
  case "del":
    document.getElementById("btn_Add").style.display = "none";
    document.getElementById("btn_Save").style.display = "none";
  case "apr":
    document.getElementById("btn_Add").style.display = "none";
    document.getElementById("btn_Save").style.display = "none";
}
//}

const addBtn = document.getElementById("btn_Add");
addBtn.addEventListener("click", () => {
  const refNo = document.getElementById("refNo").value;
  const cifNo = document.getElementById("cifNo").value;
  const cifName = document.getElementById("cifName").value;
  const srcBrn = document.getElementById("srcBrn_Slt").value;
  const prcBrn = document.getElementById("prcBrn_Slt").value;
  const refType = document.getElementById("refType").value;

  const lcType = document.getElementById("lcType").value;
  const docIndex = document.getElementById("docIndex").value;
  const appDate = document.getElementById("appDate").value;
  const appRcpDate = document.getElementById("appRcpDate").value;
  const issDate = document.getElementById("issDate").value;
  const expDate = document.getElementById("expDate").value;
  const currType = document.getElementById("currType").value;
  const lcAmt = document.getElementById("lcAmt").value;

  const data = {
    transaction: {
      refNo: refNo,
      cifNo: cifNo,
      cifName: cifName,
      srcBrn: srcBrn,
      prcBrn: prcBrn,
      refType: refType,
      lcType: lcType,
      docIndex: docIndex,
      appDate: appDate,
      appRcpDate: appRcpDate,
      issDate: issDate,
      expDate: expDate,
      currType: currType,
      lcAmt: lcAmt,
      trxStatus: "NewReg",
    },
  };

  fetch(
    "https://api.sheety.co/8f2d0776cec55794d25d35becbdcfc1d/appData/transaction/",
    {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        Authorization: "Bearer thisisasecretkeyforthisapi",
        "Content-Type": "application/json",
      },
    }
  )
    .then((response) => response.json())
    .then((data) => {
      //alert("Data successfully added!");
      document.location.href = "/list.html";
      //console.log(data);
    })
    .catch((err) => {
      //alert("There was an error!");
      console.log(err);
    });
});

const saveBtn = document.getElementById("btn_Save");
saveBtn.addEventListener("click", () => {
  const lcType = document.getElementById("lcType").value;
  const docIndex = document.getElementById("docIndex").value;
  const appDate = document.getElementById("appDate").value;
  const appRcpDate = document.getElementById("appRcpDate").value;
  const issDate = document.getElementById("issDate").value;
  const expDate = document.getElementById("expDate").value;
  const currType = document.getElementById("currType").value;
  const lcAmt = document.getElementById("lcAmt").value;

  const data = {
    transaction: {
      lcType: lcType,
      docIndex: docIndex,
      appDate: appDate,
      appRcpDate: appRcpDate,
      issDate: issDate,
      expDate: expDate,
      currType: currType,
      lcAmt: lcAmt,
    },
  };

  fetch(
    "https://api.sheety.co/8f2d0776cec55794d25d35becbdcfc1d/appData/transaction/" +
      trxId,
    {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        Authorization: "Bearer thisisasecretkeyforthisapi",
        "Content-Type": "application/json",
      },
    }
  )
    .then((response) => response.json())
    .then((data) => {
      //alert("Data successfully added!");
      document.location.href = "/list.html";
      //console.log(data);
    })
    .catch((err) => {
      alert("There was an error!");
      console.log(err);
    });
});

const backBtn = document.getElementById("btn_Back");
backBtn.addEventListener("click", () => {
  document.location.href = "/list.html";
});

if (trxId !== null) {
  fetch(
    "https://api.sheety.co/8f2d0776cec55794d25d35becbdcfc1d/appData/transaction/" +
      trxId,
    {
      headers: {
        Authorization: "Bearer thisisasecretkeyforthisapi",
        "Content-Type": "application/json",
      },
    }
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data.transaction);
      const dataset = data.transaction;

      document.getElementById("refNo").value = dataset.refNo;
      document.getElementById("refNo").disabled = true;

      document.getElementById("cifNo").value = dataset.cifNo;
      document.getElementById("cifNo").disabled = true;

      document.getElementById("cifName").value = dataset.cifName;
      document.getElementById("cifName").disabled = true;

      document.getElementById("srcBrn_Slt").value = dataset.srcBrn;
      document.getElementById("srcBrn_Slt").disabled = true;

      document.getElementById("prcBrn_Slt").value = dataset.prcBrn;
      document.getElementById("prcBrn_Slt").disabled = true;

      document.getElementById("prcBrn_Slt").value = dataset.prcBrn;
      document.getElementById("prcBrn_Slt").disabled = true;

      document.getElementById("refType").value = dataset.refType;
      document.getElementById("refType").disabled = true;

      document.getElementById("refType").value = dataset.refType;
      document.getElementById("refType").disabled = true;

      if (mode == "inq" || mode == "del" || mode == "apr") {
        document.getElementById("lcType").disabled = true;
        document.getElementById("docIndex").disabled = true;
        document.getElementById("appDate").disabled = true;
        document.getElementById("appRcpDate").disabled = true;
        document.getElementById("issDate").disabled = true;
        document.getElementById("expDate").disabled = true;
        document.getElementById("currType").disabled = true;
        document.getElementById("lcAmt").disabled = true;
      }

      document.getElementById("lcType").value = dataset.lcType;
      document.getElementById("docIndex").value = dataset.docIndex;
      document.getElementById("appDate").value = dataset.appDate;
      document.getElementById("appRcpDate").value = dataset.appRcpDate;
      document.getElementById("issDate").value = dataset.issDate;
      document.getElementById("expDate").value = dataset.expDate;
      document.getElementById("currType").value = dataset.currType;
      document.getElementById("lcAmt").value = dataset.lcAmt;
    })
    .catch((err) => {
      alert("There was an error!");
      console.log(err);
    });
}
