'use client';

import { testingVanilla } from '@/app/style.css';
import BearCounter from '@/app/zustand_test';

export default function Home() {
  return (
    <>
      <h1 className={testingVanilla}>Testing Prettier</h1>
      <BearCounter />
    </>
  );
}
