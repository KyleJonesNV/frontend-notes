import { Note, Topic } from '@/types/types'
import NoteCard from '../NoteCard/NoteCard'

function  Notes({ selectedTopic, notes, onDelete }: { selectedTopic: Topic | undefined; notes: Note[]; onDelete: (note: Note) => void }) {
  return (
    <>
      {selectedTopic ? (
        <>
          <div className="card border lg:mt-5 sm:mt-2">
            <div className="card-body">
              <h1 className="font-bold text-4xl p-2">{selectedTopic.Title}</h1>
            </div>
          </div>
          {notes && notes.map((note, i) => (
            <div key={i} className="mt-5">
              <NoteCard note={note} onDelete={() => onDelete(note)} />
            </div>
          ))}
        </>
      ) : (
        <div className="card border lg:mt-5 sm:mt-2">
          <div className="card-body">
            <h1 className="font-bold text-4xl p-2">{`What's on your mind today`}</h1>
          </div>
        </div>
      )}
    </>
  )
}

export default Notes
