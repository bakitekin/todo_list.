const form = document.querySelector(".grocery-form");
const grocery = document.getElementById("grocery");
const container = document.querySelector(".grocery-container");
const list = document.querySelector(".grocery-list");
const alert = document.querySelector(".alert");
const submitBtn = document.querySelector(".submit-btn");
const clearBtn = document.querySelector(".clear-btn");

// Düzenleme Seçenekleri

let editElement;
let editFlag = false; // Düzenleme modunda olup olmadığını belirtir.
let editId = ""; // Düzenleme yapılan öğenin benzersiz kimliği

// Olay izleyicileri
form.addEventListener("submit", addItem);
clearBtn.addEventListener("click", clearItems);

// Fonksiyonlar
function displayAlert(text, action) {
  console.log(text, action);
  alert.textContent = text;
  alert.classList.add(`alert-${action}`);
  setTimeout(() => {
    alert.textContent = "";
    alert.classList.remove(`alert-${action}`);
  }, 2000);
}

function addItem(e) {
  e.preventDefault(); // Formun otomatik olarak gönderilmesini engeller.
  const value = grocery.value; // Formun içinde bulunan değeri alır.
  const id = new Date().getTime().toString(); // Benzersiz bir id oluşturur.

  // Eğer değer boş değilse ve düzenleme modunda değilse
  if (value !== "" && !editFlag) {
    const element = document.createElement("article"); // Yeni bir "article" oluşturur.
    let attr = document.createAttribute("data-id"); // Yeni bir veri kimliği oluşturur.
    attr.value = id;
    element.setAttributeNode(attr); // Oluşturduğumuz elemente id'yi ekleriz.
    element.classList.add("grocery-item"); // Oluşturduğumuz elemente class ekleriz.
    element.innerHTML = `
       <p class="title">${value}</p>
        <div class="btn-container">
        <button type="button" class="edit-btn">
            <i class="fa-solid fa-pen-to-square"></i>
        </button>
        <button type="button" class="delete-btn">
            <i class="fa-solid fa-trash"></i>
        </button>
        </div>`;

    const deleteBtn = element.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", deleteItem);
    const editBtn = element.querySelector(".edit-btn");
    editBtn.addEventListener("click", editItem);

    // Kapsayıcıya ekleme yaparız
    list.appendChild(element);
    displayAlert("Başarıyla eklendi", "success");
    container.classList.add("show-container");

    // İçeriği sıfırlarız
    grocery.value = "";
  } else if (value !== "" && editFlag) {
    editElement.querySelector(".title").textContent = value;
    displayAlert("Değer değiştirildi", "success");
    editFlag = false;
    editId = "";
    submitBtn.textContent = "Ekle"; // Gönder düğmesinin metnini sıfırlar
  } else {
    displayAlert("Değer girin", "danger"); // Boş değer için uyarı ekledik
  }
}

// Silme fonksiyonu
function deleteItem(e) {
  const element = e.currentTarget.parentElement.parentElement;
  const id = element.dataset.id;
  list.removeChild(element);
  displayAlert("Değer Kaldırıldı", "danger");
}

// Temizleme fonksiyonu
function clearItems() {
  const items = document.querySelectorAll(".grocery-item");
  console.log(items);
  if (items.length > 0) {
    items.forEach((item) => list.removeChild(item));
  }
  container.classList.remove("show-container"); // Container'ı gizler
  displayAlert("Liste Boş", "danger");
}

// Düzenleme fonksiyonu
function editItem(e) {
  console.log(e);
  const element = e.currentTarget.parentElement.parentElement;
  // Düzenleme yapılan öğeyi seçin
  editElement = element.querySelector(".title");
  console.log(editElement);
  // Form içerisinde bulunan input'un değerini düzenlenen öğenin metniyle doldurur.
  grocery.value = editElement.textContent;
  editFlag = true;
  console.log(element.dataset);
  editId = element.dataset.id; // Düzenlenen öğenin kimliği
  submitBtn.textContent = "Düzenle";

  submitBtn.addEventListener("click", function () {
    submitBtn.textContent = "Ekle";
    editFlag = false;
    editId = "";
  });
}
