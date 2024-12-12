import { Product } from "../models/product";
import { Card } from "./Card";
import "../styles/productPage.css";
import { productStore } from "../store";

export const RenderProductsList = (product: Product) => {
  const deleteHandler = (e: Event, id: number) => {
    e.stopPropagation();
    productStore.deleteProductFromList(id);
    productStore.setShowPane(false);
  };
  const productDetailHandler = (id: number) => {
    productStore.setProductDetailsId(id);
    productStore.setShowPane(true);
  };
  return (
    <div className="wrapper">
      <Card
        deleteClickHandler={deleteHandler}
        productDetailsHandler={productDetailHandler}
        id={product.Id}
        name={product.Name}
        description={product.Description}
      />
    </div>
  );
};
