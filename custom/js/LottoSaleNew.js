lessonTitleWarning("LT2204-0007", "02/05/2022", "02/05/2022 13:30", "หวยไทย");

//Load
document.getElementById("2U-Group").style.display = "none";
document.getElementById("2D-Group").style.display = "none";
document.getElementById("2SWICTH-Group").style.display = "none";
document.getElementById("3U-Group").style.display = "none";
document.getElementById("3T-Group").style.display = "none";
document.getElementById("3U6-Group").style.display = "none";

let billDetail = 1;

//ยอดรวม
let total_qty = 0;

//Json ข้อมูลเลขอั้น
const jsonLimited =
  '[{"LOTTO_NUMBER": "95","PAYMENT_P": "50"},{"LOTTO_NUMBER": "675","PAYMENT_P": "0"},{"LOTTO_NUMBER": "576","PAYMENT_P": "0"},{"LOTTO_NUMBER": "60","PAYMENT_P": "0"},{"LOTTO_NUMBER": "55","PAYMENT_P": "45"},{"LOTTO_NUMBER": "112","PAYMENT_P": "0"}]',
limitedData = JSON.parse(jsonLimited),
btnDeleteRow = '<a type="button" onclick = "deleteRow(this);"><span class="badge bg-danger"><span><i class="bx bx-trash text-primary-btn"></i></span></span></a>';
;
//console.log(limitedData);

//อัตตราจ่าย
let paymentP = 100;
let paymentStr = "เต็ม";

//ตอนคีย์ หวยที่ซื้อ
function loto_number_change() {
  let lotto_input = document.getElementById("LOTTO_NUMBER").value;
  let group_two_up = document.getElementById("2U-Group");
  let group_two_down = document.getElementById("2D-Group");
  let group_two_swicth = document.getElementById("2SWICTH-Group");
  let group_tree_up = document.getElementById("3U-Group");
  let group_tree_tose = document.getElementById("3T-Group");
  let group_tree_six = document.getElementById("3U6-Group");

  paymentP = lottoLimitedCheck(limitedData, lotto_input.toString());
  //console.log(paymentP);

  if (paymentP === 100) {
    document.getElementById("textLimited").innerHTML = "";
    paymentStr = "เต็ม";
  } else if (paymentP === 0) {
    document.getElementById("textLimited").innerHTML =
      lotto_input + " ไม่รับแทง";
    lotto_input = "";
  } else if (paymentP === 50) {
    document.getElementById("textLimited").innerHTML =
      lotto_input + " จ่ายครึ่ง";
    paymentStr = "ครึ่ง";
  } else {
    document.getElementById("textLimited").innerHTML =
      lotto_input + " จ่าย (" + paymentP + "%)";
    paymentStr = paymentP + "%";
  }

  if (lotto_input.length === 2) {
    group_two_up.style.display = "block";
    group_two_down.style.display = "block";
    group_two_swicth.style.display = "block";
    group_tree_up.style.display = "none";
    group_tree_tose.style.display = "none";
    group_tree_six.style.display = "none";

    document.getElementById("3U").value = "";
    document.getElementById("3T").value = "";
    document.getElementById("3U6").value = "";
  } else if (lotto_input.length === 3) {
    group_two_up.style.display = "none";
    group_two_down.style.display = "none";
    group_two_swicth.style.display = "none";
    group_tree_up.style.display = "block";
    group_tree_tose.style.display = "block";
    group_tree_six.style.display = "block";

    document.getElementById("2U").value = "";
    document.getElementById("2D").value = "";
    document.getElementById("2SWICTH").value = "";
  } else if (lotto_input.length > 3) {
    let lotto_split = lotto_input.toString().split("");
    document.getElementById("LOTTO_NUMBER").value =
      lotto_split[0] + lotto_split[1] + lotto_split[2];
    document.getElementById("3U").value = "";
    document.getElementById("3T").value = "";
    document.getElementById("3U6").value = "";
    document.getElementById("2U").value = "";
    document.getElementById("2D").value = "";
    document.getElementById("2SWICTH").value = "";
  } else {
    group_two_up.style.display = "none";
    group_two_down.style.display = "none";
    group_two_swicth.style.display = "none";
    group_tree_up.style.display = "none";
    group_tree_tose.style.display = "none";
    group_tree_six.style.display = "none";

    document.getElementById("3U").value = "";
    document.getElementById("3T").value = "";
    document.getElementById("3U6").value = "";
    document.getElementById("2U").value = "";
    document.getElementById("2D").value = "";
    document.getElementById("2SWICTH").value = "";
  }
}

