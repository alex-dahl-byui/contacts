export interface Document {
  name?: string;
  description?: string;
  url?: string;
  id: string;
  children?: Document[];
}
