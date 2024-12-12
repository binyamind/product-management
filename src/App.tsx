import "./App.css";
import { Form } from "./components/Form";
import { Layout } from "./layout/layout";
import { observer } from "mobx-react";
import { productStore } from "./store";
import { ProductPage } from "./pages/productPage";
import { useEffect } from "react";

// eslint-disable-next-line react-refresh/only-export-components
const App = () => {
  useEffect(() => {
    productStore.seed();
  }, []);
  const showPane = productStore.getShowPane();
  return (
    <>
      <Layout>
        <ProductPage />
        {showPane ? <Form /> : null}
      </Layout>
    </>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export default observer(App);
