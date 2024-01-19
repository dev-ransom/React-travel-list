import React, { useState } from 'react'

export default function App() {
  const [items, setItems] = useState([]);
  function handleAddItem(item) {
    setItems(items => [...items, item])   
  }

  function handleDeleteItem(id) {
    setItems(items => items.filter(item => item.id !== id))
  }

  function handleToggleItem(id) {
    setItems(items => items.map(item => item.id === id ? {...item, packed: !item.packed} : item))
  }

  function handleClearList() {
    const confirmed = window.confirm("are you sure you want to delete all items");
    if(confirmed) setItems([]);
  }
  return (
    <div className='app'>
      <Logo />
      <Form onAddItems={handleAddItem}  />
      <PackingList items={items} onDeleteItems={handleDeleteItem} onToggleItem={handleToggleItem} onClearList={handleClearList} />
      <Stats items={items}/>
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


function PackingList({ items, onDeleteItems, onToggleItem, onClearList}) {
  const [sortBy, setSortBy] = useState("input");
  let sortedItems;
  if (sortBy === "input") sortedItems = items;
  if (sortBy === "description") sortedItems = items.slice().sort((a, b) => a.description.localeCompare(b.description))
  if (sortBy === "packed") sortedItems = items.slice().sort((a, b) => Number(a.packed) - Number(b.packed))

  return (
    <div className='list'>
      <ul>{sortedItems.map(item => <Item item={item} onDeleteItems={onDeleteItems} onToggleItem={onToggleItem} key={item.id} />)}</ul>
      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">sort by input order</option>
          <option value="description">sort by description</option>
          <option value="packed">sort by packed status</option>
        </select>
        <button onClick={onClearList}>clear list</button>
      </div>
    </div>

    
  )
}

function Item({ item, onDeleteItems, onToggleItem }) {
  return (
    <li>
      <input type="checkbox" value={item.packed} onChange={()=> onToggleItem(item.id)}/>
      <span style={item.packed ? { textDecoration: 'line-through'} : {}}> {item.quantity} {item.description} </span>
      <button onClick={()=> onDeleteItems(item.id)}>❌</button>
    </li>
  )
}

function Stats({ items }) {
  if (items.length === 0) return <p className='stats'><em>Start adding some items to your packing list</em></p>
  const numItems = items.length;
  const numPacked = items.filter((item)=> item.packed).length;
  const percentage = Math.round((numPacked / numItems) * 100)
  console.log(percentage);
  return (
    <footer className='stats'>
      <em>{percentage === 100 ? `You got everything! Ready to go ✈` :`🤭 you have ${numItems} ${numItems === 1 ? "item" : "items"}  on your list, and you already packed ${numPacked} (${percentage}%)`}</em>
    </footer>
  )
}


