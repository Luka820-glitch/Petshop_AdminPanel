
export interface AnimalDataInterface {
  id:string;
  selectedCategoryId:string[];
  name:string;
  price:number;
  description:string;
  IsPopular:boolean;
  IsStock:number;
}

export interface AnimalInterface {
  id:string;
  selectedCategoryId:string[];
  data:AnimalDataInterface;
  name:string;
  price:number;
  description:string;
  IsPopular:boolean;
  IsStock:number;
}

export interface AnimalsPayloadInterface {
  id:string;
  selectedCategoryId:string[];
  name:string;
  price:number;
  description:string;
  IsPopular:boolean;
  IsStock:number;
  data:AnimalDataInterface;
}

export interface CreateAnimalsRequestInterface {
  data:AnimalsPayloadInterface[];
}

export interface CreateAnimalsResponseInterface {
  success:boolean;
  message?:string;
  createdItems?:AnimalsPayloadInterface[];
}

export interface AnimalsResponseInterface {
  data: {
    id:string;
    selectedCategoryId:string[];
    name:string;
    price:number;
    description:string;
    IsPopular:boolean;
    IsStock:number;
  };
};


export interface AnimalsUpdateRequestInterface {
  data: {
    id:string;
    selectedCategoryId:string[];
    name:string;
    price:number;
    description:string;
    IsPopular:boolean;
    IsStock:number;
  };
};