// Click Add Button

function clickAdd() {
    addDetail().then(() => { 
        CalculateSummary();       
        document.getElementById("LOTTO_NUMBER").value = "";
        document.getElementById("2U").value = "";
        document.getElementById("2D").value = "";
        document.getElementById("2SWICTH").value = "";
        document.getElementById("3U").value = "";
        document.getElementById("3T").value = "";
        document.getElementById("3U6").value = "";
        document.getElementById("2U-Group").style.display = "none";
        document.getElementById("2D-Group").style.display = "none";
        document.getElementById("2SWICTH-Group").style.display = "none";
        document.getElementById("3U-Group").style.display = "none";
        document.getElementById("3T-Group").style.display = "none";
        document.getElementById("3U6-Group").style.display = "none";
      
    });
};

function CalculateSummary(){
  document.getElementById("TOTOL_QTY").value = total_qty;
  let discount_p = 0,
  discount = 0,
  net_total_qty = 0,
  receive_qty = 0,
  balance_qty = 0;

  if(document.getElementById("DISCOUNT_P").value){
    discount_p = parseInt(document.getElementById("DISCOUNT_P").value)
  }
  if(document.getElementById("RECEIVE_QTY").value){
    receive_qty = parseInt(document.getElementById("RECEIVE_QTY").value)
  }

  if(discount_p > 0 && total_qty >= 100){
    let calTotal = total_qty;
    while (calTotal >= 100)
    {
        discount = discount + discount_p;
        calTotal = calTotal - 100;
    }
  }

  net_total_qty = total_qty - discount;
  balance_qty = (total_qty - discount) - receive_qty;

  document.getElementById("DISCOUNT").value = discount;
  document.getElementById("NET_TOTOL_QTY").value = net_total_qty;
  document.getElementById("BALANCE_QTY").value = balance_qty;

}

function AddRow(lottoNumber, lottoTypeID, lottoTypeNM, lottoQty, paymentValue, Paymenttext) {
  //Get the reference of the Table's TBODY element.
  let tBody = document
    .getElementById("MainTable")
    .getElementsByTagName("TBODY")[0];

  //insertRow(-1) = Next Row
  row = tBody.insertRow(-1);
  
  let cell0 = row.insertCell(0);//BILL_D_ID
  let cell1 = row.insertCell(1);//LOTTO_NUMBER
  let cell2 = row.insertCell(2);//LOTTO_ID
  let cell3 = row.insertCell(3);//QTY
  let cell4 = row.insertCell(4);//PAYMENT_P
  let cell5 = row.insertCell(5);//ปุ่มลบ

  cell0.setAttribute("hidden", true);
  cell0.value = billDetail.toString().padStart(6,'0');  
  billDetail ++;

  cell1.value = lottoNumber;//LOTTO_NUMBER
  cell1.innerHTML = lottoNumber;

  cell2.value = lottoTypeID;//LOTTO_ID
  cell2.innerHTML = lottoTypeNM;
  
  cell3.value = lottoQty;//QTY
  cell3.innerHTML = lottoQty;
  
  cell4.value = paymentValue;//PAYMENT_P
  cell4.innerHTML = Paymenttext;
  
  cell5.innerHTML = btnDeleteRow;
  cell5.align = "right";//ปุ่มลบ

  // let btnRemove = document.createElement("INPUT");
  // btnRemove.type = "button";
  // btnRemove.value = "ลบ";
  // btnRemove.setAttribute("onclick", "deleteRow(this);");
  // cell5.appendChild(btnRemove);  
}

