import styled from "styled-components";

export const Form = styled.form`
  display: flex;
  gap: 10px;
  max-width: 400px;
  margin: 1rem 0;
  margin-top: 50px;
  flex-direction: column;
`;


export const Label = styled.label`
  display: flex;
  flex-direction: column;
  font-weight: 600;
`;

export const Input = styled.input`
  padding: 6px 8px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export const SelectMini = styled.select`
  padding: 6px 8px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 215px;
`;

export const Buttons = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
`;

export const Button = styled.button`
  cursor: pointer;
  padding: 8px 12px;
  border-radius: 4px;
  border: none;
  background-color: green;
  color: white;
  font-weight: 600;
  margin-right: 10px;

  &:hover {
    background-color: darkgreen;
  }
`;


export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
  font-size: 16px;
  text-align: left;
`;


