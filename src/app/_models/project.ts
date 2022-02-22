export interface Article {
  id: string,
  tag: string,
  name: string,
  maker: string,
  thumbnail: string,
  doc: string,
  code?: string
}

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
