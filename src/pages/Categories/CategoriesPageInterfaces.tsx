
export interface CategoryDataInterface {
  id: string;
  name: string;
  description: string;
}

export interface CategoryInterface {
  id: string;
  data: CategoryDataInterface;
  name: string;
  description: string;
}

export interface CategoryPayloadInterface {
  name: string;
  description: string;
}

export interface CreateCategoryRequestInterface {
  data: CategoryPayloadInterface[];
}

export interface CreateCategoryResponse {
  success: boolean;
  message?: string;
  createdItems?: CategoryPayloadInterface[];
}


export interface CategoryResponseInterface {
  data: {
    id: string;
    name: string;
    description: string;
  };
};


export interface CategoryUpdateRequestInterface {
  data: {
    id: string | undefined;
    name: string;
    description: string;
  };
};