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
    let tableBody = document.querySelector(".tableBody");
    let tableRow = document.createElement("tr");
    tableBody.append(tableRow);
    tableRow.classList.add = "tableRow";

    //Rowun indexi
    // let indexDt = document.createElement("td");
    // tableRow.append(indexDt);
    // var x = document.getElementsByTagName("tr");
    // var txt = "";
    // var i;
    // for (i = -1; i < x.length - 1; i++) {
    //   txt = i + 1;
    // }
    // indexDt.append(txt);
    // indexDt.className = "col-sm-1 border";

    //Data-imagein ozu
    let imageTd = document.createElement("td");
    tableRow.append(imageTd);
    imageTd.className = "col-sm-3 border";

    let img = document.createElement("img");
    img.src = fileReader.result;
    img.style.width = "100%";
    img.style.height = "110px";
    img.style.objectFit = "contain";
    imageTd.append(img);

    //Data-image size
    let sizeDt = document.createElement("td");
    tableRow.append(sizeDt);
    let filesize = (file.size / 1024).toFixed(2);
    sizeDt.append(filesize + " " + "Kb");
    sizeDt.className = "col-sm-3 border pt-5";

    //Data- image type
    let typeTd = document.createElement("td");
    tableRow.append(typeTd);
    let filetype = file.type;
    typeTd.append(filetype);
    typeTd.className = "col-sm-3 border pt-5";

    // Data-delete button
    let deleteTd = document.createElement("td");
    tableRow.append(deleteTd);
    deleteTd.className = "col-sm-3 border pt-5";
    let btn = document.createElement("button");
    btn.className = "btn btn-outline-danger";
    btn.innerHTML = "Delete  <i class='fas fa-trash-alt'></i>";
    deleteTd.append(btn);

    // Confirm + delete
    btn.onclick = function () {
      //td elementlerin countunu tapiram
      var tdcount = document.getElementsByTagName("td").length;
      // console.log(tds);
      let confDel = confirm(
        "Are you sure you want to permanently delete this item ?"
      );
      if (confDel) {
        tableRow.remove();
      }
      //rowu sildikce sayi azalir,4 standart olaraq thead e gore var
      if (tdcount == 4) {
        myTable.classList.add("d-none");
      }
    };
  });
}

//Button reference
chooseBtn.onclick = function () {
  addInput.click();
};

//Drop & change area color
dropArea.addEventListener("dragover", (e) => {
  dropArea.style.backgroundColor = "rgb(189, 184, 184)";
  e.preventDefault();
});

dropArea.addEventListener("dragleave", () => {
  dropArea.style.backgroundColor = "rgb(224, 223, 223)";
});
dropArea.addEventListener("mouseleave", () => {
  dropArea.style.backgroundColor = "rgb(224, 223, 223)";
});
dropArea.addEventListener("drop", (e) => {
  e.preventDefault();
  let files = Array.from(e.dataTransfer.files);
  files.forEach((file) => {
    showImage(file);
  });
});
