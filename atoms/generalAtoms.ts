import { atom } from "recoil";
import { MovieObjectOnPage } from "../typing";

export const modalShowState = atom<boolean>({
  key: "modalShowState",
  default: false,
});

// export const modalVideoState = atom<MovieObjectOnPage | {}>({
//   key: "modalVideoState",
//   default: {},
// });

export const videoSrcState = atom<string | number>({
  key: "videoSrcState",
  default: "",
});
