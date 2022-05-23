import axios from "axios";
import { BaseSyntheticEvent, ChangeEvent, useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import SearchContext from "../context/search-context";
import { MangaSchema } from "./MangaSchema";
import styles from "./NavBar.module.scss";

const NavBar = () => {
  const [searchInput, setSearchInput] = useState<string>("");
  const [type, setType] = useState<string>("manga");
  const [sfw, setSfw] = useState<string>("false");

  const onChangeSearch = (e: ChangeEvent) => {
    setSearchInput((e.target as HTMLInputElement).value);
  };

  const onChangeSfw = (e: ChangeEvent) => {
    setSfw("true");
  };

  const onChangeType = (e: ChangeEvent) => {
    setType((e.target as HTMLInputElement).value);
  };

  const searchCtx = useContext(SearchContext);
  const navigate = useNavigate();
  const onSubmitSearch = (e: BaseSyntheticEvent) => {
    e.preventDefault();
    axios
      .get("https://api.jikan.moe/v4/manga", {
        params: {
          page: 1,
          limit: 50,
          q: searchInput,
          type: type,
          sfw: sfw,
        },
      })
      .then((res) => {
        const data = MangaSchema.parse(res.data.data);
        searchCtx.setSearchResults(data);
        navigate("/search");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <ul className={styles.ul}>
        <li className={styles.li}>
          <NavLink
            className="p-1 hover:text-violet-600 active:text-violet-700"
            to="/home"
          >
            Home
          </NavLink>
        </li>
        <li className={styles.li}>
          <NavLink
            className="p-1 hover:text-violet-600 active:text-violet-700"
            to="/my-list"
          >
            My List
          </NavLink>
        </li>
      </ul>
      <form onSubmit={onSubmitSearch}>
        <select name="type" id="type" onChange={onChangeType}>
          <option value="manga">Manga</option>
          <option value="manhwa">Manhwa</option>
          <option value="manhua">Manhua</option>
          <option value="lightnovel">Light Novel</option>
        </select>
        <label className="switch">
          NSFW?
          <input value="true" type="checkbox" onChange={onChangeSfw} />
          <span className="slider"></span>
        </label>

        <input
          type="text"
          placeholder="Search"
          value={searchInput}
          onChange={onChangeSearch}
        />
        <button type="submit">Go!</button>
      </form>
    </>
  );
};

export default NavBar;