async function deleteRow(rowActive) {  
  await deleteProcess(rowActive)
  CalculateSummary();
}

function deleteProcess(rowActive){
  let row = rowActive.parentNode.parentNode;
  let table = document.getElementById("MainTable");

  // console.log("BILL_D_ID = " + table.rows[row.rowIndex].cells[0].value)
  // console.log("LOTTO_NUMBER = " + table.rows[row.rowIndex].cells[1].value)
  // console.log("LOTTO_ID = " + table.rows[row.rowIndex].cells[2].value)
  // console.log("QTY = " + table.rows[row.rowIndex].cells[3].value)
  // console.log("PAYMENT_P = " + table.rows[row.rowIndex].cells[4].value)

  total_qty -= parseInt(table.rows[row.rowIndex].cells[3].value);
  table.deleteRow(row.rowIndex);
}

function toInt(myId) {
  let intValue = parseInt(document.getElementById(myId).value);
  //console.log(intValue);
  document.getElementById(myId).value = intValue;
}

//กลับเลข 3 ตัวจนครบ Promise, resolve = array
function TreeSixArray(loto_array) {
  let tree_six_array = [];
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      for (let k = 0; k < 3; k++) {
        if (i !== j && j !== k && i !== k) {
          if (
            tree_six_array.indexOf(
              loto_array[i].toString() +
                loto_array[j].toString() +
                loto_array[k].toString()
            ) < 0
          ) {
            tree_six_array.push(
              loto_array[i].toString() +
                loto_array[j].toString() +
                loto_array[k].toString()
            );
          }
        }
      }
    }
  }
  return new Promise((resolve, reject) => {
    resolve(tree_six_array);
  });
}

