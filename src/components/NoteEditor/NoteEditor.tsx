import { useState } from 'react'
import { Note } from '../Content/Content'
import CodeMirror from '@uiw/react-codemirror'
import { markdown, markdownLanguage } from '@codemirror/lang-markdown'
import { languages } from '@codemirror/language-data'

const NoteEditor = ({onSave} : {onSave: (note: Note) => void}) => {
  const [title, setTitle] = useState<string>('')
  const [content, setContent] = useState<string>('')

  return (
    <div className="card border mt-5">
      <div className="card-body">
        <h2 className="card-title">
          <input
            type="text"
            placeholder="Note Title"
            className="input input-bordered input-primary w-full input-md"
            value={title}
            onChange={(e) => setTitle(e.currentTarget.value)}
          />
        </h2>
        <CodeMirror
          className="border border-gray-400"
          height="200px"
          value={content}
          onChange={setContent}
          extensions={[markdown({ base: markdownLanguage, codeLanguages: languages })]}
        />
        <div className="card-actions justify-end">
          <button
            disabled={title === '' || content === ''}
            onClick={() => {
              onSave({
                Title: title,
                Content: content,
              })
              setTitle('')
              setContent('')
            }}
            className="btn btn-primary"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  )
}

export default NoteEditor
