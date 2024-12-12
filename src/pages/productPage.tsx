import { HeaderActions } from "../components/HeaderActions";
import { List } from "../components/List";
import { RenderProductsList } from "../components/renderProductsList";
import { productStore } from "../store";
import "../styles/productPage.css";
import { observer } from "mobx-react";

export const ProductPage = observer(() => {
  return (
    <div>
      <HeaderActions />
      <List items={productStore.getProductList()} renderItem={RenderProductsList} className="" />
    </div>
  );
});
