import React, { useState } from "react";
import "./css/App.css";
import { FilterDialog } from "./FilterDialog";
import Button from "react-bootstrap/Button";
import Pagination from "./Pagination";
import _ from "lodash";
import Card from "./Card.jsx";
import './css/utilities.css';
export const RowsData = (props) => {
  const [isFilterOpen, setFilterOpen] = useState(false);

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
    resetFilter,
  } = props;

  const toggleDialogFilter = () => {
    if(!isFilterOpen){
      console.log('setting to hidden', isFilterOpen)
      document.getElementById('main-app').style.overflow = 'hidden';
    }
    else{
      document.getElementById('main-app').style.overflow = 'auto';

    }
    setFilterOpen((prevValue) => !prevValue);
  };

  const handleClose = () => {
    setFilterOpen(false);
  };

  const findStartAndEndResultNumbers = () => {
    const start = (currPage - 1) * pageSize + 1;
    const end = Math.min(start + parseInt(pageSize) - 1, totalFilteredMovies);
    return [start, end];
  };

  const handleGoToTop = () => {
    window.scrollTo(0, 0);
  };

  const removeAllFilters = () => {
    setIsResetDisabled(true);
    setMovieFilter((prevState) => ({
      ...prevState,
      genres: [],
      platforms: [],
      rating: "",
      year: "",
    }));
    getMoviesIfRemoveFilterButtonWasClicked();
  };

  const getRow = (movie, index) => (
    <Card classname="card" movie={movie} index={index} />
  );

  const getButtons = () => {
    return (
      <div className="flex-wrap topbar-buttons">
         <Button
          id="filter-button"
          className="btn-primary button"
          onClick={toggleDialogFilter}
          
        >
          <label style={{ fontFamily: "serif", marginBottom: "0px", letterSpacing: '1px' }}>
            FILTERS
          </label>
        </Button> 
         <Button
          id="filter-button"
          className="btn-danger button"
          onClick={removeAllFilters}
          disabled={isResetDisabled}
        >
          <label style={{ fontFamily: "serif", marginBottom: "0px" ,letterSpacing: '1px'}}>
            REMOVE ALL
          </label>
         </Button> 
      </div>
    );
  };

  const handleDropdownChange = (event) => {
    setPageSize(event.target.value);
  };
  if (props.rowData.length) {
    return (
      <div id="row-data" className="data-section" style={{width: '60vw', margin: '0 auto'}}>
        <div className="container py-3">
          <div className='filter-view'>
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
              resetFilterToPreviousSearchedFilter={
                resetFilterToPreviousSearchedFilter
              }
              setCurrPage={setCurrPage}
              resetFilter={resetFilter}
            />
          )}
          </div>

          <div className="flex px-half">
            {getButtons()}
            <div>
            <label style={{ paddingLeft: "10px", display: "inline-block" }}>
              Showing <strong>{findStartAndEndResultNumbers()[0]}</strong> -{" "}
              <strong>{findStartAndEndResultNumbers()[1]}</strong> of{" "}
              <strong>{totalFilteredMovies} </strong>
              results
            </label>
            </div>
            <div className="flex-end dropdown">
              <select onChange={handleDropdownChange}>
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
            {/* <hr/> */}
          </div>

          <div className="rows px-half">
            {props.rowData.map((movie, index) => {
              return getRow(movie, index);
            })}
          </div>
          </div>
          <section className="pagination">
          <div className="py-top-half flex flex-column all-center">
            <Pagination
              itemsPerPage={pageSize}
              currPage={currPage}
              totalItems={totalFilteredMovies}
              getMovies={getMovies}
              setMovies={setMovies}
              setCurrPage={setCurrPage}
            />
            <Button
              className="button btn-sm btn-secondary"
              style={{ display: "inline" }}
              onClick={handleGoToTop}
            >
              Go to the top
            </Button>
          </div>
          </section>
        </div>
      // </div>
    );
  } else {
    return null;
  }
};
