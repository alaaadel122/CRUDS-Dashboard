var productName = document.getElementById("productName");
var productPrice = document.getElementById("productPrice");
var productDesc = document.getElementById("productDesc");
var productImg = document.getElementById("productImg");
var productCat = document.getElementById("productCat");
var productTable = document.getElementById("productData");
var deleteBtn = document.getElementById('deleteBtn')
var deleteModal = document.getElementById('deleteModal');
var updateBtn = document.getElementById('deleteBtn')
var updateModal = document.getElementById('updateModal');
var pName = document.getElementById('pName')
var pPrice = document.getElementById('pPrice')
var pCat = document.getElementById('pCat')
var pDesc = document.getElementById('pDesc')
var searchInput = document.getElementById("search");
var productData = document.getElementById('productData');
let currentIndex = null;

var productList = [];

if (JSON.parse(localStorage.getItem('product')) != null) {
     productList = JSON.parse(localStorage.getItem('product'))
     display()
} else {
     productData.innerHTML = `<tr>
          <td colspan="6" class="text-center">No data available.</td>
          </tr>`
}
function addProduct() {
     var product = {
          pName: productName.value,
          pPrice: productPrice.value,
          pDesc: productDesc.value,
          pImg: `./img/${productImg.files[0]?.name}`,
          pCat: productCat.value,

     }
     productList.push(product);
     localStorage.setItem('product', JSON.stringify(productList))
     display()
     clear()
}
var globalIndex;
function display(list = productList) {
     var box = '';
     for (var i = 0; i < list.length; i++) {
          box += `
               <tr>
                    <th scope="row">${i + 1}</th>
                    <td class="d-flex justify-content-center flex-row clearfix">
                         <div class="product-img float-start d-flex justify-content-center align-items-center">
                              <img class="" src="${list[i].pImg}">    
                         </div>
                         <p class="ps-3 pt-2 float-end">${list[i].pName}</p>
                    </td>          
                    <td>${list[i].pPrice}</td>
                    <td>${list[i].pCat}</td>
                    <td>${list[i].pDesc}</td>
                    <td>
                         <button data-bs-toggle="modal" type="button" data-bs-target="#deleteModal" class="text-danger border-0 pe-2 bg-transparent" data-index="${i}"><i class="fa-solid fa-trash"></i></button>
                         <button data-bs-toggle="modal" type="button" data-bs-target="#updateModal" class="text-info border-0 bg-transparent" data-index="${i}"><i class="fa-solid fa-pen-to-square"></i></button>
                    </td>

               </tr>
               
               `
     }
     productTable.innerHTML = box
}

deleteModal.addEventListener('show.bs.modal', function (event) {
     const button = event.relatedTarget;
     currentIndex = button.getAttribute('data-index');
     console.log('Selected row index:', currentIndex);
});
deleteBtn.addEventListener('click', function () {
     if (currentIndex !== null) {
          deleteProduct(currentIndex);
     }
});


function deleteProduct(index) {
     productList.splice(index, 1);
     localStorage.setItem('product', JSON.stringify(productList))
     if(JSON.parse(localStorage.getItem('product')) ==null || productList.length ==0){
           productData.innerHTML = `<tr>
          <td colspan="6" class="text-center">No data available.</td>
          </tr>`

     }
     display()
     console.log(productList)

}


function clear() {
     productName.value = null;
     productPrice.value = null;
     productDesc.value = null;
     productCat.value = null;
     productImg.value = null;

}
updateModal.addEventListener('shown.bs.modal', function (event) {
     const button = event.relatedTarget;
     currentIndex = button.getAttribute('data-index');
     console.log('Selected row index:', currentIndex);
     var product = productList[currentIndex];
     updateModelDate(product);
     document.getElementById('updateBtn').addEventListener('click', function () {
          if (currentIndex !== null) {
               updateData(currentIndex);
          }
     });

});

function updateModelDate(product) {
     pName.value = product.pName;
     pPrice.value = product.pPrice;
     pCat.value = product.pCat;
     pDesc.value = product.pDesc;
}
function updateData(index) {
     productList[index].pName = pName.value;
     productList[index].pPrice = pPrice.value;
     productList[index].pCat = pCat.value;
     productList[index].pDesc = pDesc.value;
     console.log(pPrice.value)
     localStorage.setItem('product', JSON.stringify(productList))
     display()
}
function searchFun() {
     var searchArr = [];
     var term = searchInput.value.trim().toLowerCase();
     console.log(term)
     for (var i = 0; i < productList.length; i++) {
          if (productList[i].pName.toLowerCase().includes(term) == true) {
               searchArr.push(productList[i]);
          }

     }
     display(searchArr)
}