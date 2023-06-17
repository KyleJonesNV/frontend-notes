import { Note } from '@/types/types'
import { useState } from 'react'
import ReactMarkDown from 'react-markdown'

function NoteCard({ note, onDelete }: { note: Note, onDelete: () => void }) {
  const [isExpanded, setIsExpanded] = useState<Boolean>(true)

  return (
    <div className={`collapse collapse-arrow border border-base-300 bg-base-100 rounded-box shadow-lg ${isExpanded ? "collapse-open" : "collapse-close"}`}>
      <input
        type="checkbox"
        className="peer"
        onClick={() => setIsExpanded(!isExpanded)}
      />
      <div className="collapse-title text-xl font-bold">{note.Title}</div>
      <div className="collapse-content">
        <article className="prose lg:prose-xl">
          <ReactMarkDown>{note.Content}</ReactMarkDown>
        </article>
        <div className="flex justify-end">
          <button onClick={onDelete} className="btn btn-warning btn-xs">Delete</button>
        </div>
      </div>
    </div>
  )
}

export default NoteCard
