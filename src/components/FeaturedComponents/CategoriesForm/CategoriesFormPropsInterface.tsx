export interface CategoriesFormPropsInterface {
  onFormSubmit: (title: string, description: string) => void;
  title?: string;
  description: string;
}