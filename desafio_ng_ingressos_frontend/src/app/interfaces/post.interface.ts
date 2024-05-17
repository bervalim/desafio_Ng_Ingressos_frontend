export interface IPostResponse {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: Date;
}

export type TCreatePostRequest = Omit<IPostResponse, 'id' | 'createdAt'>;

export type TUpdatePostRequest = Partial<
  Omit<IPostResponse, 'id' | 'author' | 'createdAt'>
>;

export type TCreatePostFormData = Omit<TCreatePostRequest, 'author'>;
