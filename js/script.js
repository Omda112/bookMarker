var bookmarkName = document.getElementById("BookmarkName");
var siteURL = document.getElementById("SiteURL");
const btn = document.getElementById("submmitBtn");
const inputs = document.querySelectorAll('input');
var regex = {
    BookmarkName: /^[A-Z][a-z0-9]{3,}$/,
    SiteURL: /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[^\s]*)?$/
}

var markers = [];

if (localStorage.getItem("markers") != null) {
    markers = JSON.parse(localStorage.getItem("markers"));
    // console.log("hi");
    Display(markers);
}

function addBookmark(){
    var site = {
        siteName : bookmarkName.value,
        siteURL : siteURL.value
    }
    markers.push(site);
    updateLocalStorage();
    Display(markers);
}

function Display(list){
    var cartona = ``;
    for(var i=0;i<list.length;i++){
        cartona+=`
        <tr>
            <td style="height:50px">${i}</td>
            <td>${list[i].siteName}</td>
            <td> <a href="${list[i].siteURL}" target="_blank"><button class=" btn btn-visit"><i class="fa-solid fa-eye p-1"></i>Visit</button></a> </td>
            <td> <button onclick="Delete(${i})" class=" btn btn-delete"><i class="fa-solid fa-trash p-1"></i>Delete</button> </td>
        </tr>
        </hr>
        `
    }
    
    // console.log("hi");
    // console.log(cartona);
    document.getElementById("myData").innerHTML = cartona;
    // console.log(i);
}



function Delete(index) {
    console.log("hi",index);
    markers.splice(index, 1);
    console.log(markers)
    updateLocalStorage();
    //localStorage.setItem("productlist",productlist); clean-code
    Display(markers);
    // console.log(markers)
}


function updateLocalStorage() {
    localStorage.setItem('markers', JSON.stringify(markers));
}




function validateSiteInput(element) {
    if (regex[element.id].test(element.value) == true) {
        if(bookmarkName.value !== "" && siteURL.value !== ""){
            btn.disabled = false;
        }
        console.log("match");
        element.nextElementSibling.classList.add("d-none");
        element.classList.add("is-valid");
        element.classList.remove("is-invalid");
    } else {
        console.log("not match");
        element.nextElementSibling.classList.remove("d-none");
        element.classList.remove("is-valid");
        element.classList.add("is-invalid");
        btn.disabled = true;
    }
    
}

