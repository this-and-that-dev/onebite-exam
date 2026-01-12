import { create } from "zustand";
//create 는 state, action 함수를 포함하는 객체인 store 를 생성한다.

import { combine } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

//combine middleware
//immer middleware : return 없이 state 를 바꿀수 있다.
export const useCountStore = create(
  immer(
    combine({ count: 0 }, (set, get) => ({
      actions: {
        increase: () => {
          // set((state) => ({
          //   count: state.count + 1,
          // }));
          set((state) => {
            state.count += 1;
          });
        },
        decrease: () => {
          // set((store) => ({
          //   count: store.count - 1,
          // }));
          set((state) => {
            state.count -= 1;
          });
        },
      },
    })),
  ),
);
// type Store = {
//   count: number;
//   actions: {
//     increase: () => void;
//     decrease: () => void;
//   };
// };

// export const useCountStore = create<Store>((set, get) => ({
//   count: 0,
//   actions: {
//     increase: () => {
//       set((state) => ({
//         count: state.count + 1,
//       }));
//     },
//     decrease: () => {
//       set((store) => ({
//         count: store.count - 1,
//       }));
//     },
//   },
// }));

export const useCount = () => {
  return useCountStore((store) => store.count);
};

export const useIncreaseCount = () => {
  return useCountStore((store) => store.actions.increase);
};

export const useDecreaseCount = () => {
  return useCountStore((store) => store.actions.decrease);
};
