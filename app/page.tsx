"use client"

import { CardComponent } from '@/components/Card';
import { getGames } from '@/http/http';
import { Game } from '@/interface/interface';
import React, { useEffect, useState } from 'react';
import {Spinner} from "@heroui/react";

const Home: React.FC = () => {

  const [loading, setLoading] = useState<boolean>(true);
  const [resposta, setResposta] = useState<Game[]>([])

  const fetch = async () => {
    const res = await getGames();
    setResposta(res);
    setLoading(false);
  };

  useEffect(() => {
    fetch();
  }, []);

  if (loading) return  <div className="absolute inset-0 flex items-center justify-center"> <Spinner size='lg' label='Loading' color="success" /> </div>

  

  return (
    <div className='grid grid-cols-1 md:grid-cols-4 justify-center items-center gap-4'>
   
      {resposta.map((game: Game) => (
        <CardComponent key={game.id} game={game} />
      ))}

    </div>
  );
};

export default Home;
