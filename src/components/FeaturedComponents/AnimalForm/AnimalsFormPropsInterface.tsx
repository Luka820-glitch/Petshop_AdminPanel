import type { AnimalDataInterface } from "../../../pages/Animals/AnimalsPageInterfaces";


export interface AnimalsFormPropsInterface {
  onFormSubmit: (
    id: string,
    selectedCategoryIds: string[], 
    data: AnimalDataInterface,
    name: string,
    price: number,
    description: string,
    IsPopular: boolean,
    IsStock: number
  ) => void;
  name: string;
  price: number;
  description: string;
  IsPopular: boolean;
  IsStock: number;
  id: string;
  selectedCategoryId?: string[]; 
  data: AnimalDataInterface;
}
