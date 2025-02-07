"use client"

import { CardComponent } from '@/components/Card';
import { getGames } from '@/http/http';
import { Game } from '@/interface/interface';
import React, { useEffect, useState } from 'react';

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

  if (loading) return <div>CARREGANDO...</div>

  return (
    <div className='grid grid-cols-4 justify-center items-center gap-4'>
   
      {resposta.map((game: Game) => (
        <CardComponent key={game.id} game={game} />
      ))}

    </div>
  );
};

export default Home;
