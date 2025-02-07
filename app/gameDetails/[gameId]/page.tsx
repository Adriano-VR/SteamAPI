"use client"
import { CardDetails } from "@/components/CardDetails";
import { getGamesById } from "@/http/http";
import {  GameDetails } from "@/interface/interface";
import { useParams } from "next/navigation"; // Importando o useRouter
import { useEffect, useState } from "react";
import {Spinner} from "@heroui/react";

const GameDetailsPage = () => {
  const { gameId } = useParams(); // Captura o 'gameId' da URL
  const [res, setRes] = useState<GameDetails | null>(null); // Initial state set to null
  const [loading, setLoading] = useState<boolean>(true); // State for loading

  const fetch = async () => {
    setLoading(true); // Set loading to true when fetch starts
    const result = await getGamesById({ params: { gameId: gameId as string } });
    setRes(result); // Update the result
    setLoading(false); // Set loading to false once data is fetched
  };

  useEffect(() => {
    fetch();
  }, [gameId]); // Add gameId as a dependency to refetch if it changes

  if (loading) return  <div className="absolute inset-0 flex items-center justify-center"> <Spinner size='lg' label='Loading' color="success" /> </div>


  return (
    <div>
      {res && <CardDetails game={res} />}
    </div>
  );
};

export default GameDetailsPage;
