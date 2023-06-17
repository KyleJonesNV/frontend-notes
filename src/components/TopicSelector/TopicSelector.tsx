import { Topic } from '@/types/types'
import { useState } from 'react'

function TopicSelector({ topics, onSelectTopic, onAddTopic }: { topics: Topic[]; onSelectTopic: (topic: Topic) => void; onAddTopic: (name: string) => void }) {
  const [topicName, setTopicName] = useState<string>('')

  const handleAddTopic = () => {
    if (topicName !== '') {
      onAddTopic(topicName)
    }
    setTopicName('')
  }

  return (
    <>
      <h2 className="text-lg font-bold p-2">Topics</h2>
      <ul className="menu rounded-box bg-base-100 p-2">
        {topics?.map((topic: Topic) => (
          <li key={topic.Title}>
            <a
              href="#"
              onClick={() => {
                onSelectTopic(topic)
              }}>
              {topic.Title}
            </a>
          </li>
        ))}
      </ul>
      <div className="divider"></div>
      <div className="grid gap-2 grid-flow-col">
        <button className="btn btn-sm btn-neutral col-span-1" onClick={handleAddTopic}>
          Add
        </button>
        <input
          type="text"
          placeholder="New Topic"
          className="input-bordered input input-sm mb-5 col-span-5"
          onChange={(e) => {
            setTopicName(e.currentTarget.value)
          }}
          value={topicName}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleAddTopic()
            }
          }}
        />
      </div>
    </>
  )
}

export default TopicSelector
