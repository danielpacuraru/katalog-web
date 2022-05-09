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
  name: string,
  maker: string,
  thumbnail?: string,
  doc: string,
  category?: string
}

export interface ArticleBatch {
  items: Article[],
  count: number
}

export enum ArticleStatus {
  SUCCESS = 'SUCCESS',
  QUEUED = 'QUEUED',
  DUPLICATE = 'DUPLICATE',
  MISSING = 'MISSING'
}

export interface ArticleBox {
  code: string,
  status: ArticleStatus,
  data?: any
}
