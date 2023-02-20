import { Card, Col } from "antd";
import Meta from "antd/lib/card/Meta";
import React from "react";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { recipeDetailsAtom, showModalAtom } from "../recoilStore";
import { getRandomFoodImage } from "../utils";

const RecipeBox = ({ title, servings, instructions, ingredients }) => {
  const toggleModal = useSetRecoilState(showModalAtom);
  const setRecipeDetails = useSetRecoilState(recipeDetailsAtom);

  const handleCardClick = () => {
    setRecipeDetails({
      title,
      servings,
      instructions,
      ingredients,
    });
    toggleModal(true);
  };

  return (
    <StyledCol
      data-testid="recipe-col"
      onClick={handleCardClick}
      xs={24}
      sm={24}
      md={8}
      lg={6}
    >
      <Card
        hoverable
        style={{ width: 240 }}
        cover={<img alt="recipe" src={getRandomFoodImage()} />}
      >
        <Meta title={title} description={servings} />
      </Card>
    </StyledCol>
  );
};

export default RecipeBox;

const StyledCol = styled(Col)`
  margin: 20px 0px;
  display: flex;
  justify-content: center;
`;
