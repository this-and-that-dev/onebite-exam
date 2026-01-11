import { create } from "zustand";
//create 는 state, action 함수를 포함하는 객체인 store 를 생성한다.

type Store = {
  count: number;
  actions: {
    increase: () => void;
    decrease: () => void;
  };
};

export const useCountStore = create<Store>((set, get) => ({
  count: 0,
  actions: {
    increase: () => {
      set((store) => ({
        count: store.count + 1,
      }));
    },
    decrease: () => {
      set((store) => ({
        count: store.count - 1,
      }));
    },
  },
}));

export const useCount = () => {
  return useCountStore((store) => store.count);
};

export const useIncreaseCount = () => {
  return useCountStore((store) => store.actions.increase);
};

export const useDecreaseCount = () => {
  return useCountStore((store) => store.actions.decrease);
};
