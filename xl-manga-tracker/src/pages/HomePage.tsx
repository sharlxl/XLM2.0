import MangaCard from "../components/MangaCard";
import NavBar from "../components/NavBar";
import axios from "axios";
import { useEffect, useState } from "react";
import { MangaSchema } from "../components/MangaSchema";

const HomePage = () => {
  const [topMangas, setTopMangas] = useState<any[]>([]);

  useEffect(() => {
    axios
      .get("https://api.jikan.moe/v4/top/manga")
      .then((res) => {
        const data = MangaSchema.parse(res.data.data);
        setTopMangas(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <NavBar />
      <p>Homepage</p>
      {topMangas.map<any>((manga, index) => {
        return (
          <MangaCard
            key={index}
            mal_id={manga.mal_id}
            images={
              !manga.images.jpg.image_url ? "NA" : manga.images.jpg.image_url
            }
            title={!manga.title ? "NA" : manga.title}
            rank={!manga.rank ? "NA" : manga.rank}
            chapters={!manga.chapters ? "NA" : manga.chapters}
            status={!manga.status ? "NA" : manga.status}
          />
        );
      })}
    </>
  );
};

export default HomePage;
