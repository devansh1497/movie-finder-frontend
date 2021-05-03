import React, { useState } from "react";
import "./css/styles.css";
import "./css/utilities.css";
import ClipboardIcon from "react-clipboard-icon";

const Card = ({ movie, index }) => {
  const [isCopied, setIsCopied] = useState({});

  const concatenateList = (list) => {
    if (list.length === 0) {
      return "Not available";
    }
    const listValues = list.map((value) => value.name);
    return listValues.join(", ");
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

  const handleCopy = (_event, index) => {
    const movieRow = document.getElementById(`row-${index}`);
    const movieName = movieRow.innerText;
    if (movieName) {
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

  const searchMovie = (event) => {
    const isTextSelected = window.getSelection().toString();
    //Make search onlt if the text was clicked and NOT selected.
    if (!isTextSelected) {
      const movieName = event.target.firstChild.data;
      const url = "http://www.google.com/search?q=" + movieName + " movie";
      window.open(url, "_blank");
    }
  };

  const { movieName, imageLink, rating, year, genres, platforms } = movie;
  return (
    <div className="card-grid my-1 grid">
      <img src={imageLink} alt="preview-image" className="icon" />
      <div className="all-center flex">
        <label id={`row-${index}`} className="all-center" onClick={searchMovie}>
          {movieName}
          <span> ({year})</span>
        </label>

        <div className="copy-icon">
          <ClipboardIcon
            onClick={(event) => handleCopy(event, index)}
            title={"Copy movie name to clipboard"}
            className
          />
          {isCopied[index] && (
            <div
              style={{
                display: "inline",
                backgroundColor: "rgba(26,77,43,1)",
                height: "20px",
              }}
            >
              <label style={{ color: "white", margin: "1px" }}>Copied!</label>
            </div>
          )}
        </div>
      </div>

      <div className="all-center flex">
        <label>
          IMdb: <span className="value">{rating}</span>
        </label>
      </div>
      <div className="all-center flex">
        <label>
          Genres: <span className="value">{concatenateList(genres)}</span>
        </label>
      </div>
      <div className="all-center flex">
        <label>
          Platforms: <span className="value">{concatenateList(platforms)}</span>
        </label>
      </div>
      <p className="description">{movie.description}</p>
    </div>
  );
};

export default Card;
