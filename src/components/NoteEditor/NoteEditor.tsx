import { useState } from 'react'
import CodeMirror from '@uiw/react-codemirror'
import { markdown, markdownLanguage } from '@codemirror/lang-markdown'
import { languages } from '@codemirror/language-data'
import { Note, Topic } from '@/types/types'

const NoteEditor = ({ onSave, selectedTopic, selectableTopics }: { onSave: (title: string, note: Note) => void; selectedTopic?: Topic; selectableTopics?: Topic[] }) => {
  const [title, setTitle] = useState<string>('')
  const [content, setContent] = useState<string>('')
  const [selectedTopicTitleInNoteEditor, setSelectedTopicInNoteEditor] = useState<string>(selectableTopics && selectableTopics.length > 0 ? selectableTopics[0].Title : "")

  const handleSave = () => {
    if (!selectedTopic && selectedTopicTitleInNoteEditor === "") {
      return
    }
    onSave(selectedTopic?.Title ?? selectedTopicTitleInNoteEditor, {
      Title: title,
      Content: content,
    })
    setTitle('')
    setContent('')
  }

  return (
    <div className="card border mt-5">
      <div className="card-body">
        {!selectedTopic ? (
          <select onChange={(e) => setSelectedTopicInNoteEditor(e.target.value)} className="select select-primary w-full">
            {selectableTopics?.map((topic) => (
              <option key={topic.Title}>{topic.Title}</option>
            ))}
          </select>
        ) : null}
        <h2 className="card-title">
          <input type="text" placeholder="Note Title" className="input input-bordered input-primary w-full input-md" value={title} onChange={(e) => setTitle(e.currentTarget.value)} />
        </h2>
        <CodeMirror className="border border-gray-400" height="200px" value={content} onChange={setContent} extensions={[markdown({ base: markdownLanguage, codeLanguages: languages })]} />
        <div className="card-actions justify-end">
          <button disabled={title === '' || content === '' || (!selectedTopic && selectedTopicTitleInNoteEditor === "")} onClick={handleSave} className="btn btn-primary">
            Save
          </button>
        </div>
      </div>
    </div>
  )
}

export default NoteEditor
