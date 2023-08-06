import {
  InputLabel,
  MenuItem,
  TextField,
  FormControl,
  Select,
  Typography,
  Stack,
} from "@mui/material";
import { useEffect, useState } from "react";
import FilmItem from "./FilmItem";

const consecutiveYears = Array.from(
  { length: 2023 - 1900 + 1 },
  (_, index) => 2023 - index
);
consecutiveYears.unshift("Any");

function App() {
  const [inputText, setInputText] = useState("");
  const [movies, setMovies] = useState([]);
  const baseurl = "http://www.omdbapi.com";
  const apiKey = "939bff44";
  const url = `${baseurl}/?apikey=${apiKey}&s=${inputText}`;

  const onInputChanged = (e) => {
    setInputText(e.target.value);
  };

  if (inputText !== "") document.title = inputText;
  else document.title = "OMDb Search";

  const [yearReleased, setYearReleased] = useState("Any");
  const [sortOption, setSortOption] = useState("None");

  useEffect(() => {
    if (yearReleased !== "Any") {
      fetch(`${url}&y=${yearReleased}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.Search === undefined) {
            setMovies([]);
          } else {
            setMovies(data.Search);
          }
        });
    } else {
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          if (data.Search === undefined) {
            setMovies([]);
          } else {
            setMovies(data.Search);
          }
        });
    }
  }, [yearReleased, url]);
  useEffect(() => {
    let sortedFilms = [...movies];
    if (sortOption === "Year") {
      sortedFilms.sort((a, b) => b.Year - a.Year);
    } else if (sortOption === "Title") {
      sortedFilms.sort((a, b) => a.Title.localeCompare(b.Title));
    }
    setMovies(sortedFilms);
  }, [sortOption, movies]);
  const renderSearchTextfild = () => {
    return (
      <TextField
        sx={{ margin: "10px 2px" }}
        label="Title:"
        placeholder="Avengers,Batman,..."
        variant="outlined"
        defaultValue={inputText}
        onChange={onInputChanged}
      />
    );
  };
  const handleYearFilterChange = (e) => {
    setYearReleased(e.target.value);
  };

  const renderYearFilter = () => {
    return (
      <>
        <FormControl fullWidth sx={{ margin: "10px 2px", maxWidth: 110 }}>
          <InputLabel>Year Released</InputLabel>
          <Select
            value={yearReleased}
            label="Year Released"
            onChange={handleYearFilterChange}
          >
            {consecutiveYears.map((value, index) => (
              <MenuItem value={value} key={index}>
                {value}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </>
    );
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };
  const renderMoviesSorter = () => {
    return (
      <FormControl fullWidth sx={{ margin: "10px 2px", maxWidth: 120 }}>
        <InputLabel>Sort by</InputLabel>
        <Select value={sortOption} label="Sort by" onChange={handleSortChange}>
          <MenuItem value={"None"}>None</MenuItem>
          <MenuItem value={"Year"}>Year</MenuItem>
          <MenuItem value={"Title"}>Title</MenuItem>
        </Select>
      </FormControl>
    );
  };

  const mapMoviestoComponent = (movie, index) => (
    <FilmItem film={movie} key={index} />
  );
  return (
    <>
      {renderSearchTextfild()}
      <Stack direction="row">
        {renderYearFilter()}
        {renderMoviesSorter()}
      </Stack>
      {movies.map(mapMoviestoComponent)}
      {movies.length === 0 && <Typography>No Result</Typography>}
    </>
  );
}

export default App;
