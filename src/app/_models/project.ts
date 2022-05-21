export interface Project {
  id: string,
  name: string,
  title: string,
  description: string,
  status: ProjectStatus
}

export enum ProjectStatus {
  EMPTY = 'EMPTY',
  QUEUE = 'QUEUE',
  READY = 'READY'
}

export interface Article {
  id: string,
  code: string,
  name?: string,
  maker?: string,
  thumbnail?: string,
  document?: string,
  class?: string,
  category?: string,
  status: ArticleStatus
}

export enum ArticleStatus {
  QUEUE = 'QUEUE',
  ERROR = 'ERROR',
  SUCCESS = 'SUCCESS'
}
