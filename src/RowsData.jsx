import React, { useState } from "react";
import "./App.css";
import { FilterDialog } from "./FilterDialog";
import Button from "react-bootstrap/Button";
import Pagination from "./Pagination";
import ClipboardIcon from "react-clipboard-icon";
import _ from "lodash";
export const RowsData = (props) => {
  const [isFilterOpen, setFilterOpen] = useState(false);
  const [isCopied, setIsCopied] = useState({});
  const {
    setMovies,
    getMovies,
    isLoading,
    isError,
    pageSize,
    currPage,
    totalFilteredMovies,
    setCurrPage,
    movieFilter,
    setMovieFilter,
    setPageSize,
    resetFilterToPreviousSearchedFilter,
    getMoviesIfRemoveFilterButtonWasClicked,
    setIsResetDisabled,
    isResetDisabled,
    resetFilter
  } = props;

  const toggleDialogFilter = () => {
    setFilterOpen((prevValue) => !prevValue);
  };

  const handleClose = () => {
    setFilterOpen(false);
  };

  const getClassName = (index) => {
    return `movie-row movie-row-${index % 4}`;
  };

  const findStartAndEndResultNumbers = () => {
    const start = (currPage - 1) * pageSize + 1;
    const end = Math.min(start + parseInt(pageSize) - 1, totalFilteredMovies);
    return [start, end];
  };

  const handleGoToTop = () => {
    window.scrollTo(0, 0);
  };

  const searchMovie = (event) => {
    const isTextSelected = window.getSelection().toString();
    //Make search onlt if the text was clicked and NOT selected.
    if (!isTextSelected) {
      const movieName = event.target.textContent;
      const url = "http://www.google.com/search?q=" + movieName + " movie";
      window.open(url, "_blank");
    }
  };

  const copyToClipboard = (movieName) => {
    var input = document.createElement("input");
    input.setAttribute("value", movieName);
    document.body.appendChild(input);
    input.select();
    var result = document.execCommand("copy");
    document.body.removeChild(input);
    return result;
  };

  const removeAllFilters = () => {
    setIsResetDisabled(true);
    setMovieFilter(prevState => ({
        ...prevState,
        genres: [],
        platforms: [],
        rating: "",
        year: ""
    }))
    getMoviesIfRemoveFilterButtonWasClicked();
  };


  const concatenateList = (list) => {
    if (list.length === 0) {
      return "Not available";
    }
    const listValues = list.map((value) => value.name);
    return listValues.join(", ");
  };

  const getResultData = (movie, index) => {
    return (
      <div
        id={`movie-${index}`}
        style={{
          display: "grid",
          gridTemplateRows: "1fr 1fr",
          alignItems: "right",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <strong
            className="movie-name"
            style={{
              maxWidth: "200px",
              marginLeft: "40px",
            }}
            onClick={searchMovie}
          >
            {movie.movieName}
          </strong>
          <label
            style={{
              fontWeight: "normal",
              marginRight: "5px",
              display: "inline-block",
            }}
          >
            ({movie.year})
          </label>
          <ClipboardIcon
            onClick={(event) => handleCopy(event, index)}
            title={"Copy movie name to clipboard"}
            className
          />
          {isCopied[index] && (
            <div
              style={{
                display: "inline",
                backgroundColor: "rgba(74,227,123,1)",
              }}
            >
              <label style={{ color: "black", margin: "2px" }}>Copied!</label>
            </div>
          )}
          <div style={{ display: "inline" }}>
            <label style={{ marginLeft: "40px" }}>
              <strong>IMdb Rating: </strong>
            </label>
            <span>{movie.rating}</span>
          </div>
          <div style={{ display: "inline" }}>
            <label>
              <strong style={{ marginLeft: "40px" }}>Genres: </strong>
            </label>
            {/* {movie.genres.forEach((genre, index) => {
                        <span key={index}>{genre.name}</span>
                    })} */}
            <span>{concatenateList(movie.genres)}</span>
            {/* <span>{movie.genre}</span> */}
          </div>
          <div style={{ display: "inline" }}>
            <strong style={{ marginLeft: "40px" }}>Platforms: </strong>
            <label>{concatenateList(movie.platforms)}</label>
          </div>
        </div>
        <div style={{ textAlign: "center" }}>{movie.description}</div>
      </div>
    );
  };

  const getButtons = () => {
    return (
      <>
        <Button
          id="filter-button"
          className="btn-primary"
          onClick={toggleDialogFilter}
          style={{
            alignContent: "center",
          }}
        >
          <label style={{ fontFamily: "serif", marginBottom: "0px" }}>
            Show Filters
          </label>
        </Button>
        <Button
          id="filter-button"
          className="btn-danger"
          onClick={removeAllFilters}
          style={{
            marginLeft: "10px",
            alignContent: "center",
          }}
          disabled={isResetDisabled}
        >
          <label style={{ fontFamily: "serif", marginBottom: "0px" }}>
            Remove all Filters
          </label>
        </Button>
        <label style={{ paddingLeft: "10px", display: "inline-block" }}>
          Showing <strong>{findStartAndEndResultNumbers()[0]}</strong> -{" "}
          <strong>{findStartAndEndResultNumbers()[1]}</strong> of{" "}
          <strong>{totalFilteredMovies} </strong>
          results
          {/* <div style={{marginLeft: '30px'}}> */}
          {/* <Button className="btn-secondary btn-sm" style={{marginLeft: '160px'}} onClick={handleGoToBottom}>Go to the bottom</Button> */}
          {/* </div> */}
        </label>
      </>
    );
  };

  const handleCopy = (event, index) => {
    const movieRow = document.getElementById(`movie-${index}`);
    const strongTag = movieRow.getElementsByClassName("movie-name")[0];
    if (strongTag) {
      const movieName = strongTag.innerText;
      copyToClipboard(movieName);
      setIsCopied((prevState) => ({
        ...prevState,
        [index]: true,
      }));
      setTimeout(() => {
        setIsCopied((prevState) => ({
          ...prevState,
          [index]: false,
        }));
      }, 3000);
    }
  };

  const handleDropdownChange = (event) => {
    setPageSize(event.target.value);
  };
  if (props.rowData.length) {
    return (
      <div id="screen">
        <div className="movie-app" style={{ marginTop: "10px" }}>
          {isFilterOpen && (
            <FilterDialog
              handleClose={handleClose}
              isFilterOpen={isFilterOpen}
              setMovies={setMovies}
              getMovies={getMovies}
              isLoading={isLoading}
              isError={isError}
              movieFilter={movieFilter}
              setMovieFilter={setMovieFilter}
              resetFilterToPreviousSearchedFilter={resetFilterToPreviousSearchedFilter}
              setCurrPage={setCurrPage}
              resetFilter={resetFilter}
            />
          )}
          <div style={{ display: "inline-block" }}>
            <div style={{ float: "left", marginLeft: "5px" }}>
              {/* <div style={{ display: "flex", justifyContent: "center" }}>
              {getSwitches()}
            </div> */}
              {getButtons()}
              <select
                onChange={handleDropdownChange}
                style={{
                  marginLeft: "430px",
                  maxHeight: "25px",
                  display: "inline",
                }}
              >
                <option key={0} value={10} selected={pageSize === "10"}>
                  {pageSize === "10"
                    ? "Showing 10 results per page"
                    : "Show 10 results per page"}
                </option>
                <option key={1} value={25} selected={pageSize === "25"}>
                  {pageSize === "25"
                    ? "Showing 25 results per page"
                    : "Show 25 results per page"}
                </option>
                <option key={2} value={50} selected={pageSize === "50"}>
                  {pageSize === "50"
                    ? "Showing 50 results per page"
                    : "Show 50 results per page"}
                </option>
                <option key={3} value={100} selected={pageSize === "100"}>
                  {pageSize === "100"
                    ? "Showing 100 results per page"
                    : "Show 100 results per page"}
                </option>
              </select>
            </div>
          </div>
          {props.rowData.map((movie, index) => {
            return (
              <div
                className={getClassName(index)}
                style={{
                  display: "grid",
                  gridTemplateColumns: "10% 90%",
                  alignItems: "center",
                  border: "5px solid white",
                }}
              >
                <div style={{ border: "5px solid transparent" }}>
                  <img src={movie.imageLink} alt={movie.movieName} />
                </div>
                <div style={{ textAlign: "left" }}>
                  {getResultData(movie, index)}
                </div>
              </div>
            );
          })}
          <div>
            <Pagination
              itemsPerPage={pageSize}
              currPage={currPage}
              totalItems={totalFilteredMovies}
              getMovies={getMovies}
              setMovies={setMovies}
              setCurrPage={setCurrPage}
            />
            <Button
              className="btn-sm btn-secondary"
              style={{ display: "inline" }}
              onClick={handleGoToTop}
            >
              Go to the top
            </Button>
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
};
