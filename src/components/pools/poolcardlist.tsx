import React from "react";
import PoolCard, { PoolCardProps } from "./poolcard"; // Adjust the import path based on your project structure



type PoolCardListProps = {
  pools: PoolCardProps[];
};

export default function PoolCardList({ pools }: PoolCardListProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {pools.map(pool => (
        <PoolCard key={pool.id} name={pool.name} desc={pool.desc} id={pool.id} author={pool.author}/>
      ))}
    </div>
  );
}
