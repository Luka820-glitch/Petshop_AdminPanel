import { useState, useEffect, useRef } from "react";
import Select from "react-select";
import { Form, Input, Button, Table, SelectMini } from "../StyledComponents/Forms.styled";
import useFetch from "../hooks/Fetch/useFetch";
import type { AnimalsFormPropsInterface } from "./AnimalsFormPropsInterface";
import type { CategoryInterface } from "../../../pages/Categories/CategoriesPageInterfaces";

interface OptionType {
  value: string;
  label: string;
}

const AnimalsForm: React.FC<AnimalsFormPropsInterface> = ({
  onFormSubmit,
  id,
  name = "",
  price = 0,
  description = "",
  IsPopular = false,
  IsStock = 0,
  data,
}) => {
  const nameRef = useRef<HTMLInputElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);
  const isPopularRef = useRef<HTMLSelectElement>(null);
  const isStockRef = useRef<HTMLInputElement>(null);

  const {
    response: categories,
    error: catError,
    loading: catLoading,
  } = useFetch<CategoryInterface[]>({
    url: "http://localhost:5000/api/v1/resource/CATEGORIES",
    method: "GET",
  });

  const [options, setOptions] = useState<OptionType[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<OptionType[]>([]);


  useEffect(() => {
    if (!categories) return;
    const newOptions = categories.map((category) => ({
      value: category.id,
      label: category.data?.name || category.name || "Unnamed",
    }));
    setOptions(newOptions);
  }, [categories]);

 
  useEffect(() => {
    if (!data?.selectedCategoryId || !Array.isArray(data.selectedCategoryId)) return;

    const preselected = options.filter((opt) =>
      data.selectedCategoryId.includes(opt.value)
    );
    setSelectedCategories(preselected);
  }, [options, data?.selectedCategoryId]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      nameRef.current &&
      priceRef.current &&
      descriptionRef.current &&
      isPopularRef.current &&
      isStockRef.current
    ) {
      const name = nameRef.current.value;
      const price = parseFloat(priceRef.current.value);
      const description = descriptionRef.current.value;
      const isPopular = isPopularRef.current.value === "true";
      const isStock = parseFloat(isStockRef.current.value);

      const selectedCategoryIds = selectedCategories.map((cat) => cat.value);

    
      onFormSubmit(id, selectedCategoryIds, data, name, price, description, isPopular, isStock);
    }
  };

  return (
    <Form onSubmit={onSubmit}>
      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price (GEL)</th>
            <th>Description</th>
            <th>IsPopular</th>
            <th>IsStock</th>
            <th>Categories</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <Input
                type="text"
                ref={nameRef}
                required
                defaultValue={name}
                placeholder="Name"
              />
            </td>
            <td>
              <Input
                type="number"
                ref={priceRef}
                min={0}
                required
                defaultValue={price}
                placeholder="Price"
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
              <SelectMini
                ref={isPopularRef}
                defaultValue={IsPopular ? "true" : "false"}
                required
              >
                <option value="true">Yes</option>
                <option value="false">No</option>
              </SelectMini>
            </td>
            <td>
              <Input
                type="number"
                ref={isStockRef}
                required
                min={0}
                defaultValue={IsStock}
                placeholder="Stock"
              />
            </td>
            <td style={{ minWidth: 200 }}>
              {catLoading ? (
                <p>Loading...</p>
              ) : catError ? (
                <p>Error loading categories</p>
              ) : (
                <Select
                  isMulti
                  options={options}
                  value={selectedCategories}
                  onChange={(selected) =>
                  setSelectedCategories(selected as OptionType[])
                  }
                  placeholder="Select Categories"
                />
              )}
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

export default AnimalsForm;
