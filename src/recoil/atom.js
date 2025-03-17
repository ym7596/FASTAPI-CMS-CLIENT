import { atom } from 'recoil';

export const categoryState = atom({
    key: 'categoryState',
    default: [],
});

export const subcategoryState = atom({
    key: 'subcategoryState',
    default: [],
})

export const itemState = atom({
    key: 'itemState',
    default: [],
})