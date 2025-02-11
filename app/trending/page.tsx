"use client"

import { Game, GameDetails } from '@/interface/interface';
import React, { useEffect, useState } from 'react';
import {Spinner} from "@heroui/react";
import {  getMostHypedGames } from '@/http/http';
import { CardDetails } from '@/components/CardDetails';
import TableComponent from '@/components/Table';
import { useRouter } from 'next/navigation';

const Home: React.FC = () => {
  const router = useRouter(); // Inicializa o roteador do Next.js

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

   
     
       <TableComponent games={resposta} navigate={router.push} />
      
  
  );
};

export default Home;
