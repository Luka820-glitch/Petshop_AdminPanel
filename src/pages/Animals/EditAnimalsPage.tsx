import { Title } from '../styledComponents/Pages.styled';
import AnimalsForm from '../../components/FeaturedComponents/AnimalForm/AnimalsForm';
import { useNavigate, useParams } from 'react-router-dom';
import useFetch from '../../components/FeaturedComponents/hooks/Fetch/useFetch';
import type { AnimalDataInterface, AnimalsResponseInterface, AnimalsUpdateRequestInterface } from './AnimalsPageInterfaces';
import useRequest from '../../components/FeaturedComponents/hooks/Request/useRequest';

const EditAnimalsPage: React.FC = () => {
  const { animalsId } = useParams();
  if (!animalsId) return <p>Invalid animal ID</p>;

  const navigate = useNavigate();

  const { response, loading, error } = useFetch<AnimalsResponseInterface>({
    url: `http://localhost:5000/api/v1/resource/ANIMALS/${animalsId}`,
    method: "GET",
  });

  const { sendRequest } = useRequest<unknown, AnimalsUpdateRequestInterface>({ method: "PUT" });

  const onFormSubmit = (
    id: string,
    selectedCategoryId: string[],
    _data: AnimalDataInterface,
    name: string,
    price: number,
    description: string,
    IsPopular: boolean,
    IsStock: number
  ) => {
    sendRequest(
      {
        data: {
          id,
          selectedCategoryId,
          name,
          price,
          description,
          IsPopular,
          IsStock
        },
      },
      `http://localhost:5000/api/v1/resource/ANIMALS/${animalsId}`
    ).then(() => navigate("/animals"));
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{(error as Error).message}</p>;

  const animalData: AnimalDataInterface = response?.data ?? {
    id: animalsId, 
    name: '',
    price: 0,
    description: '',
    IsPopular: false,
    IsStock: 0,
    selectedCategoryId: [''],
  };

  return (
    <div>
      <Title>Edit Animals</Title>
      <AnimalsForm
        onFormSubmit={onFormSubmit}
        id={animalsId}
        selectedCategoryId={animalData.selectedCategoryId}
        data={animalData}
        name={animalData.name}
        price={animalData.price}
        description={animalData.description}
        IsPopular={animalData.IsPopular}
        IsStock={animalData.IsStock}
      />
    </div>
  );
};

export default EditAnimalsPage;
