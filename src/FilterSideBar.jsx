import React from "react";
import "./css/utilities.css";
import DateFnsUtils from "@date-io/date-fns";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import Dropdown from "react-dropdown";
import { Checkbox, FormControlLabel } from "@material-ui/core";
import Button from "react-bootstrap/Button";

import _ from "lodash";
const genres = [
  "Action",
  "Thriller",
  "Comedy",
  "Horror",
  "Drama",
  "Sci-Fi",
  "Romance",
  "Crime",
  "Mystery",
  "Adventure",
];

let initialFilterState = {
  rating: "",
  year: "",
  genres: [],
  platforms: [],
};

const platforms = ["Netflix", "Amazon Prime", "Hotstar", "Sony Liv"];

const FilterSideBar = ({
  movieFilter,
  setMovieFilter,
  getMovies,
  setCurrPage,
  resetFilter,
}) => {

  const getPlatforms = () => {
    const checkboxes = [];
    platforms.forEach((platform) =>
      checkboxes.push(
        <div>
          <FormControlLabel
            control={
              <Checkbox
                name={[platform]}
                value={platform}
                color="primary"
                checked={movieFilter.platforms.includes(platform)}
              />
            }
            label={platform}
            onChangeCapture={handlePlatformChange}
          />
        </div>
      )
    );
    return checkboxes;
  };
  const handlePlatformChange = (event) => {
    const { name, checked } = event.target;
    if (checked) {
      setMovieFilter((prevState) => ({
        ...prevState,
        platforms: [...prevState.platforms, name],
      }));
    } else {
      setMovieFilter((prevState) => ({
        ...prevState,
        platforms: [...prevState.platforms.filter((p) => p !== name)],
      }));
    }
  };

  const getGenres = () => {
    genres.sort();
    const checkboxes = [];
    genres.forEach((genre) =>
      checkboxes.push(
        <div>
          <FormControlLabel
            control={
              <Checkbox
                name={genre}
                value={genre}
                color="primary"
                onChangeCapture={handleCheckBoxChange}
                checked={movieFilter.genres.includes(genre)}
              />
            }
            label={genre}
          />
        </div>
      )
    );
    return checkboxes;
  };

  const handleCheckBoxChange = (event) => {
    const { checked, name } = event.target;
    if (checked) {
      setMovieFilter((prevState) => ({
        ...prevState,
        genres: [...prevState.genres, name],
      }));
    } else {
      setMovieFilter((prevState) => ({
        ...prevState,
        genres: [...prevState.genres.filter((genre) => genre !== name)],
      }));
    }
  };

  const getRatings = () => {
    const ratings = [];
    for (let rating = 1; rating <= 10; rating++) {
      ratings.push(rating);
      if (rating < 10) {
        ratings.push(rating + 0.5);
      }
    }
    return ratings;
  };

  const handleDropdownChange = (values) => {
    const name = "rating";
    setMovieFilter((prevState) => ({
      ...prevState,
      [name]: values.label,
    }));
  };

  const handleFiltersApplied = () => {
    initialFilterState = _.cloneDeep(movieFilter);
    getMovies(movieFilter);
    setCurrPage(1);
  };

  const handleYearChange = (date) => {
    setMovieFilter((prevState) => ({
      ...prevState,
      year: date.getFullYear(),
    }));
  };
  return (
    <div className="filter-side-bar">
      <h3 className="text-center filter-heading heading">Filters</h3>
      <div
        className="flex filter-heading all-center"
        style={{ height: "50px", justifyContent: "space-between" }}
      >
        <strong className="subheading">IMdb: </strong>
        <div>
          <Dropdown
            className="rating-dropdown"
            options={getRatings()}
            onChange={handleDropdownChange}
            placeholder="Select"
          />
        </div>
      </div>
      <div className="filter-heading all-heading subheading">
        <strong>Year: </strong>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <DatePicker
            views={["year"]}
            variant="inline"
            onChange={handleYearChange}
            onChange={handleYearChange}
            maxDate={new Date()}
            defaultValue={undefined}
            autoOk
            animateYearScrolling
            value={
              movieFilter.year.length > 0
                ? new Date(`${movieFilter.year}-01-01`)
                : null
            }
          />
        </MuiPickersUtilsProvider>
      </div>
      <div className="filter-heading grid grid-r5-c2">
        <strong className="subheading">Genres</strong>
        <br />
        {getGenres()}
      </div>
      <div className="filter-heading grid grid-r2-c2">
        <strong className="subheading">Platforms</strong>
        <br />
        {getPlatforms()}
      </div>
      <div className="flex all-center">
        <Button
          className="btn btn-danger button"
          onClick={handleFiltersApplied}
          onClick={resetFilter}
        >
          Remove All
        </Button>
        <Button
          id="filter-cancel-button"
          className="btn btn-primary button"
          onClick={handleFiltersApplied}
        >
          Apply
        </Button>
      </div>
    </div>
  );
};

export default FilterSideBar;
