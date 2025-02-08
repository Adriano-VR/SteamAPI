"use client"

import { Game, GameDetails } from '@/interface/interface';
import React, { useEffect, useState } from 'react';
import {Spinner} from "@heroui/react";
import {  getMostHypedGames } from '@/http/http';
import { CardDetails } from '@/components/CardDetails';

const Home: React.FC = () => {

  const [loading, setLoading] = useState<boolean>(true);
  const [resposta, setResposta] = useState<GameDetails[]>([])

  const fetch = async () => {
    const res = await getMostHypedGames();
    setResposta(res);
    setLoading(false);
  };

  useEffect(() => {
    fetch();
  }, []);

  if (loading) return  <div className="absolute inset-0 flex items-center justify-center"> <Spinner size='lg' label='Loading' color="success" /> </div>

  
//usar o react-slick

  return (
    <div className='grid grid-cols-1 md:grid-cols-4 justify-center items-center gap-4'>
   
      {resposta.map((game: GameDetails) => (
        <CardDetails key={game.id} game={game} />
      ))}

    </div>
  );
};

export default Home;
