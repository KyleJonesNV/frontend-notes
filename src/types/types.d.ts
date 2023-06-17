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