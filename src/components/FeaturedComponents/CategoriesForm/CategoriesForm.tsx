import React, { useRef } from "react";
import { Form, Input, Button, Table } from "../StyledComponents/Forms.styled"; 
import type { CategoriesFormPropsInterface } from "./CategoriesFormPropsInterface";


const CategoriesForm: React.FC<CategoriesFormPropsInterface> = ({ onFormSubmit, title = "", description = "" }) => {
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (titleRef.current && descriptionRef.current) {
      onFormSubmit(titleRef.current.value, descriptionRef.current.value);
    }
  };

  return (
    <Form onSubmit={onSubmit}>
      <Table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <Input
                type="text"
                ref={titleRef}
                required
                defaultValue={title}
                placeholder="Title"
              />
            </td>
            <td>
              <Input
                type="text"
                ref={descriptionRef}
                required
                defaultValue={description}
                placeholder="Description"
              />
            </td>
            <td>
              <Button type="submit">Save</Button>
            </td>
          </tr>
        </tbody>
      </Table>
    </Form>
  );
};

export default CategoriesForm;
