import { addNote, deleteNote, getAllForUser, getAllNotes, insertTopic } from '@/queries/queries'
import { useCallback, useState } from 'react'
import useSWR from 'swr'
import NoteEditor from '../NoteEditor/NoteEditor'
import NoteCard from '../NoteCard/NoteCard'

export type Note = {
  Title: string
  Content: string
  CreatedAt?: Date
  UpdatedAt?: Date
}

export type Topic = {
  Title: string
  CreatedAt: Date
  UpdatedAt: Date
  Notes: Note[]
}

const userId = '1d7ee7f0-36f5-4e33-a766-26981e62d9cf'

const Content = () => {
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null)

  const query = { id: userId }
  const { data, error, isLoading, mutate } = useSWR(query, getAllForUser)

  const topics = data?.body as Topic[]

  const { data: notesData, mutate: mutateNotes } = useSWR(
    {
      UserID: userId,
      Title: selectedTopic?.Title,
    },
    getAllNotes,
  )

  const fetchedTopic = notesData?.body as Topic

  const handleEnter = async (newTopic: any) => {
    await insertTopic(newTopic)
    mutate()
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

  if (error) return <div>Failed to load</div>
  // if (notesError) return <div>Failed to load: {notesError.error}</div>

  return (
    <div className="mx-5 mt-5 grid sm:grid-cols-1 lg:grid-cols-4 gap-2">
      <div className="col-span-1">
        <ul className="menu rounded-box bg-base-100 p-2">
          {topics?.map((topic: Topic) => (
            <li key={topic.Title}>
              <a
                href="#"
                onClick={(evt) => {
                  // evt.preventDefault()
                  onSelectTopic(topic)
                }}
              >
                {topic.Title}
              </a>
            </li>
          ))}
        </ul>
        <div className="divider"></div>
        <input
          type="text"
          placeholder="New Topic"
          className="input-bordered input input-sm w-full mb-12"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              const newTopic = {
                userID: userId,
                title: e.currentTarget.value,
              }
              handleEnter(newTopic)
            }
          }}
        />
      </div>
      <div className="col-span-3">
        {selectedTopic && (
          <>
            {fetchedTopic?.Notes?.map((note, i) => (
              <div
                key={i}
                className="mt-5"
              >
                <NoteCard
                  note={note}
                  onDelete={() => onDelete(note)}
                />
              </div>
            ))}
            <NoteEditor onSave={onSave} />
          </>
        )}
      </div>
    </div>
  )
}

export default Content
