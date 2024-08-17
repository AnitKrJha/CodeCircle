import React from "react";
import PoolCard from "./poolcard"; // Adjust the import path based on your project structure

type Pool = {
  id: number;
  name: string;
  desc: string;
};

const mockData: Pool[] = [
  { id: 1, name: "React Pool", desc: "A pool for discussing React.js problems." },
  { id: 2, name: "Next.js Pool", desc: "A pool for Next.js-related issues and solutions." },
  { id: 3, name: "Tailwind CSS Pool", desc: "A pool for styling challenges with Tailwind CSS." },
  { id: 4, name: "Supabase Pool", desc: "A pool for database and auth issues with Supabase." },
];

export default function PoolCardList() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {mockData.map(pool => (
        <PoolCard key={pool.id} name={pool.name} desc={pool.desc} />
      ))}
    </div>
  );
}
