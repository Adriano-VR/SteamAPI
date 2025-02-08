"use client"

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useEffect, useState } from "react";
import { GameDetails } from "@/interface/interface";
import { getMostHypedGames } from "@/http/http";
import { Divider, Spinner } from "@heroui/react";
import {  CardComponentHome } from "@/components/CardComponentHome";
import Image from "next/image";

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
    autoplay: true,
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
          slidesToScroll: 2,
          arrows:false,
          autoplay:false

        },
      },
    ],
  };

  return (
    <div className="flex flex-col ">
      <div className="flex flex-col items-start mb-5 gap-2 w-52" >
        <div className="flex items-center gap-2 justify-center">
        <Image
          alt="adawd"
          src="/fire-svgrepo-com.svg"
          width={30}
          height={30}
          />
      <h1 className="text-xl tracking-wide font-bold">Hyped Games</h1>
        </div>
   
      
      </div>
     
      <Divider   className="bg-[#002e63] mb-5" />
      
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
