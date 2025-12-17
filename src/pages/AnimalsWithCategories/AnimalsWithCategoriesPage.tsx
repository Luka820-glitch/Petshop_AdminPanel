import React from 'react';
import {
  DeleteButton,
  StyledTable,
  StyledTableNew,
  Title,
  TitleMini,
  Wrapper
} from '../styledComponents/Pages.styled';
import useFetch from '../../components/FeaturedComponents/hooks/Fetch/useFetch';
import useRequest from '../../components/FeaturedComponents/hooks/Request/useRequest';
import type {
  AnimalInterface,
  AnimalsWithCategoriesInterface,
  CategoryInterface
} from './AnimalsWithCategoriesPageInterfaces';

const AnimalsWithCategoriesPage: React.FC = () => {
  const {
    response: animals,
    loading: animalsLoading,
    error: animalsError,
    resendRequest: reloadAnimals
  } = useFetch<AnimalInterface[]>({
    url: 'http://localhost:5000/api/v1/resource/ANIMALS',
    method: 'GET'
  });

  const {
    response: categories,
    loading: categoriesLoading,
    error: categoriesError
  } = useFetch<CategoryInterface[]>({
    url: 'http://localhost:5000/api/v1/resource/CATEGORIES',
    method: 'GET'
  });

  const putRequest = useRequest<unknown, { data: AnimalInterface['data'] }>({
    method: 'PUT'
  });

  const onDeleteCategory = async (categoryId: string) => {
    if (!animals) return;

    const animalsInCategory = animals.filter((animal) =>
      animal.data.selectedCategoryId?.includes(categoryId)
    );

    try {
      await Promise.all(
        animalsInCategory.map((animal) => {
          const updatedCategories = animal.data.selectedCategoryId.filter(
            (id) => id !== categoryId
          );

          return putRequest.sendRequest(
            {
              data: {
                ...animal.data,
                selectedCategoryId: updatedCategories
              }
            },
            `http://localhost:5000/api/v1/resource/ANIMALS/${animal.id}`
          );
        })
      );

      reloadAnimals();
    } catch (error) {
      console.error('Failed to unlink animals from category:', error);
    }
  };

  const onRemoveFromCategory = (animalResourceId: string, categoryId: string) => {
    const animal = animals?.find((a) => a.id === animalResourceId);
    if (!animal) {
      console.error('Animal not found:', animalResourceId);
      return;
    }

    const updatedCategories = animal.data.selectedCategoryId.filter((id) => id !== categoryId);

    const updatedData = {
      ...animal.data,
      selectedCategoryId: updatedCategories
    };

    putRequest
      .sendRequest(
        { data: updatedData },
        `http://localhost:5000/api/v1/resource/ANIMALS/${animalResourceId}`
      )
      .then(() => reloadAnimals())
      .catch((err) => console.error('Update failed:', err));
  };

  if (animalsLoading || categoriesLoading) return <p>Loading...</p>;
  if (animalsError || categoriesError) return <p>Error loading data</p>;
  if (!animals || !categories) return <p>Data is missing</p>;

  const grouped: AnimalsWithCategoriesInterface[] = categories
    .map((cat) => ({
      category_id: cat.id,
      category_name: cat.data.name,
      animals: animals
        .filter((animal) => animal.data.selectedCategoryId?.includes(cat.id))
        .map((a) => ({
          id: a.id,
          name: a.data.name
        }))
    }))
    .filter((group) => group.animals.length > 0);

 
 const animalsWithoutCategories = animals.filter((animal) => {
  const ids = animal.data.selectedCategoryId;
  return (
    !ids || 
    ids.length === 0 || 
    (ids.length === 1 && ids[0].trim() === "")
  );
});


  return (
    <div>
      <Title>Animals by Category</Title>

      {grouped.length === 0 ? (
        <p>No categories with animals found.</p>
      ) : (
        grouped.map((cat) => (
          <Wrapper key={cat.category_id}>
            <StyledTableNew>
              <thead>
                <tr>
                  <th>
                    <TitleMini>
                      Category: {cat.category_name} (ID: {cat.category_id}){' '}
                      <DeleteButton onClick={() => onDeleteCategory(cat.category_id)}>
                        Remove Category
                      </DeleteButton>
                    </TitleMini>
                  </th>
                </tr>
              </thead>
            </StyledTableNew>

            <StyledTable>
              <thead>
                <tr>
                  <th>Animal ID</th>
                  <th>Animal Name</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {cat.animals.map((animal) => (
                  <tr key={animal.id}>
                    <td>{animal.id}</td>
                    <td>{animal.name}</td>
                    <td>
                      <DeleteButton
                        onClick={() => onRemoveFromCategory(animal.id, cat.category_id)}
                      >
                        Remove Animal from Category
                      </DeleteButton>
                    </td>
                  </tr>
                ))}
              </tbody>
            </StyledTable>
          </Wrapper>
        ))
      )}

    
      {animalsWithoutCategories.length > 0 && (
        <Wrapper>
          <StyledTableNew>
            <thead>
              <tr>
                <th>
                  <TitleMini>Category: Animals Without Categories (ID: 1)</TitleMini>
                </th>
              </tr>
            </thead>
          </StyledTableNew>

          <StyledTable>
            <thead>
              <tr>
                <th>Animal ID</th>
                <th>Animal Name</th>
              </tr>
            </thead>
            <tbody>
              {animalsWithoutCategories.map((animal) => (
                <tr key={animal.id}>
                  <td>{animal.id}</td>
                  <td>{animal.data.name}</td>
                </tr>
              ))}
            </tbody>
          </StyledTable>
        </Wrapper>
      )}
    </div>
  );
};

export default AnimalsWithCategoriesPage;
