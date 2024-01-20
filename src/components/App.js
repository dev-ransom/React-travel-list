import React, { useState } from 'react'
import Logo from './Logo'
import Form from './Form'
import PackingList from './PackingList'
import Stats from './Stats'

export default function App() {
  const [items, setItems] = useState([])
  function handleAddItem(item) {
    setItems((items) => [...items, item])
  }

  function handleDeleteItem(id) {
    setItems((items) => items.filter((item) => item.id !== id))
  }

  function handleToggleItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item,
      ),
    )
  }

  function handleClearList() {
    if (items.length > 0) {
      const confirmed = window.confirm(
        'are you sure you want to delete all items',
        )
        if (confirmed) setItems([])
    } else {
        return
    }
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItem} />
      <PackingList
        items={items}
        onDeleteItems={handleDeleteItem}
        onToggleItem={handleToggleItem}
        onClearList={handleClearList}
      />
      <Stats items={items} />
    </div>
  )
}








