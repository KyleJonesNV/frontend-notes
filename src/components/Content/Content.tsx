import { addNote, deleteNote, insertTopic } from '@/queries/queries'
import { useCallback, useState } from 'react'
import NoteEditor from '../NoteEditor/NoteEditor'
import NoteCard from '../NoteCard/NoteCard'
import TopicSelector from '../TopicSelector/TopicSelector'
import { Note, Topic } from '@/types/types'
import { useNotesForTopic, useUserTopics, userId } from '@/hooks/swrHooks'
import Notes from '../Notes/Notes'

const Content = () => {
  const [selectedTopic, setSelectedTopic] = useState<Topic | undefined>(undefined)

  const { topics, error: userTopicsError, mutateTopic } = useUserTopics()
  const { notesForTopic, error: notesForTopicError, mutateNotes } = useNotesForTopic(selectedTopic)

  const onSave = useCallback(
    async (title: string, note: Note) => {
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

  if (userTopicsError) return <div>Failed to load user topics: {userTopicsError.error}</div>
  if (notesForTopicError) return <div>Failed to load notes: {notesForTopicError.error}</div>

  return (
    <>
      <div className="mx-5 mt-5 grid sm:grid-cols-1 lg:grid-cols-4">
        <div className="col-span-1">
          <TopicSelector topics={topics} onSelectTopic={onSelectTopic} onAddTopic={onAddTopic} />
        </div>
        <div className="lg:mx-10 lg:col-span-3 sm:col-span-1">
          <Notes selectedTopic={selectedTopic} notes={notesForTopic?.Notes} onDelete={onDelete} />
          <NoteEditor onSave={onSave} selectedTopic={selectedTopic} selectableTopics={topics} />
        </div>
      </div>
    </>
  )
}

export default Content
