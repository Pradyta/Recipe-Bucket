import Food from "../assets/food.jpeg";
import Spaghetti from "../assets/spaghetti.jpeg";
import Pizza from "../assets/pizza.jpeg";
import Penne from "../assets/penne.jpeg";
import Lasagne from "../assets/lasagne.jpeg";

const images = [Food, Spaghetti, Pizza, Penne, Lasagne];

export const getEnvValue = (name) => {
  const value = process.env[`REACT_APP_${name}`];
  return value || "";
};

export const getRandomFoodImage = () => {
  return images[Math.floor(Math.random() * images.length)];
};
