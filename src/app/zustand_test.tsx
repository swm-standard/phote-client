import { create } from 'zustand';
import { ComponentProps } from 'react';

interface BearState {
  bears: number;
  increase: (by: number) => void;
}

const useBearStore = create<BearState>()((set) => ({
  bears: 0,
  increase: () => set((state) => ({ bears: state.bears + 1 })),
}));

function BearCounter() {
  const bears = useBearStore((state) => state.bears);
  const increasePopulation = useBearStore((state) => state.increase);

  return (
    <>
      <h1>{bears} around here...</h1>
      <button
        onClick={(e) => {
          increasePopulation();
        }}
      >
        one up
      </button>
    </>
  );
}

export default BearCounter;
