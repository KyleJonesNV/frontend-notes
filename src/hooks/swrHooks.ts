import { getAllForUser, getAllNotes } from '@/queries/queries'
import { Topic } from '@/types/types'
import useSWR from 'swr'

export const userId = '1d7ee7f0-36f5-4e33-a766-26981e62d9cf'

export function useUserTopics() {
  const query = { id: userId }
  const { data, error, isLoading, mutate: mutateTopic } = useSWR(query, getAllForUser)

  const topics = data?.body as Topic[]

  return { topics, error, isLoading, mutateTopic }
}

export function useNotesForTopic(topic: Topic | undefined) {
  const query = {
    UserID: userId,
    Title: topic?.Title,
  }
  const { data: notesData, error, isLoading, mutate: mutateNotes } = useSWR(query, getAllNotes)

  const notesForTopic = notesData?.body as Topic

  return {notesForTopic, error, isLoading, mutateNotes}
}
