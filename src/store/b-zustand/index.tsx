import create from 'zustand';

export const DEFAULT_STATE = {
  uid: 0,
};
const store = create(() => DEFAULT_STATE);
export default store;
