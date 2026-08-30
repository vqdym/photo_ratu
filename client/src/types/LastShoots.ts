export interface LastShoots {
  _id: string;
  title: string;
  coverImage: string;
  category: string;
}

export interface LastShootsData {
  data: LastShoots[];
}
