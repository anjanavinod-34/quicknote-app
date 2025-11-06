import { useEffect, useState, useRef } from 'react'
import './App.css'

function App() {
  const [note, setNote] = useState("")
  const [noteList, setNoteList] = useState([])
  const isFirstLoad = useRef(true) // ✅ Track initial load

  // ✅ Load from localStorage
  useEffect(() => {
    try {
      const savedNotes = JSON.parse(localStorage.getItem("notes"))
      if (Array.isArray(savedNotes)) {
        setNoteList(savedNotes)
      }
    } catch {
      setNoteList([]) // fallback if corrupted
    }
  }, [])

  // ✅ Save notes only AFTER first load
  useEffect(() => {
    if (isFirstLoad.current) {
      isFirstLoad.current = false
      return
    }
    localStorage.setItem("notes", JSON.stringify(noteList))
  }, [noteList])

  const addNote = () => {
    if (!note.trim()) return
    setNoteList(prev => [...prev, note])
    setNote("") // clear input
  }

  const deleteNote = (item) => {
    setNoteList(prev => prev.filter(n => n !== item))
  }

  return (
    <div className='container my-5'>
      <h3 className='text-center fw-bolder fs-1'>QUICKNOTE APP</h3>

      <div className="d-flex justify-content-center align-items-center my-5 p-5">
        <input
          value={note}
          onChange={e => setNote(e.target.value)}
          type="text"
          className="form-control me-2"
          placeholder='Enter your Note'
        />
        <button onClick={addNote} className='btn btn-secondary'>ADD</button>
      </div>

      <ul className="list-group w-100 p-2">
        {noteList.length === 0 ? (
          <li className="list-group-item text-center text-muted">No notes yet.</li>
        ) : (
          noteList.map((item, index) => (
            <li className="list-group-item fs-4 fw-bold my-3 d-flex justify-content-between align-items-center" key={index}>
              {item}
              <button onClick={() => deleteNote(item)} className='btn text-danger'>
                <i className="fa-solid fa-trash bg-light"></i>
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  )
}

export default App
