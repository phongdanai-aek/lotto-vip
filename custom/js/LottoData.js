const waitStatus =
    `<a type="button" onclick="setValueViewMode(this)" data-bs-target="#ModalView" data-bs-toggle="modal">
        <span class="badge bg-primary">
            <span><i class='bx bxs-hourglass text-primary-btn'></i></span>
        </span>
    </a>`,
  warningStatus =
    `<a type="button" onclick="setValueViewMode(this)" data-bs-target="#ModalView" data-bs-toggle="modal">
        <span class="badge bg-warning">
            <span><i class='bx bxs-alarm-exclamation text-primary-btn'></i></span>
        </span>
    </a>`,
  successStatus =
    `<a type="button" onclick="setValueViewMode(this)" data-bs-target="#ModalView" data-bs-toggle="modal">
        <span class="badge bg-success">
            <span><i class='bx bx-check text-primary-btn'></i></span>
        </span>
    </a>`,
  editBtn =
    `<a type="button" onclick="setValueEditMode(this)" data-bs-target="#ModalEdit" data-bs-toggle="modal">
        <span class="badge bg-primary-badge">
            <span><i class='bx bxs-edit text-primary-btn'></i></span>
        </span>
    </a>`,
  cutOfBtn =
    `<a type="button" data-bs-target="#ModalCutOff" data-bs-toggle="modal">
        <span class="badge bg-info">
            <span><i class='bx bx-math text-primary-btn'></i></span>
        </span>
    </a>`,
  nowDate = Date.now(),
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
    // col1 = ปุ่มสถานะ
    // col2 = รหัสงวด
    // col3 = วันที่งวด
    // col4 = เปิดรับแทง
    // col5 = ปิดรับแทง
    // col6 = หมายเหตุ
    // col7 = สถานะ 1 = ปิดงวดแล้ว, -1 ยังไม่ปิดงวด และ ถึงเวลาปิดรับแทงแล้ว, 0 = ยังไม่ปิดงวด และ ยังไม่ถึงวันที่ปิดรับแทง

    const row = document.getElementById("table-body").insertRow(key),
      cusOf = parseInt(detailJson[key].CUT_OFF_F),
      endDate = Date.parse(detailJson[key].LIMIT_DATE_TIME),
      col0 = row.insertCell(0),
      col1 = row.insertCell(1),
      col2 = row.insertCell(2),
      col3 = row.insertCell(3),
      col4 = row.insertCell(4),
      col5 = row.insertCell(5),
      col6 = row.insertCell(6),
      col7 = row.insertCell(7);

    col7.setAttribute("hidden", true);
    col1.align = "center";

    if (cusOf === 1) {
      //ปิดงวดแล้ว
      col0.innerHTML = cutOfBtn;
      col1.innerHTML = successStatus;
      col7.value = 1;
    } else if (cusOf === 0 && nowDate > endDate) {
      //ยังไม่ปิดงวด และ ถึงเวลาปิดรับแทงแล้ว
      col0.innerHTML = cutOfBtn;
      col1.innerHTML = warningStatus;
      col7.value = -1;
    } else {
      //ยังไม่ปิดงวด และ ยังไม่ถึงวันที่ปิดรับแทง
      col0.innerHTML = editBtn;
      col1.innerHTML = waitStatus;
      col7.value = 0;
    }

    col2.innerHTML = detailJson[key].LESSON_ID; //รหัสงวด
    const lessonDate = new Date(detailJson[key].LESSON_DATE);
    col3.value = lessonDate;
    col3.innerHTML = ToDD_MM_YYYY(lessonDate);

    const startDate = new Date(detailJson[key].START_DATE); //วันที่งวด
    col4.value = startDate;
    col4.innerHTML = ToDD_MM_YYYY(startDate); //เปิดรับแทง

    const limitedDate = new Date(detailJson[key].LIMIT_DATE_TIME);
    col5.value = limitedDate;
    col5.innerHTML = ToDD_MM_YYYY_HHMMSS(limitedDate); //ปิดรับแทง

    col6.innerHTML = detailJson[key].REMARKS; //หมายเหตุ
  }
}

