import React from 'react'
const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: false },
  { id: 3, description: "fasts", quantity: 23, packed: true },
];
export default function App() {
  return (
    <div className='app'>
      <Logo />
      <Form />
      <PackingList />
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

function Form() {
  return (
    <div className='add-form'>
      <h3>what do you need for your 😍 trip?</h3>
      <select ></select>
      <input type="text" placeholder='item...' />
      <button>Add</button>
    </div>
  )
}


function PackingList() {
  return (
    <div className='list'>
      <ul>{initialItems.map(item => <Item item={item} key={initialItems.id}/>)}</ul>
    </div>
  )
}

function Item({ item }) {
  return (
    <li>
      <span style={item.packed ? { textDecoration: 'line-through' } : {}}>{item.description} {item.quantity}</span>
      <button>❌</button>
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