let form = document.getElementById("addForm");
let itemList = document.getElementById("items");
let filter = document.getElementById('filter');
let checkbox = document.getElementById('check');
let removeAll = document.getElementById('clear-all');

// form submit event
form.addEventListener('submit', addItem);
// features event
itemList.addEventListener('click', btnAction);
// filter event
filter.addEventListener('keyup', searchItems);
// hide completed
checkbox.addEventListener('change', hideItem);
// remove all
removeAll.addEventListener('click', clearAll);

function addItem(e) {
    e.preventDefault();

    // get input value
    let newItem = document.getElementById('item').value;
    if (newItem !== "") {
        // create new li, p, and button element
        let li = document.createElement('li');
        let p = document.createElement('p');
        let div = document.createElement('div');
        let button = document.createElement('button');
        let button_red = document.createElement('button');

        // add class
        li.className = "list-group-item";
        div.className = "buttons";
        button.className = "done button";
        button_red.className = "delete button button-red";

        // add text node to p
        p.appendChild(document.createTextNode(newItem));

        // button customization
        button.appendChild(document.createTextNode("\u2713"));
        button_red.appendChild(document.createTextNode("X"));
        button.style.marginRight = "5.63px";

        // append all buttons to div element
        div.appendChild(button);
        div.appendChild(button_red);

        // append all elements to li
        li.appendChild(p);
        li.appendChild(div);

        // add the list and display them
        itemList.appendChild(li);

        // clear the input text field
        document.getElementById('item').value = "";
    }
}

function btnAction(e) {
    // console.log(e.target)
    if (e.target.classList.contains('delete')) {
        if (confirm("Are you sure you want to remove this list?")) {
            let buttons = e.target.parentElement;
            let li = buttons.parentElement;
            itemList.removeChild(li);
        }
    } else if (e.target.classList.contains('done')) {
        let buttons = e.target.parentElement;
        let li = buttons.parentElement;
        let p = li.firstElementChild;
        p.classList.toggle('line-through');
    }
}

function searchItems(e) {
    // convert text val to lowercase
    let text = e.target.value.toLowerCase();
    // get list
    let items = itemList.getElementsByTagName('li');
    // convert items to array
    Array.from(items).forEach(function(item) {
        let itemName = item.firstElementChild.textContent;    
        
        if (itemName.toLowerCase().indexOf(text) === -1) {
            item.style.display = "none";
        } else {
            item.style.display = "flex";
        }
    })
}

function hideItem(e) {

    let items = itemList.getElementsByTagName('li');

    if (this.checked) {
        Array.from(items).forEach(function(item) {
            let itemName = item.firstElementChild;
            if (itemName.classList.contains('line-through')) {
                item.style.display = "none";
            } else {
                item.style.display = "flex";
            }
        })
    } else {
        Array.from(items).forEach(function(item) {
            item.style.display = "flex";
        })
    }
}

function clearAll(e) {
    if (e.target.classList.contains("button-red")) {
        if (confirm("Are you sure you want to clear all the lists?")) {
            itemList.innerHTML = "";
        }
    }
}