//ทำการตรวจเลขที่ถูกรางวัล โดยรับค่าจากเลข 2 ตัว และ 3 ตัว
function cutOff(btnClick) {
  (async () => {
    var row = btnClick.parentNode.parentNode;

    let lassonId = mainTable.rows[row.rowIndex].cells[2].innerHTML;
    let lassonDate = mainTable.rows[row.rowIndex].cells[3].innerHTML;
    let remarkStr = mainTable.rows[row.rowIndex].cells[6].innerHTML;
    let getMode = localStorage.getItem("mode");
    let bodyColor = "#fff";

    if (getMode == "dark-mode") {
      bodyColor = "#252525";
    }

    const { value: formValues } = await Swal.fire({
      customClass: {
        confirmButton: "btn btn-primary btn-src",
      },
      buttonsStyling: false,
      title: "<h5>" + lassonId + "</h5>",
      html: 
      `<p class="text-p-bold mb-1">วันที่งวด : <span class="text-p">${lassonDate} ${remarkStr} </span></p>
      <span class="text-danger">*</span><label for="twoLucky" class="col-form-label">2 ตัว เลขที่ออก</label>
      <input type="number" id="twoLucky" class="form-control" required>
      <span class="text-danger">*</span><label for="treeLucky" class="col-form-label">3 ตัว เลขที่ออก</label>
      <input type="number" id="treeLucky" class="form-control" required>`,
      focusConfirm: false,
      background: bodyColor,
      confirmButtonText: "ปิดงวด",
      preConfirm: () => {
        return [
          document.getElementById("twoLucky").value,
          document.getElementById("treeLucky").value,
        ];
      },
    });

    if (formValues) {
      if (
        formValues[0].toString().length === 2 &&
        formValues[1].toString().length === 3
      ) {
        Swal.fire(JSON.stringify(formValues));
        //ทำการคำนวนต่อตรงนี้
      } else {
        Swal.fire(JSON.stringify("กรอกข้อมูลไม่ถูกต้อง"));
      }
    }
  })();
}

function setValueEditMode(rowClick) {
  var row = rowClick.parentNode.parentNode;
  document.getElementById("E_LESSON_ID").value = mainTable.rows[row.rowIndex].cells[2].innerHTML;
  document.getElementById("E_LESSON_DATE").value = toLocalDate(mainTable.rows[row.rowIndex].cells[3].value);
  document.getElementById("E_START_DATE").value = toLocalDate(mainTable.rows[row.rowIndex].cells[4].value);
  document.getElementById("E_LIMIT_DATE_TIME").value = toLocalDateTime(mainTable.rows[row.rowIndex].cells[5].value);
  document.getElementById("E_REMARKS").value = mainTable.rows[row.rowIndex].cells[6].innerHTML;
}

function setValueViewMode(rowClick) {
  var row = rowClick.parentNode.parentNode;
  let lassonStatus = mainTable.rows[row.rowIndex].cells[7].value;
  document.getElementById("V_LESSON_ID").value =  mainTable.rows[row.rowIndex].cells[2].innerHTML;
  document.getElementById("V_LESSON_DATE").value = toLocalDate(mainTable.rows[row.rowIndex].cells[3].value);
  document.getElementById("V_START_DATE").value = toLocalDate(mainTable.rows[row.rowIndex].cells[4].value);
  document.getElementById("V_LIMIT_DATE_TIME").value = toLocalDateTime(mainTable.rows[row.rowIndex].cells[5].value);
  document.getElementById("V_REMARKS").value = mainTable.rows[row.rowIndex].cells[6].innerHTML;
  const divStatus = document.getElementById("LESSON_STATUS");

  if (document.getElementById("myStstus")) {
    const element = document.getElementById("myStstus");
    element.parentNode.removeChild(element);
  }

  if (lassonStatus === -1) {
    var fragment = create(
      `<span id = "myStstus" class="badge bg-warning" style="font-size: 16px;">
          <span>สถานะ : <i class='bx bxs-alarm-exclamation text-primary-btn'></i></span> รอปิดงวด
      </span>`
    );
    divStatus.appendChild(fragment, document.body.childNodes[0]);
  } else if (lassonStatus === 0) {
    var fragment = create(
      `<span id = "myStstus" class="badge bg-primary" style="font-size: 16px;">
          <span>สถานะ : <i class='bx bxs-hourglass text-primary-btn'></i></span> อยู่ระหว่างดำเนินการ
       </span>`
    );
    divStatus.appendChild(fragment, document.body.childNodes[0]);
  } else {
    var fragment = create(
      `<span id = "myStstus" class="badge bg-success" style="font-size: 16px;">
          <span>สถานะ : <i class='bx bx-check text-primary-btn'></i></span> ปิดงวดแล้ว
      </span>`
    );
    divStatus.appendChild(fragment, document.body.childNodes[0]);
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

function setRemarkS(objSelect,idRemark){
  console.log(objSelect.innerHTML)
  document.getElementById(idRemark).value = objSelect.innerHTML;  
}