import {useState} from "react"
function Form({ onAddItems }) {
  const resetInput = () => {
    setDescription('')
  }
  const resetQuantity = () => {
    setQuantity('')
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!description) return
    const newItem = { description, quantity, packed: false, id: Date.now() }

    onAddItems(newItem)
    resetInput()
    resetQuantity()
  }

  const [description, setDescription] = useState('')
  const [quantity, setQuantity] = useState(1)

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>what do you need for your 😍 trip?</h3>
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, index) => index + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="item..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>Add</button>
    </form>
  )
}

export default Form
