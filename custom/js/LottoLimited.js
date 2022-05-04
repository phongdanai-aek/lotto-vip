const AddBtn2 =
    `<a type="button" onclick="AddLimitedNumber2(this)" data-bs-target="#AddLimitedNumber2" data-bs-toggle="modal">
        <span class="badge bg-primary-badge">
            <span><i class='bx bx-plus-circle text-primary-btn'></i> 2 ตัว</span>
        </span>
    </a> &nbsp;`,
   AddBtn3 =
    `<a type="button" onclick="AddLimitedNumber3(this)" data-bs-target="#AddLimitedNumber3" data-bs-toggle="modal">
        <span class="badge bg-primary-badge">
            <span><i class='bx bx-plus-circle text-primary-btn'></i> 3 ตัว</span>
        </span>
    </a>`,
  btnDeleteRow2 = '<a type="button" onclick = "deleteRow2(this);"><span class="badge bg-danger"><span><i class="bx bx-trash text-primary-btn"></i></span></span></a>',
  btnDeleteRow3 = '<a type="button" onclick = "deleteRow3(this);"><span class="badge bg-danger"><span><i class="bx bx-trash text-primary-btn"></i></span></span></a>',
  mainTable = document.getElementById("MainTable");

//สร้างตาราง
fetch("./LottoData.json")
  .then((resonse) => resonse.json())
  .then((data) => create_tbody(data));

function create_tbody(detailJson) {
  for (let key in detailJson) {
    // row = Insert แถวที่ Index
    // cusOf = ปิดงวดหรือยัง (0 = ยัง), (1 = ปิดแล้ว)
    // endDate = วันที่ปิดรับแทง
    // col0 = ปุ่มฟังชั่น
    // col1 = รหัสงวด
    // col2 = วันที่งวด
    // col3 = เปิดรับแทง
    // col4 = ปิดรับแทง
    // col5 = หมายเหตุ

    const row = document.getElementById("table-body").insertRow(key),
      col0 = row.insertCell(0),
      col1 = row.insertCell(1),
      col2 = row.insertCell(2),
      col3 = row.insertCell(3),
      col4 = row.insertCell(4),
      col5 = row.insertCell(5)

    col0.innerHTML = AddBtn2 + AddBtn3;
    col1.innerHTML = detailJson[key].LESSON_ID; //รหัสงวด
    const lessonDate = new Date(detailJson[key].LESSON_DATE);
    col2.value = lessonDate;
    col2.innerHTML = ToDD_MM_YYYY(lessonDate);

    const startDate = new Date(detailJson[key].START_DATE); //วันที่งวด
    col3.value = startDate;
    col3.innerHTML = ToDD_MM_YYYY(startDate); //เปิดรับแทง

    const limitedDate = new Date(detailJson[key].LIMIT_DATE_TIME);
    col4.value = limitedDate;
    col4.innerHTML = ToDD_MM_YYYY_HHMMSS(limitedDate); //ปิดรับแทง
    col5.innerHTML = detailJson[key].REMARKS; //หมายเหตุ
  }
}

function ToDD_MM_YYYY(dtm) {
  return (`${padTo2Digits(dtm.getDate())}/${padTo2Digits(dtm.getMonth() + 1)}/${dtm.getFullYear()}`);
}

function ToDD_MM_YYYY_HHMMSS(dtm) {
  return (`${padTo2Digits(dtm.getDate())}/${padTo2Digits(dtm.getMonth() + 1)}/${dtm.getFullYear()} ${padTo2Digits(dtm.getHours())}:${padTo2Digits(dtm.getMinutes())}`);
}

function toLocalDate(dtm) {
  return (`${dtm.getFullYear()}-${padTo2Digits(dtm.getMonth() + 1)}-${padTo2Digits(dtm.getDate())}`);
}

function toLocalDateTime(dtm) {
  return (`${dtm.getFullYear()}-${padTo2Digits(dtm.getMonth() + 1)}-${padTo2Digits(dtm.getDate())}T${padTo2Digits(dtm.getHours())}:${padTo2Digits(dtm.getMinutes())}`);
}

function padTo2Digits(num) {
  return num.toString().padStart(2, "0");
}

function create(htmlStr) {
  var frag = document.createDocumentFragment(),
      temp = document.createElement("div");

  temp.innerHTML = htmlStr;

  while (temp.firstChild) {
    frag.appendChild(temp.firstChild);
  }
  return frag;
}

let lessonActive2 = "";

function AddLimitedNumber2(rowActive){
  let row = rowActive.parentNode.parentNode;
  lessonActive2 = mainTable.rows[row.rowIndex].cells[1].innerHTML;
}

function clickAdd2(){
  const tBody = document.getElementById("NumberTable2").getElementsByTagName("TBODY")[0];//e.options[e.selectedIndex].value
  const selectType = document.getElementById("LimitType2")
  let inputNumber = document.getElementById("2Limit").value;

  if(!inputNumber){
    return false;
  }
  
  let typeValue = selectType.options[selectType.selectedIndex].value;
  let typetext = selectType.options[selectType.selectedIndex].innerHTML;

  row = tBody.insertRow(-1);
  let cell0 = row.insertCell(0);//LESSON_ID
  let cell1 = row.insertCell(1);//LOTTO_NUMBER
  let cell2 = row.insertCell(2);//TYPE
  let cell3 = row.insertCell(3);//Delete btn

  cell0.setAttribute("hidden", true);
  cell0.value = lessonActive2;
  cell1.value = inputNumber;
  cell1.innerHTML = inputNumber;
  cell1.align = "center";
  cell2.value = typeValue;
  cell2.innerHTML = typetext;
  cell2.align = "center";
  cell3.innerHTML = btnDeleteRow2;
  cell3.align = "right";
  document.getElementById("2Limit").value = '';
}

function deleteRow2(rowActive){
  let row = rowActive.parentNode.parentNode;
  let table = document.getElementById("NumberTable2");
  table.deleteRow(row.rowIndex);
}

let lessonActive3 = "";

function AddLimitedNumber3(rowActive){
  let row = rowActive.parentNode.parentNode;
  lessonActive3 = mainTable.rows[row.rowIndex].cells[1].innerHTML;
}

function clickAdd3(){
  const tBody = document.getElementById("NumberTable3").getElementsByTagName("TBODY")[0];//e.options[e.selectedIndex].value
  const selectType = document.getElementById("LimitType3")
  let inputNumber = document.getElementById("3Limit").value;

  if(!inputNumber){
    return false;
  }

  let typeValue = selectType.options[selectType.selectedIndex].value;
  let typetext = selectType.options[selectType.selectedIndex].innerHTML;

  row = tBody.insertRow(-1);
  let cell0 = row.insertCell(0);//LESSON_ID
  let cell1 = row.insertCell(1);//LOTTO_NUMBER
  let cell2 = row.insertCell(2);//TYPE
  let cell3 = row.insertCell(3);//Delete btn

  cell0.setAttribute("hidden", true);
  cell0.value = lessonActive3;
  cell1.value = inputNumber;
  cell1.innerHTML = inputNumber;
  cell1.align = "center";
  cell2.value = typeValue;
  cell2.innerHTML = typetext;
  cell2.align = "center";
  cell3.innerHTML = btnDeleteRow2;
  cell3.align = "right";
  document.getElementById("3Limit").value = '';
}

function deleteRow3(rowActive){
  let row = rowActive.parentNode.parentNode;
  let table = document.getElementById("NumberTable3");
  table.deleteRow(row.rowIndex);
}