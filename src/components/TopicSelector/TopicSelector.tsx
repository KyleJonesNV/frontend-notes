import { Topic } from '@/types/types'
import { useState } from 'react'

function TopicSelector({ topics, onSelectTopic, onAddTopic }: { topics: Topic[]; onSelectTopic: (topic: Topic) => void; onAddTopic: (name: string) => void }) {
  const [topicName, setTopicName] = useState<string>('')
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
      <div className="row-auto gap-2 ml-2">
        <button
          className="btn btn-sm btn-neutral mr-2"
          onClick={() => {
            if (topicName !== '') {
              onAddTopic(topicName)
            }
          }}>
          Add
        </button>
        <input
          type="text"
          placeholder="New Topic"
          className="input-bordered input input-sm mb-12"
          onChange={(e) => {
            setTopicName(e.currentTarget.value)
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && topicName !== '') {
              onAddTopic(topicName)
            }
          }}
        />
      </div>
    </>
  )
}

export default TopicSelector
