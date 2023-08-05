import { memo } from "react";

const filmItems = ({ film }) => {
  return (
    <>
      <Box>
        <img src={film.Poster} alt={film.Title} />
        <h3>{film.Title}</h3>
        <h3>{film.Year}</h3>
        <h3>{film.Type}</h3>
      </Box>
    </>
  );
};
export default memo(filmItems);
