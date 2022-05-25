import { atom } from "recoil";
import { MovieObjectOnPage, MovieRespObj, MoviesRespObj } from "../typing";

export const modalShowState = atom<boolean>({
  key: "modalShowState",
  default: false,
});

export const wishListState = atom<MovieObjectOnPage[] | []>({
  key: "wishListState",
  default: [],
});

export const videoSrcState = atom<string | number>({
  key: "videoSrcState",
  default: "",
});
