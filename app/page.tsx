"use client"

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { CardDetails } from "@/components/CardDetails";
import { useEffect, useState } from "react";
import { Game, GameDetails } from "@/interface/interface";
import { getGamesComingSoon, getMostHypedGames } from "@/http/http";
import { Spinner } from "@heroui/react";
import {  CardComponentHome } from "@/components/CardComponentHome";

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


  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: false,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1024, // Até 1024px (tablets)
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768, // Até 768px (dispositivos móveis)
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480, // Até 480px (celulares pequenos)
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="flex flex-col ">
      <h1 className="mb-5">Hyped Games</h1>
        <Slider {...settings}>
       {resposta.map((game) => (
        <div key={game.id} className="px-2">
         <CardComponentHome  game={game} label='Top' />

        </div>
       ))}
        </Slider>
        
   

    </div>
  );
};

export default Home;
