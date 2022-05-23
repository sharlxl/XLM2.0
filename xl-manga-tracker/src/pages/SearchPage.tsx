import { Key, useContext } from "react";
import MangaCard from "../components/MangaCard";
import NavBar from "../components/NavBar";
import SearchContext from "../context/search-context";

const SearchPage = () => {
  const searchCtx = useContext(SearchContext);
  const searchResults = searchCtx.searchResults;
  console.log(searchResults);
  return (
    <>
      <NavBar />
      {searchResults.map(
        (
          manga: {
            mal_id: number;
            images: { jpg: { image_url: any } };
            title: any;
            rank: any;
            chapters: any;
            status: any;
          },
          index: Key | null | undefined
        ) => {
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
        }
      )}
    </>
  );
};

export default SearchPage;
