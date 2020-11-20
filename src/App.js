import React,{useState,useEffect,useRef} from 'react'
import Product from './Product'
import './App.css';
import {v4 as uuid} from 'uuid'
import Cart from './Cart'

export const products = {
  1:{
    id:1,
    name:'SpongeBob',
    image:'https://upload.wikimedia.org/wikipedia/en/thumb/3/3b/SpongeBob_SquarePants_character.svg/1200px-SpongeBob_SquarePants_character.svg.png',
    price: '15'
  },
  2:{
    id:2,
    name:'shanda sheep',
    image:'https://d1oklq6066osfz.cloudfront.net/character_shaun_0.png',
    price: '25'
  },
    3:{
    id:3,
    name:'Tom and Jerry',
    image:'https://pngimg.com/uploads/tom_and_jerry/tom_and_jerry_PNG34.png',
    price: '15'
  },
      4:{
    id:4,
    name:'Shrek',
    image:'https://upload.wikimedia.org/wikipedia/en/4/4d/Shrek_%28character%29.png',
    price: '15'
  },
        5:{
    id:5,
    name:'Lisa Simpson',
    image:'https://upload.wikimedia.org/wikipedia/en/e/ec/Lisa_Simpson.png',
    price: '15'
  },
          6:{
    id:6,
    name:'Winnie the Pooh',
    image:'https://static.wikia.nocookie.net/heroes-and-villians/images/8/83/Winnie_the_Pooh.png/revision/latest/top-crop/width/360/height/450?cb=20191229203055',
    price: '25'
  },
            7:{
    id:7,
    name:'Arthur',
    image:'https://upload.wikimedia.org/wikipedia/en/thumb/6/65/Arthur_Read.svg/1200px-Arthur_Read.svg.png',
    price: '35'
  },
              8:{
    id:8,
    name:'Popeye',
    image:'https://upload.wikimedia.org/wikipedia/en/0/00/Popeye_the_Sailor.png',
    price: '30'
  },
                9:{
    id:9,
    name:'Bugs Bunny',
    image:'https://upload.wikimedia.org/wikipedia/en/thumb/1/17/Bugs_Bunny.svg/1200px-Bugs_Bunny.svg.png',
    price: '20'
  },
                  10:{
    id:10,
    name:'Daffy Duck',
    image:'https://upload.wikimedia.org/wikipedia/en/thumb/f/f4/Daffy_Duck.svg/1200px-Daffy_Duck.svg.png',
    price: '20'
  },
}
function App() {
  // const [orders,setOrders] = useState([])
  const [orders,setOrders] = useCrossTabState('orders',[])
  console.log(orders)
  const handleAdd = (id) => {
    setOrders((orders)=>orders.concat({orderId:uuid(),productId:id}))
  }
  const handleRemove = (orderId) => {
    const _orders= orders.filter((o)=>o.orderId!==orderId)
    setOrders(_orders)
  }
  // use local storage
  // useEffect(() => {
  //     localStorage.setItem("orders",JSON.stringify(orders))
  // }, [orders])

  // useEffect(()=>{
  //   window.addEventListener("storage",(e) => {  
  //   const {key,newValue} = e
  //   if(key==='orders'){
  //     setOrders(JSON.parse(newValue))
  //   }

  //   });
  // },[])

  return (
    <div className="App">
    <div className="products">
        {Object.keys(products).map((id)=>(
      <Product {...products[id]} onAdd={handleAdd} key={id}/>
    ))}
    </div>
          <Cart orders={orders} onRemove={handleRemove}/>
    </div>
  );
}

function useCrossTabState(stateKey,d){
  const [state,setState] = useState(d)
  const isNewSession = useRef(true)


  useEffect(()=>{
    if(isNewSession.current){
      const currentState = localStorage.getItem(stateKey)
      if(currentState){
        setState(JSON.parse(currentState))
      }else{
         setState(d)
      }
      isNewSession.current=false
      return
    }
    try{
      localStorage.setItem(stateKey,JSON.stringify(state))
    }catch(error){}
  },[state,stateKey,d])

  useEffect(()=>{
    const onReceieveMessage = (e) => {
     const {key,newValue} = e
    if(key===stateKey){
       setState(JSON.parse(newValue))
    } 
    }
    window.addEventListener('storage',onReceieveMessage)
    return () => window.removeEventListener('storage',onReceieveMessage)
  },[stateKey,setState])

  return [state,setState]
}

export default App;
