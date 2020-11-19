import React from 'react'

function Product(props){
  const {image,id,onAdd,name,price} = props
  return (<div key={id} className="product">
      <h2>{name}</h2>
    <img style={{width:'200xp',height:'200px'}} src={image} alt={name}/>
    <span>{price}</span>
    <button onClick={()=>onAdd(id)}>Add to cart</button>
  </div>)
}

export default Product