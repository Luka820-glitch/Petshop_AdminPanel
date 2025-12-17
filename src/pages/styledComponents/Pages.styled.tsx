import styled from 'styled-components';

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
  font-size: 16px;
  text-align: left;
  table-layout: fixed;

  th,
  td {
    border: 1px solid #ddd;
    padding: 8px 12px;
    text-align: center;
    width: 20%;
    height: 50px;
    overflow-wrap: break-word;
    word-wrap: break-word;
    white-space: normal;
    vertical-align: middle;
  }

  th {
    background-color: #2c680aff;
    font-weight: bold;
  }

  tr:hover {
    background-color: #99f266ff;
  }
`;


export const StyledTableNew = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
  font-size: 16px;
  text-align: left;
  table-layout: fixed;

  th,
  td {
    border: 1px solid #ddd;
    padding: 8px 12px;
    text-align: center;
    width: 20%;
    height: 50px;
    overflow-wrap: break-word;
    word-wrap: break-word;
    white-space: normal;
    vertical-align: middle;
  }

  th {
    background-color: rgba(17, 52, 10, 1);
    font-weight: bold;
  }

  tr:hover {
    background-color: #d2f4bf;
  }
`;
export const StyledSelect = styled.select`
  width: 500px;
`;

export const Title = styled.h1`
  color: purple;
`;
export const TitleMini = styled.h2`
  color: gold;
`;

export const Wrapper = styled.div`
  margin-bottom: 20px;
`;


export const EditButton = styled.button`
  margin-right: 10px;
  background-color: yellow;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 5px;
`;

export const DeleteButton = styled.button`
  background-color: #e53f30ff;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 5px;
`;