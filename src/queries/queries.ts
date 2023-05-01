import { Note } from '@/components/Content/Content'
import { environment } from '../../environment'

export const getAllForUser = (query: any) => {
  return fetch(environment.api + 'getAllForUser', {
    method: 'POST',
    body: JSON.stringify(query),
  }).then((res) => res.json())
}

export const insertTopic = (topic: any) => {
  console.log(topic)
  return fetch(environment.api + 'insertTopic', {
    method: 'POST',
    body: JSON.stringify(topic),
  }).then((res) => res.json())
}

export type InsertNoteRequest = {
	UserID: string
	Title: string
	Note: Note
}

export const addNote = (query: InsertNoteRequest) => {
  return fetch(environment.api + 'insertNote', {
    method: 'POST',
    body: JSON.stringify(query),
  }).then((res) => res.json())
}

export type GetAllNotesRequest = {
	UserID: string 
	Title: string
}

export const getAllNotes = (query: GetAllNotesRequest) => {
  if (query.Title === undefined || query.UserID === undefined) {
    return
  }

  return fetch(environment.api + 'getAllNotes', {
    method: 'POST',
    body: JSON.stringify(query),
  }).then((res) => res.json())
}

export type DeleteNoteRequest = {
	userId: string
	title: string
	noteTitle: string
}

export const deleteNote = (query: DeleteNoteRequest) => {
  console.log(query)
  return fetch(environment.api + 'deleteNote', {
    method: 'POST',
    body: JSON.stringify(query),
  }).then((res) => res.json())
}
