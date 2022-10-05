export interface Project {
  id: string,
  name: string,
  articles: number,
  status: ProjectStatus,
  createdAt: Date
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
  group?: string,
  status: ArticleStatus,
  thumbnail?: string
}

export enum ArticleStatus {
  QUEUE = 'QUEUE',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}

export interface Catalog {
  name: string;
  url: string;
  size: number;
  date: Date;
}
