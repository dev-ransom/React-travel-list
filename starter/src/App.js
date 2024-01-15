import React, { useState } from 'react'
// const initialItems = [
//   { id: 1, description: "Passports", quantity: 2, packed: false },
//   { id: 2, description: "Socks", quantity: 12, packed: false },
//   { id: 3, description: "belts", quantity: 23, packed: true },
// ];
export default function App() {
  const [items, setItems] = useState([]);
  function handleAddItem(item) {
    setItems(items => [...items, item])   
  }

  function handleDeleteItem(id) {
    setItems(items => items.filter(item => item.id !== id))
  }
  return (
    <div className='app'>
      <Logo />
      <Form onAddItems={handleAddItem}  />
      <PackingList items={items} onDeleteItems={handleDeleteItem}/>
      <Stats />
    </div>
  )
}


function Logo() {
  return (
    <div>
      <h1>🌴 FAR AWAY 💼</h1>
    </div>
  )
}

function Form({onAddItems}) {
  const resetInput = () => {
    setDescription('')
  }
  const resetQuantity = () => {
    setQuantity('')
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!description) return
    const newItem = { description, quantity, packed: false, id: Date.now() }
   
    onAddItems(newItem);
    resetInput()
    resetQuantity();
  }

  const [description, setDescription] = useState("")
  const [quantity, setQuantity] = useState(1)
  
  return (
    <form className='add-form' onSubmit={handleSubmit}>
      <h3>what do you need for your 😍 trip?</h3>
      <select value={quantity} onChange={(e) => setQuantity(Number(e.target.value))}>
        {Array.from({length: 20}, (_, index) => index + 1).map((num) => (<option value={num} key={num}>{num}</option>))}
      </select>
      <input type="text" placeholder='item...' value={description} onChange={(e) => setDescription(e.target.value)} />
      <button>Add</button>
    </form>
  )
}


function PackingList({items, onDeleteItems}) {
  return (
    <div className='list'>
      <ul>{items.map(item => <Item item={item} onDeleteItems={onDeleteItems} key={item.id} />)}</ul>
    </div>
  )
}

function Item({ item, onDeleteItems }) {
  return (
    <li>
      <input type="checkbox" value={item.packed} />
      <span style={item.packed ? { textDecoration: 'line-through'} : {}}> {item.quantity} {item.description} </span>
      <button onClick={()=> onDeleteItems(item.id)}>❌</button>
    </li>
  )
}

function Stats() {
  return (
    <footer className='stats'>
      <em>🤭 you have X items on your list, and you already packed X (X%)</em>
    </footer>
  )
}


