import { useNavigate } from "react-router-dom";
import useRequest from "../../components/FeaturedComponents/hooks/Request/useRequest";
import AnimalsForm from "../../components/FeaturedComponents/AnimalForm/AnimalsForm";
import type { AnimalDataInterface, CreateAnimalsRequestInterface, CreateAnimalsResponseInterface } from "./AnimalsPageInterfaces";
import { Title } from "../styledComponents/Pages.styled";


const defaultAnimalData: AnimalDataInterface = {
  id: "",
  selectedCategoryId: [],
  name: "",
  price: 0,
  description: "",
  IsPopular: false,
  IsStock: 0,
};

const AddAnimalsPage: React.FC = () => {
  const navigate = useNavigate();

  const { sendRequest, loading } = useRequest<
    CreateAnimalsResponseInterface,
    CreateAnimalsRequestInterface
  >({
    url: "http://localhost:5000/api/v1/resource/ANIMALS",
    method: "POST",
  });


  const onSubmit = (id:string, selectedCategoryId:string[], data:AnimalDataInterface, name: string, price: number, description: string, IsPopular:boolean, IsStock:number) => {
    const body: CreateAnimalsRequestInterface = {
      data: [{id, selectedCategoryId, data, name, price, description, IsPopular, IsStock }],
    };

    sendRequest(body)
      .then(() => navigate("/animals"))
      .catch(console.error);
  };

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <Title >Add Animals</Title>
      <AnimalsForm id="" selectedCategoryId={[]} data={defaultAnimalData} name=""  price={0} description="" IsPopular={false} IsStock={0} onFormSubmit={onSubmit} />
    </>
  );
};

export default AddAnimalsPage;
