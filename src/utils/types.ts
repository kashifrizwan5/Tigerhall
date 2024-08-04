import { SetStateAction } from "react";

export interface Podcast {
  name: string;
  categories: Category[];
  experts: Expert[];
  image: Image;
}

export interface Category {
  name: string;
}

export interface Expert {
  firstName: string;
  lasttName?: string;
  title?: string;
  company?: string;
}

export interface Image {
  uri: string;
}

export interface SearchProps {
  query: string;
  setQuery: React.Dispatch<SetStateAction<string>>;
}

export interface UseFetch {
  data: Podcast[];
  isLoading: boolean;
  error: boolean;
}
