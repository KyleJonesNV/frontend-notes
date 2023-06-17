import { addNote, deleteNote, insertTopic } from '@/queries/queries'
import { useCallback, useState } from 'react'
import NoteEditor from '../NoteEditor/NoteEditor'
import NoteCard from '../NoteCard/NoteCard'
import TopicSelector from '../TopicSelector/TopicSelector'
import { Note, Topic } from '@/types/types'
import { useNotesForTopic, useUserTopics, userId } from '@/hooks/swrHooks'

const Content = () => {
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null)

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
    async (note: Note) => {
      if (!selectedTopic) {
        return
      }

      await addNote({
        UserID: userId,
        Title: selectedTopic.Title,
        Note: note,
      })

      mutateNotes()
    },
    [selectedTopic, mutateNotes],
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
        <div className="mx-10 mt-10 col-span-3">
          {selectedTopic && (
            <>
              {notesForTopic?.Notes?.map((note, i) => (
                <div key={i} className="mt-5">
                  <NoteCard note={note} onDelete={() => onDelete(note)} />
                </div>
              ))}
              <NoteEditor onSave={onSave} />
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default Content
