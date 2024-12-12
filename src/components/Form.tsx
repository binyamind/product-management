import { observer } from "mobx-react";
import headphones5 from "../assets/headphones5.jpeg";
import "../styles/from.css";
import { Button } from "./Button";
import { useEffect, useState } from "react";
import { FromState } from "../models/fromStateEnum";
import { productStore } from "../store";



export const Form = observer(() => {
  const product = productStore.getProductById();
  const [form, setForm] = useState<{
    name: string;
    description: string;
    price: number | string;
  }>({});
  const validtePriceIsGraterThenZero = () => {
    return Number(form.price) > 0;
  };
  const validteFromInputsAreNotEmpty = () => {
    const isDisabled = Object.keys(form).every((key) => {
      return form[key as keyof typeof form] !== "";
    });
    return !isDisabled;
  };
  const handleFromChange = (
    key: FromState,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = e.target.value;
    if (form) {
      setForm((prevData) => ({
        ...prevData,
        [key]: value,
      }));
    }
  };
  useEffect(() => {
    setForm({
      name: product && product?.Name ? product?.Name : "",
      description: product && product?.Description ? product?.Description : "",
      price: product && product?.Price ? product?.Price : "",
    });
  }, [product]);
  return (
    <div className="formWarpper">
      <div className="divText">
        {product && product.Name ? product.Name : "Add new product"}
      </div>
      <div className="formInputWarpper">
        <img className="fromImageWarpper" src={headphones5} alt="" />
        <label htmlFor="Name"></label>
        <input
          type="text"
          required
          placeholder="Name"
          value={form?.name ?? ""}
          onChange={(e) => {
            handleFromChange(FromState.NAME, e);
          }}
        />
        <label htmlFor="Description">Description</label>
        <textarea
          name="Description"
          id=""
          placeholder="Description"
          value={form?.description ?? ""}
          onChange={(e) => {
            handleFromChange(FromState.DESCRIPTION, e);
          }}
        ></textarea>
        <label htmlFor="Price"></label>
        <input
          type="text"
          required
          pattern="[0-9]*"
          placeholder="Price"
          value={form?.price ?? ""}
          onChange={(e) => {
            if (!/^\d*$/.test(e.target.value)) return;
            handleFromChange(FromState.PRICE, e);
          }}
        />
      </div>
      <div className="saveButton">
        <Button
          text="save"
          onClickHandler={() => {
            productStore.addOrEditProductList(
              {
                Name: form.name,
                Description: form.description,
                Price: Number(form.price),
              },
              product?.Id ?? null
            );
          }}
          bgColor="#ebe7dc"
          disabled={
            validteFromInputsAreNotEmpty() && validtePriceIsGraterThenZero()
          }
        />
      </div>
    </div>
  );
});
