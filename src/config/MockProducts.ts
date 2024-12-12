import { Product } from "../models/product";

const mockProducts: Product[] = [
  {
    Id: 1,
    Name: "test Headphones",
    Description:
      "High-quality over-ear wireless headphones with noise cancellation.",
    Price: 299.99,
    CreationDate: new Date("2024-01-01"),
  },
  {
    Id: 2,
    Name: "baming Laptop",
    Description:
      "A powerful laptop designed for gaming and high-performance tasks.",
    Price: 1499.99,
    CreationDate: new Date("2023-11-15"),
  },
  {
    Id: 3,
    Name: "cmartwatch",
    Description:
      "A smartwatch with fitness tracking and health monitoring features.",
    Price: 199.99,
    CreationDate: new Date("2024-03-10"),
  },
  {
    Id: 4,
    Name: "dlectric Scooter",
    Description: "Eco-friendly electric scooter with a long-lasting battery.",
    Price: 599.99,
    CreationDate: new Date("2023-12-01"),
  },
  {
    Id: 5,
    Name: "4K Television",
    Description: "A 55-inch 4K Ultra HD television with HDR support.",
    Price: 799.99,
    CreationDate: new Date("2024-02-20"),
  },
];

export default mockProducts;
