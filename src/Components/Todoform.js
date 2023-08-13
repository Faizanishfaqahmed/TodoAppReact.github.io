import React, {useState, useEffect} from 'react'
import Header from './header'
/*get the Local Storage Data */
const getLocalData = ()=>{
  const lists = localStorage.getItem('myTodos');
  if(lists){ 
    return JSON.parse(lists);
  } else {
    return []
  }
}
const Todoform = () => {
const [inputData,setInputData]=useState("");
const [items,setItems]=useState(getLocalData());
const [isEdit,setIsEdit]=useState("");
const [toogle,settoggle]=useState(false);

const addItem =()=>{
  if(!inputData){
    alert("Please enter data");
  } else if(inputData &&  toogle){
setItems(
  items.map((curE)=>{
  if(curE.id === isEdit){
    return {curE, name:inputData}
  }
  
  return curE;
  })
    
);
setInputData("");
  setIsEdit(null);
  settoggle(false);
  } 

  else {
    const myinputData = {
         id:crypto.randomUUID(),
         name: inputData
    }
    setItems([...items,myinputData ]);
  }
  
}

/*Edit */
const editItem = (index)=>{
const edited =  items.find((curE)=>{
 return curE.id === index;
});
setInputData(edited.name);
setIsEdit(index);
settoggle(true);
}

/* Delete Items */
const deleteItem=(index)=>{
const update = items.filter((curE)=>{
return curE.id !== index;
});

setItems(update);
}
/**Remove all items */
const removeAll = ()=>{
  setItems([]);
};

/*local storage*/
useEffect(()=>{
  localStorage.setItem('myTodos', JSON.stringify(items));
},[items]);
  return (
    <>
    
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />
    <Header/>
    <br/>
    <div class="h-14 bg-transparent -ml-60 flex justify-center">
      <div className="child">
     
        <div className="addItms -mt-[100px]">
          <input className="formControl rounded-full bg-gradient-to-t from-blue-500 via-white to-pink-600 w-[min(400px)] border-2 border-red-400 text-center -" type="text" name="" id="addItems" 
          placeholder='✍ Please enter Tasks' value={inputData} onChange={(e)=>setInputData(e.target.value)}/>   {toogle ?( <button className='' onClick={addItem}><img src="images/edit.png" 
          className='h-8 -mt-6 -ml-10 absolute  border-solid-20 border-red-400'/></button>):( <button className='' 
          onClick={addItem}><img src="images/add.png" className='h-8 -mt-6 -ml-10 absolute  border-solid-20 border-red-400'/></button>)}
          
        </div>
        {/*Show Items */}
        <div className="items flex justify-center align-center">
<div className="showItems mt-[max(20px)]">
  {items.map((curE,index)=>{
return (
  <>
  <div className="todo-cont flex-col"><br/>
 
  <div className='flex' key={curE.id}>
  <div className='w-200 bg-gradient-to-t from-blue-500 via-white to-pink-600 w-[min(300px)] text-center rounded-full text-red-500 font-bold'
    ><h3>{curE.name}</h3> <input type="checkBox" className='absolute left-[max(39%)] -mt-4' /></div>  
  <button className='bg-gradient-to-b from-violet-500 via-white to-pink-600 ml-2 rounded  hover:bg-blend-darken text-violet-800 font-bold w-20 drop-shadow-lg ' onClick={()=>editItem(curE.id)}>
    <span class="material-symbols-outlined">
edit_note
</span>Edit</button>
  <button className='bg-gradient-to-b from-red-500 via-white to-pink-600 ml-2 rounded text-red-500 font-bold w-20 shadow-xl ' onClick={()=>deleteItem(curE.id)}>❌Delete</button>
  
  
  </div>
  


  </div>
  </>
  
)
  }

  )}
 
  
</div>
        </div>
        {/*Remove Button */}
        <button className='rounded text-center bg-gradient-to-r from-purple-500 to-pink-500 mt-[max(20px)] ml-[min(150px)] hover:{let }' onClick={removeAll}>Remove All</button>
      </div>
    </div>
    </>
    
  )
}

export default Todoform