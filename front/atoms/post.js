import { atom } from 'recoil';
import { backUrl } from '../config/config';

export const imagePrefixAtom = atom({
  key: 'IMAGE_PREFIX',
  default: backUrl,
});
