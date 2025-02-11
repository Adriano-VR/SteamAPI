"use client"

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useEffect, useState } from "react";
import { GameDetails } from "@/interface/interface";
import { getMostHypedGames } from "@/http/http";
import { Divider, Spinner } from "@heroui/react";
import { CardComponentHome } from "@/components/CardComponentHome";
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

  if (loading) return <div className="absolute inset-0 flex items-center justify-center"> <Spinner size='lg'  color="warning" /> </div>

  const CustomPrevArrow = (props: any) => {
    const { onClick } = props;
    return (
      <button
        onClick={onClick}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-black  rounded-full p-2"
      >
        <Image src='/arrow-left-svgrepo-com.svg' alt={""} width={26} height={26} />
      </button>
    );
  };

  const CustomNextArrow = (props: any) => {
    const { onClick } = props;
    return (
      <button
        onClick={onClick}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-black  rounded-full p-2"
      >
        <Image src='/arrow-right-svgrepo-com.svg' alt={""} width={26} height={26} />
      </button>
    );
  };


  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 5,
    autoplay: true,
    speed: 1500,
    autoplaySpeed: 5000,
    cssEase: "linear",
    nextArrow: <CustomNextArrow />, // Custom next arrow
    prevArrow: <CustomPrevArrow />, // Custom prev arrow

    responsive: [
      {
        breakpoint: 1400, // Até 1024px (tablets)
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 768, // Até 768px (dispositivos móveis)
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480, // Até 480px (celulares pequenos)
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
            speed:1000,
   

        },
      },
    ],
  };

  return (
    <div className="flex flex-col ">


      <Image
        alt="adawd"
        src="/fire-svgrepo-com.svg"
        width={30}
        height={30}
      />




      <Divider className="my-4" />


      <Slider {...settings}>
        {resposta.map((game) => (
          <div key={game.id} className="px-2">
            <CardComponentHome game={game} />

          </div>
        ))}
      </Slider>



    </div>
  );
};

export default Home;
