import React from 'react'
import type { AnimalInterface } from './AnimalsPageInterfaces';
import useFetch from '../../components/FeaturedComponents/hooks/Fetch/useFetch';
import useRequest from '../../components/FeaturedComponents/hooks/Request/useRequest';
import { Link, useNavigate } from 'react-router-dom';
import { DeleteButton, EditButton, StyledTable, Title, Wrapper } from '../styledComponents/Pages.styled';

const AnimalsPage: React.FC = () => {
const { response, error, loading, resendRequest } = useFetch<AnimalInterface[]>({
    url: 'http://localhost:5000/api/v1/resource/ANIMALS',
    method: 'GET',
  });

  const { sendRequest } = useRequest<unknown>({ method: 'DELETE' });

  const navigate = useNavigate();

  const onDelete = (id: string) => {
    sendRequest(undefined, `http://localhost:5000/api/v1/resource/ANIMALS/${id}`)
      .then(() => resendRequest());
  };

  const onEdit = (id: string) => {
    navigate(`/animals/edit/${id}`);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{(error as Error).message}</p>;

  return (
    <div>
      <Title>Animals</Title>
      <Link to="/animals/add">Add Animals</Link>

      {response?.map((anim) => (
        <Wrapper key={anim.id}>
          <StyledTable>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Price (GEL)</th>
                <th>Description</th>
                <th>IsPopular</th>
                <th>IsStock</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{anim.data?.id || anim.id}</td>
                <td>{anim.data?.name || anim.name || ''}</td>
                <td>{anim.data?.price ?? anim.price?? ''}</td>
                <td>{anim.data?.description || anim.description || ''}</td>
                <td>{anim.data?.IsPopular || anim.IsPopular ? "Yes" : "No"}</td>
                <td>{anim.data?.IsStock ?? anim.IsStock}</td>
                <td>
                  <EditButton onClick={() => onEdit(anim.id)}>Edit</EditButton>
                  <DeleteButton onClick={() => onDelete(anim.id)}>Delete</DeleteButton>
                </td>
              </tr>
            </tbody>
          </StyledTable>
        </Wrapper>
      ))}
    </div>
  );
};

export default AnimalsPage
