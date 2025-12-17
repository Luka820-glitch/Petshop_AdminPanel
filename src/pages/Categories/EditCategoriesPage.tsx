import { useNavigate, useParams } from 'react-router-dom';
import useFetch from '../../components/FeaturedComponents/hooks/Fetch/useFetch';
import useRequest from '../../components/FeaturedComponents/hooks/Request/useRequest';
import { Title } from '../styledComponents/Pages.styled';
import CategoriesForm from '../../components/FeaturedComponents/CategoriesForm/CategoriesForm';
import type { CategoryResponseInterface, CategoryUpdateRequestInterface } from './CategoriesPageInterfaces';




const EditCategoriesPage: React.FC = () => {
  const { categoriesId } = useParams();
  const navigate = useNavigate();

  
  const { response, loading, error } = useFetch<CategoryResponseInterface>({
    url: `http://localhost:5000/api/v1/resource/CATEGORIES/${categoriesId}`,
    method: "GET",
  });


  const { sendRequest } = useRequest<unknown, CategoryUpdateRequestInterface>({ method: "PUT" });

  const onFormSubmit = (name: string, description: string) => {
    sendRequest(
      {
        data: {
          id: categoriesId,
          name,
          description,
        },
      },
      `http://localhost:5000/api/v1/resource/CATEGORIES/${categoriesId}`
    ).then(() => navigate("/categories"));
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{(error as Error).message}</p>;

  return (
    <div>
      <Title>Edit Categories</Title>
      <CategoriesForm
        onFormSubmit={onFormSubmit}
        title={response?.data?.name ?? ""} 
        description={response?.data?.description ?? ""}
      />
    </div>
  );
};

export default EditCategoriesPage;
