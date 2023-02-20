import { atom } from "recoil";

export const showModalAtom = atom({
    key: 'ShowModalAtom',
    default: false
})

export const recipeDetailsAtom = atom({
    key: 'RecipeDetailsAtom',
    default: null
})