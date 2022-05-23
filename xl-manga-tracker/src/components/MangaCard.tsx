import { z } from "zod";
import { MangaSchema } from "./MangaSchema";

const MangaCard = (props: z.infer<typeof MangaSchema>) => {
  //   console.log(props);
  return (
    <>
      <h1>manga cards</h1>
      <p>title: {props.title}</p>
      <img src={props.images} alt={props.title} />
      <p>rank: {props.rank}</p>
      <p>status: {props.status}</p>
      <p>chapter: {props.chapters}</p>
    </>
  );
};

export default MangaCard;
