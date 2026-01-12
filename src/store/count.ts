import { create } from "zustand";
//create 는 state, action 함수를 포함하는 객체인 store 를 생성한다.

import {
  combine,
  subscribeWithSelector,
  persist,
  createJSONStorage,
  devtools,
} from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

//combine middleware : type 선언 같은 불필요한 짓 안해도됨
//immer middleware : return 없이 state 를 바꿀수 있다.
//devtools -> persist -> subscribeWithSelector -> immer -> combine 순서대로 하는게 버그 발생확률이 없다.
export const useCountStore = create(
  devtools(
    persist(
      subscribeWithSelector(
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
      ),
      {
        name: "countStore", //로컬스토리지 또는 세션 스토리지에 저장할 키
        //count만 로컬스토리지 또는 세션스토리지에 저장한다.
        partialize: (store) => {
          return {
            count: store.count,
          };
        },
        storage: createJSONStorage(() => {
          return sessionStorage;
        }), //세션 스토리지 저장
      },
    ),
    {
      name: "countStore",
    },
  ),
);

useCountStore.subscribe(
  (store) => store.count,
  (count, prevCount) => {
    // Listener
    console.log(count, prevCount);
  },
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
