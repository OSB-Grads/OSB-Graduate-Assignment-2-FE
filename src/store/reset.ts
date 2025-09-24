export const addToResetFns = (fn: any) => {
    storeResetFns.add(() => {
      fn()
    });
}

const storeResetFns = new Set<() => void>();

export const resetAllStores = () => {
  storeResetFns.forEach((resetFn) => {
    resetFn();
  });
};