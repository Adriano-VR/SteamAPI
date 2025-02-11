"use client"
import { useParams } from "next/navigation"; // Importando o useRouter
import { useEffect, useState } from "react";
import { Divider, Spinner } from "@heroui/react";

import { Image } from "@heroui/react";
import { getGameDetails } from "@/http/http";

const GameDetailsPage = () => {
  const { gameId } = useParams(); // Captura o 'gameId' da URL
  const [dev, setDev] = useState<any>({ game: null, video: null, developer: null });

  const [loading, setLoading] = useState(true); // Adicionando estado de loading
  
  useEffect(() => {
    const fetchGameDetails = async () => {
      setLoading(true);
      try {
        const response = await getGameDetails({ params: { gameId: gameId as string } });
        setDev(response);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchGameDetails();
  }, [gameId]);

  const {game,video,developer} = dev

  if (loading) return <div className="absolute inset-0 flex items-center justify-center"> <Spinner size='lg'  color="warning" /> </div>

  



  const formattedDate = new Date(game.first_release_date * 1000).toLocaleDateString('pt-BR', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric'
  });

  const nota = game.rating != null ? (Math.ceil(game.rating ) / 10).toFixed(1) : "ND";
  const aggregated_rating = game.aggregated_rating != null ? (Math.floor(game.aggregated_rating ) / 10).toFixed(1) : "ND";
  const summary = game.summary != null ? game.summary : 'ND'

  return (

    

   <article className="grid grid-cols-1 rounded p-3 md:flex flex-col ">
    <div className="md:flex justify-between items-start mb-4   ">
  <div className="flex flex-col gap-2 ">
    <h1 className="tracking-wider text-xl md:text-2xl font-bold">{game?.name} ({developer})</h1>
    <span className="italic">{formattedDate}</span>
  </div>

  <div className="flex flex-col gap-2 p-2 font-semibold text-sm md:text-md">
    <span>★ User Rating: {nota}</span>
    <span>★ Critic Rating: {aggregated_rating}</span>
  </div>
</div>

      <Divider />
      <div className="mt-3 grid grid-cols-1  md:grid-cols-3">
        <div className="flex items-center justify-evenly ">
        <Image src={game?.cover.url.replace("t_thumb", "t_720p")} width={400}  alt="adaw" className="mb-10 w-full  xl:w-11/12 2xl:w-full" />
        <Divider orientation="vertical" className="hidden md:block items-center justify-center" />
        </div>
      <div className="w-full col-span-2 justify-items-center"> 
      {video ? (  
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${video}`}
            title="Gameplay Trailer"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full  xl:w-11/12 2xl:w-full"
          ></iframe>
        ) : (
          <p className="text-gray-500 mt-4">Nenhum vídeo disponível para este jogo.</p>
        )}

      </div>
 

      </div>
        <Divider className="hidden md:block mt-2" />
<div className="flex flex-col mt-5">
<p className="tracking-wide font-semibold text-medium ">{summary}</p>
</div>
    
   </article>
    



  );
};
export default GameDetailsPage;
