import { makeAutoObservable } from "mobx";
import mockProducts from "../config/MockProducts";
import { Product } from "../models/product";

export class ProductStore {
  constructor() {
    makeAutoObservable(this);
  }

  private lastNonFilterdList: Array<Product> = [];
  private showPane = false;
  private productList: Array<Product> = [];
  private getLastId = () => {
    if (this.productList.length === 0) return 1;
    return this.productList.length + 1;
  };

  private getLocalStorageData() {
    return localStorage.getItem("products");
  }
  private updateLocalStorage(list: Array<Product>) {
    localStorage.setItem("products", JSON.stringify(list, null, 2));
  }
  setShowPane = (value: boolean) => {
    this.showPane = value;
  };
  private productDetailId: number | null = null;
  getShowPane = () => {
    return this.showPane;
  };
  updateLastNonFilterdList = (list: Array<Product>) => {
    this.lastNonFilterdList = list;
  };
  findProductIndexById = (id: number) => {
    return this.productList.findIndex(({ Id }) => Id === id);
  };
  addOrEditProductList = (
    product: Pick<Product, "Description" | "Name" | "Price">,
    id: number | null
  ) => {
    const newProduct: Product = {
      ...product,
      CreationDate: new Date(),
      Id: id ? id : this.getLastId(),
    };
    if (!id) {
      this.productList.push(newProduct);
      this.updateLastNonFilterdList(this.productList);
      this.updateLocalStorage(this.productList);
      return;
    }
    const foundProductIndex = this.findProductIndexById(id);
    if (foundProductIndex === -1) return;
    this.productList[foundProductIndex] = newProduct;
    this.updateLastNonFilterdList(this.productList);
    this.updateLocalStorage(this.productList);
  };
  seed = () => {
    const localStorageList = this.getLocalStorageData();
    if (localStorageList?.length === 0 || !localStorageList) {
      this.updateLocalStorage(mockProducts);
      this.lastNonFilterdList = mockProducts;
      this.productList = mockProducts;
    } else {
      this.lastNonFilterdList = JSON.parse(localStorageList);
      this.productList = JSON.parse(localStorageList);
    }
  };
  getProductList = () => {
    return this.productList;
  };
  deleteProductFromList = (id: number): void => {
    const product = this.productList.find(({ Id }) => id === Id);
    if (!product) return;
    this.productList = this.productList.filter((product) => product.Id !== id);
    this.updateLastNonFilterdList(this.productList);
    this.updateLocalStorage(this.productList);
  };
  setProductDetailsId = (id: number | null) => {
    this.productDetailId = id;
  };
  getProductById = () => {
    const product = this.productList.find(
      (product) => product.Id === this.productDetailId
    );
    if (!product) return;
    return product;
  };
  sortList = (type: keyof Pick<Product, "CreationDate" | "Name">) => {
    const newList = [...this.productList];
    switch (type) {
      case "CreationDate":
        this.productList = newList.sort((a, b) => {
          return (
            new Date(a.CreationDate).valueOf() -
            new Date(b.CreationDate).valueOf()
          );
        });
        break;
      case "Name":
        this.productList = newList.sort((a, b) => {
          return a.Name.localeCompare(b.Name);
        });
    }
    return this.productList;
  };

  search = (searchTerm: string) => {
    if (!searchTerm.charAt(1) || searchTerm === "") {
      console.log(JSON.stringify(this.lastNonFilterdList, null, 2));
      return (this.productList = this.lastNonFilterdList);
    }
    this.productList = this.productList.filter(({ Name, Description }) => {
      return (
        Name.toLowerCase().includes(searchTerm) ||
        Description?.toLowerCase().includes(searchTerm)
      );
    });
  };
}
