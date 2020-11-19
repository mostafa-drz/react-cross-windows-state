import React from 'react'
import {products} from './App'

function Cart(props){
  const {orders,onRemove} = props
  const total = orders.reduce((sum,o)=>{
    return sum = sum + +products[o.productId].price
  },0)
  return (
          <div className="cart">
          <p>Total:{total}</p>
        <h2>Cart</h2>
        {
          orders.map((c)=>(
          <div className="order" key={c.orderId}>
                   <button style={{border:'none',background:'none',cursor:'pointer'}} onClick={()=>onRemove(c.orderId)}>X</button>
            <img style={{width:'50xp',height:'50px',borderRadius:'100%'}} src={products[c.productId].image} alt={products[c.productId].image}/>
                 <h3>{products[c.productId].name}</h3>
        </div>
          ))
        }
      </div>
  )
}

export default Cart;