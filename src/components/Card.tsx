import { observer } from "mobx-react";
import headphones1 from "../assets/headphones1.jpeg";
import headphones2 from "../assets/headphones2.jpeg";
import headphones3 from "../assets/headphones3.jpeg";
import headphones4 from "../assets/headphones4.jpeg";
import headphones5 from "../assets/headphones5.jpeg";
import "../styles/card.css";
import { Button } from "./Button";

const imageObj: { [key: number]: string } = {
  1: headphones1,
  2: headphones2,
  3: headphones3,
  4: headphones4,
  5: headphones5,
};

export interface Props {
  id: number;
  name: string;
  description?: string;
  deleteClickHandler(e: Event, id: number): void;
  productDetailsHandler(id: number): void;
}

export const Card = observer(
  ({
    id,
    name,
    description,
    deleteClickHandler,
    productDetailsHandler,
  }: Props) => {
    const getRandomImage = () => {
      const random = Math.floor(Math.random() * 5) + 1;
      return imageObj[random];
    };

    return (
      <div className="card" onClick={() => productDetailsHandler(id)}>
        <img
          className="productListImage"
          src={imageObj[id] ? imageObj[id] : getRandomImage()}
          alt=""
        />
        <div className="cardDetails">
          <h5>{name}</h5>
          <p>{description}</p>
        </div>
        <div className="cardDelete">
          <Button
            text="Delete"
            onClickHandler={(e) => deleteClickHandler(e as Event, id)}
            bgColor="#E4A11B"
          />
        </div>
      </div>
    );
  }
);
