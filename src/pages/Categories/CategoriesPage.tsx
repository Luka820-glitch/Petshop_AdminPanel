import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useFetch from '../../components/FeaturedComponents/hooks/Fetch/useFetch';
import useRequest from '../../components/FeaturedComponents/hooks/Request/useRequest';
import {
  Wrapper,
  DeleteButton,
  EditButton,
  StyledTable,
  Title,
} from '../styledComponents/Pages.styled';
import type { CategoryInterface } from './CategoriesPageInterfaces';
import type { AnimalInterface } from '../Animals/AnimalsPageInterfaces';


const CategoriesPage: React.FC = () => {
  const { response, error, loading, resendRequest } = useFetch<CategoryInterface[]>({
    url: 'http://localhost:5000/api/v1/resource/CATEGORIES',
    method: 'GET',
  });

  const { sendRequest } = useRequest<unknown>({ method: 'DELETE' });

  const navigate = useNavigate();

  const { response: responseAnimals } = useFetch<AnimalInterface[]>({
  url: 'http://localhost:5000/api/v1/resource/ANIMALS',
  method: 'GET',
});

const updateAnimalRequest = useRequest<unknown, { data: AnimalInterface['data'] }>({ method: 'PUT' });



  const onDelete = async (id: string) => {
  const animalsWithCategory = responseAnimals?.filter(animal =>
    animal.data?.selectedCategoryId?.includes(id)
  );

  if (animalsWithCategory && animalsWithCategory.length > 0) {
    await Promise.all(
      animalsWithCategory.map((animal) => {
        const updatedCategories = animal.data.selectedCategoryId.filter((catId) => catId !== id);
        return updateAnimalRequest.sendRequest(
          { data: { ...animal.data, selectedCategoryId: updatedCategories } },
          `http://localhost:5000/api/v1/resource/ANIMALS/${animal.id}`
        );
      })
    );
  }

  sendRequest(undefined, `http://localhost:5000/api/v1/resource/CATEGORIES/${id}`)
    .then(() => resendRequest());
};


  const onEdit = (id: string) => {
    navigate(`/categories/edit/${id}`);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{(error as Error).message}</p>;

  return (
    <div>
      <Title>Categories</Title>
      <Link to="/categories/add">Add Categories</Link>

      {response?.map((cat) => (
        <Wrapper key={cat.id}>
          <StyledTable>
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{cat.data?.id || cat.id}</td>
                <td>{cat.data?.name || cat.name || ''}</td>
                <td>{cat.data?.description || cat.description || ''}</td>
                <td>
                  <EditButton onClick={() => onEdit(cat.id)}>Edit</EditButton>
                  <DeleteButton onClick={() => onDelete(cat.id)}>Delete</DeleteButton>
                </td>
              </tr>
            </tbody>
          </StyledTable>
        </Wrapper>
      ))}
    </div>
  );
};

export default CategoriesPage;






