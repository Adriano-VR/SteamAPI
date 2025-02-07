import { Game, GameDetails } from "@/interface/interface";
import { Card, CardHeader, CardBody, CardFooter, Divider, Link, Image } from "@heroui/react";
import { FC } from "react";
//tenho que acessar o endpoint dos screenshots
export const CardDetails: FC<{ game: GameDetails }> = ({ game }) => {
    
    const formattedDate = new Date(game.first_release_date * 1000).toLocaleDateString('pt-BR', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric'
      });
    return (


        <Card shadow="sm" className="grid grid-cols-1 md:grid-cols-2 max-w-[1100px]">
            <CardBody className="overflow-visible p-0 w-full">
                <Image
                    alt={game.name}
                    className="w-full object-cover"
                    radius="lg"
                    shadow="sm"
                    src={game.cover.url.replace("t_thumb", "t_1080p")}
                    width="100%"
                />
            </CardBody>
            <CardFooter className="text-small flex items-start ">
                <div className="flex flex-col gap-5">
                <h1 className="justify-start">{game.name}</h1>
                <p>{game.summary}</p>
                <p>{formattedDate}</p>
                
                </div>
             

            </CardFooter>
        </Card>


    );
}
