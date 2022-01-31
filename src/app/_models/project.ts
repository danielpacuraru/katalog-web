export interface Article {
  name: string
}

export interface Project {
  id?: string;
  name: string,
  title: string,
  description: string,
  articles: Article[]
}
