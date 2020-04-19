M.AutoInit();

let collection=document.querySelector('.collection');

let numbers=[3000,2500,2000,1500,1000,500];
let listItem=[];
const shuffle=(arr)=>{
    let length=arr.length;
   
    while (length !==0) {
      let randowmIndex=Math.floor(Math.random()*length);
      length--;
      let temp=arr[length];
      arr[length]=arr[randowmIndex];
      arr[randowmIndex]=temp;
      
    }
    return arr;
}


let startElement;


function dragStart(){
  startElement=+this.closest('li').dataset.index;
    this.classList.add('over')
}

function dragEnter(){
   
    this.classList.add('over');
}
function dragLeave(){
    
    this.classList.remove('over');
}
function dragOver(e){
    
    
    e.preventDefault()
}
function drop(){
    endElement=+this.dataset.index;
  swapElement(startElement,endElement);
  this.classList.remove('over');
   
}

function swapElement(start,end){

    let firstElement=listItem[start].querySelector('.draggable');
    let lastElement=listItem[end].querySelector('.draggable');
    listItem[end].appendChild(firstElement);
    listItem[start].appendChild(lastElement);
    console.log(listItem);
    
}

const dragDrop=()=>{
    let draggables=document.querySelectorAll('.draggable');
    let items=document.querySelectorAll('.collection-item');

    draggables.forEach((el)=>{
        el.addEventListener('dragstart',dragStart)
    });
    items.forEach((el)=>{
        el.addEventListener('dragenter',dragEnter);
        el.addEventListener('dragleave',dragLeave);
        el.addEventListener('dragover',dragOver);
        el.addEventListener('drop',drop);
    });
}
const createListDraggable=()=>{
    
    shuffle([...numbers]).forEach((el,index)=>{
        let li=document.createElement('li');
        li.classList.add('collection-item');
        li.innerHTML=`
        <div class="index">${index+1}</div>
        <div class="draggable"   draggable="true">
          <p class="text">${el}</p>
          <i class="material-icons prefix">dehaze</i>
        </div>
     
        `;
        li.setAttribute('data-index',index);
        collection.appendChild(li);
        listItem.push(li);
      
    });
    console.log(listItem);
    
    dragDrop();
    
    
   
}
createListDraggable();

const check=()=>{
    listItem.forEach((el,index)=>{
        const item=el.querySelector('.draggable p').innerText.trim();
        
        if (item==numbers[index]) {
            el.classList.add('true')
            el.classList.remove('false')
        }
        else{
            el.classList.remove('true')
            el.classList.add('false')
        }
        
    });
    console.log(numbers);
    
}
document.getElementById('check').addEventListener('click',check);


