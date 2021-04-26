import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import React, { Fragment, useEffect, useState } from "react";
import { FormControlLabel } from "@material-ui/core";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import Checkbox from "@material-ui/core/Checkbox";
import { makeStyles } from "@material-ui/core/styles";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import "./App.css";
import { NotificationManager } from "react-notifications";
import Switch from "@material-ui/core/Switch";
import _ from 'lodash';
const useStyles = makeStyles({
  paperFullWidth: {
    overflowY: "visible",
  },
  dialogContentRoot: {
    overflowY: "visible",
  },
});

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

export const FilterDialog = (props) => {
  const {
    isError,
    getMovies,
    movieFilter,
    setMovieFilter,
    resetFilterToPreviousSearchedFilter,
    setCurrPage,
    resetFilter
  } = props;

  const getRatings = () => {
    const ratings = [];
    for (let rating = 1; rating <= 10; rating++) {
      ratings.push(rating);
      ratings.push(rating + 0.5);
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
  const getForm = () => {
    return (
      <div>
        <div
          style={{ display: "flex", flexWrap: "wrap", whiteSpace: "nowrap" }}
        >
          <div style={{ paddingTop: "10px" }}>
            <label
              style={{
                width: "30%",
                textAlign: "right",
                marginRight: "150px",
                flexBasis: "XX%",
              }}
            >
              <strong>IMdb Rating: </strong>
            </label>
          </div>
          <div style={{ display: "inline-block", alignItems: "float-right" }}>
            <Dropdown
              className="rating-dropdown"
              options={getRatings()}
              onChange={handleDropdownChange}
              placeholder="Select"
            />
          </div>
        </div>

        <div
          style={{
            marginTop: "15px",
            display: "flex",
            flexWrap: "wrap",
            whiteSpace: "nowrap",
          }}
        >
          <label
            style={{
              textAlign: "right",
              marginRight: "230px",
              marginTop: "6px",
              flexBasis: "XX%",
            }}
          >
            <strong>Year: </strong>
          </label>

          <MuiPickersUtilsProvider
            utils={DateFnsUtils}
            style={{ paddingTop: 0 }}
          >
            <DatePicker
              style={{ width: 35, paddingTop: 0 }}
              views={["year"]}
              value={
                movieFilter.year !== ""
                  ? new Date(`${movieFilter.year}-01-01`)
                  : null
              }
              onChange={handleYearChange}
              maxDate={new Date()}
              defaultValue={undefined}
            />
          </MuiPickersUtilsProvider>
        </div>
      </div>
    );
  };

  const handleSelectAllCheckboxes = (name, values) => {
    setMovieFilter((prevState) => ({
      ...prevState,
      [name]: [...values],
    }));
  };

  const handleDeselectAllCheckboxes = (name) => {
    setMovieFilter((prevState) => ({
      ...prevState,
      [name]: [],
    }));
  };

  const getGenres = () => {
    genres.sort();
    const checkboxes = [];
    genres.forEach((genre) =>
      checkboxes.push(
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

  const handleYearChange = (date) => {
    setMovieFilter((prevState) => ({
      ...prevState,
      year: date.getFullYear(),
    }));
  };

  const handleFiltersApplied = () => {
    initialFilterState = _.cloneDeep(movieFilter);
    getMovies(movieFilter);
    setCurrPage(1);
    props.handleClose();
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

  const getSwitches = () => {
    const platformNames = ["Netflix", "Amazon Prime", "Hotstar", "Sony Liv"];
    return platformNames.map((name, index) => {
      return (
        <div
          style={{
            // marginLeft: "35px",
            textAlign: "center",
            width: "175px",
            maxHeight: "20px",
          }}
          key={index}
        >
          <div style={{ display: "inline-block" }}>
            <strong>{name}</strong>
          </div>
          <div style={{ display: "inline-block" }}>
            <Switch
              checked={movieFilter.platforms.includes(name)}
              onChange={handlePlatformChange}
              color="primary"
              name={name}
              inputProps={{ "aria-label": "primary checkbox" }}
            />
          </div>
        </div>
      );
    });
  };

  const isApplyDisabled = () => {
      return _.isEqual(initialFilterState, movieFilter);
  }

  const isResetDisabled = () => {
      return _.isEqual(initialFilterState, movieFilter);
  }

  const isAnyFilterPresent = () => {
    let isFilterPresent = false;
    console.log(movieFilter)
    Object.values(movieFilter).forEach((filter) => {
      if (
        (Array.isArray(filter) || typeof filter === "string") &&
        filter.length > 0
      ) {
        isFilterPresent = true;
      } else if (typeof filter === "number") {
        isFilterPresent = true;
      }
    });
    return isFilterPresent;
  };

  useEffect(() => {
    initialFilterState = _.cloneDeep(movieFilter);
  }, []);

  const handleCancel = () => {
      resetFilterToPreviousSearchedFilter(initialFilterState);
      props.handleClose()
  }

  const classes = useStyles();
  return (
    <div>
      {isError && NotificationManager.error("Please try again", "Failed", 5000)}
      <Dialog
        // fullWidth
        open={props.isFilterOpen}
        onClose={props.handleClose}
        aria-labelledby="form-dialog-title"
        classes={{ paperFullWidth: classes.paperFullWidth }}
        disableBackdropClick={true}
        maxWidth="sm"
      >
        <DialogTitle id="form-dialog-title">Filters</DialogTitle>
        <DialogContent
          classes={{
            root: classes.dialogContentRoot,
          }}
        >
          <DialogContentText>
            Select the appropriate filters and click on "Apply"
          </DialogContentText>
          <Fragment>
            {getForm()}

            <div>{getGenres()}</div>
            <div
              style={{
                display: "flex",
                marginBottom: "20px",
                justifyContent: "center",
                whiteSpace: "nowrap",
              }}
            >
              {getSwitches()}
            </div>
            <Button onClick={() => handleSelectAllCheckboxes("genres", genres)}>
              Select all categories
            </Button>
            <Button
              onClick={() => handleDeselectAllCheckboxes("genres")}
              color="secondary"
            >
              Deselect all categories
            </Button>
          </Fragment>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="secondary">
            Cancel
          </Button>
          <Button onClick={props.resetFilter} color="secondary" disabled={!isAnyFilterPresent()}>
            Remove all
          </Button>
          <Button onClick={() => resetFilterToPreviousSearchedFilter(initialFilterState)} color="primary" disabled={isResetDisabled()}>
            Reset
          </Button>
          <Button onClick={handleFiltersApplied} color="primary" disabled={isApplyDisabled()}>
            Apply
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
