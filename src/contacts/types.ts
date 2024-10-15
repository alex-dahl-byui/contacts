export interface IContact {
  id: string;
  name: string;
  email: string;
  phone: string;
  imageUrl: string;
  group: null | IContact[];
}
