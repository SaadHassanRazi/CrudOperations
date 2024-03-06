

const table = document.getElementById("table");
const tableBody = document.getElementById("tableBody");
const addRecord = document.getElementById("addRecord");
const fName = document.getElementById("record");
const lName = document.getElementById('lName')
const startDate = document.getElementById('startDate')
const endDate = document.getElementById('endDate')



const addRow = ()=>{
  if(fName.value ==''){
    alert('Please Enter Value')
  }else{
    const timestamp = Date.now(); 

        const date = new Date(timestamp);
    
        const year = date.getFullYear(); 
        const month = date.getMonth() + 1; 
        const day = date.getDate();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds(); 
        const milliseconds = date.getMilliseconds(); 
    
        const modifiedDate = year + "," + month + "," + day;
        const modifedTime =
          hours + ":" + minutes + ":" + seconds + ":" + milliseconds;
          console.log(lName.value);
    tableBody.innerHTML += `
    <td id="title">${fName.value}</td>
    <td>${lName.value}</td>
    <td>${modifedTime.slice(0,8)}</td>
    <td>${modifiedDate}</td>
    <td><button class="btn btn-success" onclick='updateRecord(this)'>Update</button></td>
    <td>
      <button class="btn btn-danger" onclick='deleteRecord(this)' id="deleteBtn">Delete</button>
    </td>
  </tr> `

  }
  fName.value = ''
  lName.value=''
  saveData()
}



const deleteRecord =(button)=>{
  const row = button.parentNode.parentNode
  row.remove()
  saveData()
 }

 const updateRecord = (button)=>{
  if(fName.value==''){
    alert('Please Enter Updated Record in the Field')
  }else{
    const timestamp = Date.now(); 

    const date = new Date(timestamp);

    const year = date.getFullYear(); 
    const month = date.getMonth() + 1; 
    const day = date.getDate(); 
    const hours = date.getHours(); 
    const minutes = date.getMinutes(); 
    const seconds = date.getSeconds(); 
    const milliseconds = date.getMilliseconds(); 

    const modifiedDate = year + "," + month + "," + day;
    const modifedTime =
      hours + ":" + minutes + ":" + seconds + ":" + milliseconds;
    const row = button.parentNode.parentNode
  const firstName = row.childNodes[0]
  firstName.innerHTML = fName.value
  const lastName = row.childNodes[2]
  lastName.innerHTML = lName.value
  const timeChange = row.childNodes[4]
  timeChange.innerHTML = modifedTime
  const dateChange = row.childNodes[6]
  dateChange.innerHTML = modifiedDate
  fName.value=''

  }
  saveData()
  
  
 }
 

 const saveData = ()=>{
  localStorage.setItem('data',tableBody.innerHTML)
 }

 const showData = ()=>{
  tableBody.innerHTML = localStorage.getItem('data')
 }

 showData()


//  const searchFunc = ()=>{
//   const filter = document.getElementById('myInput').value.toLowerCase()
//   let tr = table.getElementsByTagName('tr')
//   for(let i=0;i<tr.length;i++){
//     let td = tr[i].getElementsByTagName('td')[0]
//     let td2 = tr[i].getElementsByTagName('td')[1]
     
//     if(td || td2){
//       let textValue = td.textContent || td.innerHTML || td2.textContent || td2.innerHTML
//       if(textValue.toLowerCase().indexOf(filter)>-1){
//         tr[i].style.display=''
//       }else{
//         tr[i].style.display='none'
//       }
//     }
//   }

//  }
const searchFunc = () => {
  const filter = document.getElementById('myInput').value.toLowerCase();
  const tableRows = table.getElementsByTagName('tr');

  for (let i = 0; i < tableRows.length; i++) {
    const row = tableRows[i];
    let foundMatch = false; 

  
    const cell1 = row.getElementsByTagName('td')[0];
    const cell2 = row.getElementsByTagName('td')[1];

    if (cell1) {
      const textValue1 = cell1.textContent || cell1.innerHTML;
      foundMatch = foundMatch || textValue1.toLowerCase().includes(filter); 
      }

    if (cell2) {
      const textValue2 = cell2.textContent || cell2.innerHTML;
      foundMatch = foundMatch || textValue2.toLowerCase().includes(filter);
    }

    row.style.display = foundMatch ? '' : 'none';
  }
};


const sortTable = (table,column,asc=true)=>{
    const dirModifier = asc?1:-1
    const tBody = table.tBodies[0]
    const rows = Array.from(tBody.querySelectorAll("tr"));
    
    const sortedRows = rows.sort((a,b)=>{
        const aColText = a.querySelector(`td:nth-child(${column})`).textContent.trim()
        
        const bColText = b.querySelector(`td:nth-child(${column})`).textContent.trim()
        return aColText > bColText?(1*dirModifier):(-1*dirModifier)
    })
   while(tBody.firstChild){
    tBody.removeChild(tBody.firstChild)
   }
   tBody.append(...sortedRows)
   table.querySelectorAll('th').forEach(th=>th.classList.remove('th-sort-asc','th-sort-desc'))
   table.querySelector(`th:nth-child(${column})`).classList.toggle('th-sort-asc',asc)
   table.querySelector(`th:nth-child(${column})`).classList.toggle('th-sort-desc',!asc)

}

document.querySelectorAll('.table-sortable th').forEach(headerCell=>{
    headerCell.addEventListener('click',()=>{
        const tableElement = headerCell.parentElement.parentElement.parentElement
        const headerIndex = Array.prototype.indexOf.call(headerCell.parentElement.children,headerCell)
        const currentIsAscending = headerCell.classList.contains('th-sort-asc')
        sortTable(tableElement,headerIndex,!currentIsAscending)
    })
})

sortTable(document.querySelector('table'),1,true)


const dateFilter = () => {
  const tableRows = table.getElementsByTagName('tr');

  for (let i = 0; i < tableRows.length; i++) {
    const row = tableRows[i];
    const dateCell = row.getElementsByTagName('td')[3]; // Assuming the date is in the fourth column

    if (dateCell) {
      const dateText = dateCell.textContent || dateCell.innerHTML; // Get text content or innerHTML
      
      // Parse the string into a Date object
      const parsedDate = new Date(dateText);
      console.log(parsedDate);
      
      // Check if parsed date is within the selected range
      if (parsedDate >= startDate.value && parsedDate <= endDate.value) {
        console.log(dateText);
      }
       // Now access and log the date text
    }
  }
};
