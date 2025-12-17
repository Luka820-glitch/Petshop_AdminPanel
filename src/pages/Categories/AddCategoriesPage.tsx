import { useNavigate } from "react-router-dom";
import CategoriesForm from "../../components/FeaturedComponents/CategoriesForm/CategoriesForm";
import useRequest from "../../components/FeaturedComponents/hooks/Request/useRequest";
import type { CreateCategoryRequestInterface, CreateCategoryResponse } from "./CategoriesPageInterfaces";
import { Title } from "../styledComponents/Pages.styled";


const AddCategoriesPage: React.FC = () => {
  const navigate = useNavigate();

  const { sendRequest, loading } = useRequest<
    CreateCategoryResponse,
    CreateCategoryRequestInterface
  >({
    url: "http://localhost:5000/api/v1/resource/CATEGORIES",
    method: "POST",
  });


  const onSubmit = (name: string, description: string) => {
    const body: CreateCategoryRequestInterface = {
      data: [{ name, description }],
    };

    sendRequest(body)
      .then(() => navigate("/categories"))
      .catch(console.error);
  };

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <Title >Add Categories</Title>
      <CategoriesForm title="" description="" onFormSubmit={onSubmit} />
    </>
  );
};

export default AddCategoriesPage;
