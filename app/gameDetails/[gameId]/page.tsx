"use client"
import { CardDetails } from "@/components/CardDetails";
import { getGamesById } from "@/http/http";
import { Game, GameDetails } from "@/interface/interface";
import { useParams } from "next/navigation"; // Importando o useRouter
import { useEffect, useState } from "react";

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

  if (loading) {
    return (
      <div>
        <p>Loading...</p> {/* Display loading text while fetching */}
      </div>
    );
  }

  return (
    <div>
      {res && <CardDetails game={res} />}
    </div>
  );
};

export default GameDetailsPage;
