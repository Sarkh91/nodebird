import { atom } from 'recoil';

export const imagePrefixAtom = atom({
  key: 'IMAGE_PREFIX',
  default: 'http://localhost:3065/',
});
