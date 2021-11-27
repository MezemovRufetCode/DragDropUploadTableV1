let addInput = document.querySelector("#addInput");
let chooseBtn = document.querySelector(".chooseBtn");
let images = document.querySelector(".images");
let dropArea = document.querySelector(".dropArea");

addInput.addEventListener("change", (e) => {
  let files = Array.from(e.target.files);
  files.forEach((file) => {
    showImage(file);
  });
});

function showImage(file) {
  const fileReader = new FileReader();
  if (
    file.type !== "image/png" &&
    file.type !== "image/jpg" &&
    file.type !== "image/jpeg"
  ) {
    alert("You should include only image file");
    return;
  }
  fileReader.readAsDataURL(file);

  fileReader.addEventListener("loadend", () => {
    //Table & table row
    let myTable = document.querySelector(".MyTable");
    myTable.classList.remove("d-none");
    let tableRow = document.createElement("tr");
    myTable.append(tableRow);
    tableRow.classList.add = "tableRow";
    //Data-imagein ozu
    let imageTd = document.createElement("td");
    tableRow.append(imageTd);
    imageTd.className = "col-sm-3 border";

    let img = document.createElement("img");
    img.src = fileReader.result;
    img.style.width = "100%";
    img.style.height = "110px";
    imageTd.append(img);

    //Data-image size
    let sizeDt = document.createElement("td");
    tableRow.append(sizeDt);
    let filesize = (file.size / 1024).toFixed(2);
    sizeDt.append(filesize);
    sizeDt.className = "col-sm-3 border";

    //Data- image type
    let typeTd = document.createElement("td");
    tableRow.append(typeTd);
    let filetype = file.type;
    typeTd.append(filetype);
    typeTd.className = "col-sm-3 border";

    // Data-delete button
    let deleteTd = document.createElement("td");
    tableRow.append(deleteTd);
    deleteTd.className = "col-sm-3 border";
    let btn = document.createElement("button");
    btn.className = "btn btn-outline-danger";
    btn.innerHTML = "Delete";
    deleteTd.append(btn);

    tableRow.classList.add = "tableRow";
    // Confirm + delete
    btn.onclick = function () {
      let confDel = confirm(
        "Are you sure you want to permanently delete this item ?"
      );
      if (confDel) {
        tableRow.remove();
      }
    };
  });
}

//Button reference
chooseBtn.onclick = function () {
  addInput.click();
};

//Drop
dropArea.addEventListener("dragover", (e) => {
  e.preventDefault();
});

dropArea.addEventListener("drop", (e) => {
  e.preventDefault();
  let files = Array.from(e.dataTransfer.files);
  files.forEach((file) => {
    showImage(file);
  });
});
