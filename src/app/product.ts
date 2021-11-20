export interface Product {
  id: string,
  name: string,
  imageUrl: string,
  docUrl: string,
  manufacturer: string
}

export interface ProductBox {
  id: string,
  status: string,
  data: Product | null
}
