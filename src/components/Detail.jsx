import { Modal } from "antd";
import React from "react";
import { useRecoilState } from "recoil";
import { recipeDetailsAtom, showModalAtom } from "../recoilStore";

const RecipeDetail = () => {
  const [showModal, toggleModal] = useRecoilState(showModalAtom);
  const [recipeDetails, setRecipeDetails] = useRecoilState(recipeDetailsAtom);

  const handleCancelClick = () => {
    setRecipeDetails(null);
    toggleModal(false);
  };

  const { title, servings, instructions, ingredients } = recipeDetails || {};

  return (
    <Modal
      open={showModal}
      onCancel={handleCancelClick}
      title="Recipe Details"
      footer={[]}
    >
      <h4>
        {title} ({servings})
      </h4>
      <br />
      <h4>Instructions</h4>
      <p>{instructions}</p>
      <br />
      <h4>Ingredients</h4>
      <p>{ingredients}</p>
    </Modal>
  );
};

export default RecipeDetail;