function addDetail() {
  let lotto_input = document.getElementById("LOTTO_NUMBER").value;
  let loto_array = lotto_input.split("");
  document.getElementById("textLimited").innerHTML = "";
  if (!lotto_input) {
    return new Promise((resolve, reject) => {
        resolve(true);
      });
  } else {
    let two_up = document.getElementById("2U").value;
    let two_down = document.getElementById("2D").value;
    let two_swicth = document.getElementById("2SWICTH").value;
    let tree_up = document.getElementById("3U").value;
    let tree_tose = document.getElementById("3T").value;
    let tree_six = document.getElementById("3U6").value;

    if (parseInt(two_up) > 0) {
      AddRow(lotto_input,"2U", "2 ตัวบน", parseInt(two_up), paymentP, paymentStr);
      total_qty += parseInt(two_up);
    }
    if (parseInt(two_down) > 0) {
      AddRow(lotto_input, "2D", "2 ตัวล่าง", parseInt(two_down), paymentP, paymentStr);
      total_qty += parseInt(two_down);
    }
    if (parseInt(two_swicth) > 0) {
      let lottoSwicth = loto_array[1] + loto_array[0];
      AddRow(lotto_input,"2U", "2 ตัวบน", parseInt(two_swicth), paymentP, paymentStr);
      total_qty += parseInt(two_swicth);
      AddRow(lotto_input, "2D", "2 ตัวล่าง", parseInt(two_swicth), paymentP, paymentStr);
      total_qty += parseInt(two_swicth);

      if (lottoSwicth != lotto_input) {
        let limitedWorning = "";

        paymentP = lottoLimitedCheck(limitedData, lottoSwicth);
        let addOrNot = true;
        if (paymentP === 100) {
          paymentStr = "เต็ม";
          addOrNot = true;
        } else if (paymentP === 50) {
          paymentStr = "ครึ่ง";
          addOrNot = true;
        } else if (paymentP === 0) {
          addOrNot = false;

          if (limitedWorning != "") {
            limitedWorning += ", ";
          }
          limitedWorning += lottoSwicth;
        } else {
          paymentStr = paymentP + "%";
          addOrNot = true;
        }

        if (addOrNot === true) {
          AddRow(lottoSwicth, "2D", "2 ตัวบน", parseInt(two_swicth), paymentP, paymentStr);
          total_qty += parseInt(two_swicth);
          AddRow(lottoSwicth, "2D", "2 ตัวล่าง", parseInt(two_swicth), paymentP, paymentStr);
          total_qty += parseInt(two_swicth);
        } else {
          skipLimitedWarning(limitedWorning);
        }
      }
    }
    if (parseInt(tree_up) > 0) {
      AddRow(lotto_input, "3U", "3 ตัวตรง", parseInt(tree_up), paymentP, paymentStr);
      total_qty += parseInt(tree_up);
    }
    if (parseInt(tree_tose) > 0) {
      AddRow(lotto_input, "3T", "3 ตัวโต๊ด", parseInt(tree_tose), paymentP, paymentStr);
      total_qty += parseInt(tree_tose);
    }
    if (parseInt(tree_six) > 0) {
      TreeSixArray(loto_array).then((tree_six_array) => {
        let limitedWorning = "";
        tree_six_array.forEach((element) => {
          paymentP = lottoLimitedCheck(limitedData, element);
          let addOrNot = true;
          if (paymentP === 100) {
            paymentStr = "เต็ม";
            addOrNot = true;
          } else if (paymentP === 50) {
            paymentStr = "ครึ่ง";
            addOrNot = true;
          } else if (paymentP === 0) {
            addOrNot = false;

            if (limitedWorning != "") {
              limitedWorning += ", ";
            }
            limitedWorning += element;
          } else {
            paymentStr = paymentP + "%";
            addOrNot = true;
          }

          if (addOrNot === true) {
            AddRow(element,"3U", "3 ตัวตรง", parseInt(tree_six), paymentP, paymentStr);
            total_qty += parseInt(tree_six);
          }
        });

        if (limitedWorning != "") {
          skipLimitedWarning(limitedWorning);
        }
      });
    }
  }
    return new Promise((resolve, reject) => {
      resolve(true);
    });
  }

function skipLimitedWarning(lottoLimitedNo) {
  let getMode = localStorage.getItem("mode");
  let bodyColor = "#fff";

  if (getMode == "dark-mode") {
    bodyColor = "#252525";
  }

  let Meldungstext = '<p class="Swal2-title mb-1">' + lottoLimitedNo + "</p>";

  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-primary btn-src",
    },
    buttonsStyling: false,
  });

  swalWithBootstrapButtons.fire({
    title: "<h5>ไม่รับแทง!</h5>",
    html: Meldungstext,
    icon: "error",
    background: bodyColor,
    confirmButtonText: "ปิด",
  });
}

function lessonTitleWarning(lassonId, lassonDate, endDate, remarksText) {
  let getMode = localStorage.getItem("mode");
  let bodyColor = "#fff";

  if (getMode == "dark-mode") {
    bodyColor = "#252525";
  }

  let Meldungstext = "";
  Meldungstext =
    Meldungstext +
    '<p class="text-p-bold mb-1">วันที่งวด : <span class="text-p">' +
    lassonDate +
    "</span></p>";
  Meldungstext =
    Meldungstext +
    '<p class="text-p-bold mb-1">เปิดขายถึงเวลา : <span class="text-p">' +
    endDate +
    "</span></p>";
  Meldungstext =
    Meldungstext +
    '<p class="text-p-bold mb-1">หมายเหตุ : <span class="text-p">' +
    remarksText +
    "</span></p>";

  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-primary btn-src",
    },
    buttonsStyling: false,
  });

  swalWithBootstrapButtons.fire({
    title: "<h5>" + lassonId + "</h5>",
    html: Meldungstext,
    icon: "info",
    background: bodyColor,
    confirmButtonText: "ปิด",
  });
}
