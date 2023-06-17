import { addNote, deleteNote, insertTopic } from '@/queries/queries'
import { useCallback, useState } from 'react'
import NoteEditor from '../NoteEditor/NoteEditor'
import NoteCard from '../NoteCard/NoteCard'
import TopicSelector from '../TopicSelector/TopicSelector'
import { Note, Topic } from '@/types/types'
import { useNotesForTopic, useUserTopics, userId } from '@/hooks/swrHooks'

const Content = () => {
  const [selectedTopic, setSelectedTopic] = useState<Topic | undefined>(undefined)

  const { topics, error: userTopicsError, mutateTopic } = useUserTopics()
  const { notesForTopic, error: notesForTopicsError, mutateNotes } = useNotesForTopic(selectedTopic)

  const onAddTopic = async (name: string) => {
    const newTopic = {
      userID: userId,
      title: name,
    }
    await insertTopic(newTopic)
    mutateTopic()
  }

  const onSelectTopic = (topic: Topic) => {
    setSelectedTopic(topic)
  }

  const onSave = useCallback(
    async (title: string, note: Note ) => {
      if (!title || !note) {
        return
      }

      await addNote({
        UserID: userId,
        Title: title,
        Note: note,
      })

      mutateNotes()
    },
    [mutateNotes],
  )

  const onDelete = useCallback(
    async (note: Note) => {
      if (!selectedTopic) {
        return
      }

      await deleteNote({
        userId: userId,
        title: selectedTopic.Title,
        noteTitle: note.Title,
      })

      mutateNotes()
    },
    [selectedTopic, mutateNotes],
  )

  if (userTopicsError) return <div>Failed to load user topics: {userTopicsError.error}</div>
  if (notesForTopicsError) return <div>Failed to load notes: {notesForTopicsError.error}</div>

  return (
    <>
      <div className="mx-5 mt-5 grid sm:grid-cols-1 lg:grid-cols-4">
        <div className="col-span-1">
          <TopicSelector topics={topics} onSelectTopic={onSelectTopic} onAddTopic={onAddTopic} />
        </div>
        <div className="mx-10 col-span-3">
          {selectedTopic ? (
            <>
              <div className="card border mt-5">
                <div className="card-body">
                  <h1 className="font-bold text-4xl p-2">{selectedTopic.Title}</h1>
                </div>
              </div>
              {notesForTopic?.Notes?.map((note, i) => (
                <div key={i} className="mt-5">
                  <NoteCard note={note} onDelete={() => onDelete(note)} />
                </div>
              ))}              
            </>
          ) : (
            <div className="card border mt-5">
              <div className="card-body">
                <h1 className="font-bold text-4xl p-2">What is on your mind today</h1>
              </div>
            </div>
          )}
          <NoteEditor onSave={onSave} selectedTopic={selectedTopic} selectableTopics={topics} />
        </div>
      </div>
    </>
  )
}

export default Content
