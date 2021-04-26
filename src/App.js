import './App.css';
import { useEffect, useState } from 'react';
import { RowsData } from './RowsData';
import LoadingOverlay from "react-loading-overlay";
import Error from './Error';
import DataNotFound from './DataNotFound';
import { withRouter } from 'react-router-dom';

function App() {

    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [currPage, setCurrPage] = useState(1);
    const [pageSize, setPageSize] = useState('25');
    const [totalMovies, setTotalMovies] = useState(0);
    const [isResetDisabled, setIsResetDisabled] = useState(true);
    const initialState = {
        rating: "",
        year: "",
        genres: [],
        platforms: []
    };

    const [movieFilter, setMovieFilter] = useState(initialState);

    //State for a hacky way to force render this component when user clicks on "go back" in the 
    //<DataNotFound/>. This is done because this page's useEffect was not being called as 
    //the link doesn't change when <DataNotFound/> is being called.
    //As a result, the link does change when the button is clicked, but the grid is not reloaded.
    const [usedReactRouter, setUsedReactRouter] = useState(false);
    const getMovies = () => {
        let queryParams = {
            'page': currPage,
            'page-size': pageSize
        }
        const { rating, year, genres, platforms } = movieFilter;
        if (rating) {
            setIsResetDisabled(false);
            queryParams = { ...queryParams, rating };
        }
        if (year) {
            setIsResetDisabled(false);
            queryParams = { ...queryParams, year };
        }
        if (genres.length) {
            setIsResetDisabled(false);
            queryParams = { ...queryParams, genres };
        }

        if (platforms.length) {
            setIsResetDisabled(false);
            queryParams = { ...queryParams, platforms };
        }
        const url = Object.keys(queryParams).length > 0 ? `/movies?${(new URLSearchParams(queryParams)).toString()}` : '/movies';
        makeApiCall(url);

    }

    const resetFilter = () => {
        console.log('reset',resetFilter)
        setMovieFilter(prevState => ({
            ...prevState,
            ...initialState,
            genres: [],
            platforms: []
        }))
    }

    const makeApiCall = (url) => {
        setIsLoading(true);
        setIsError(false);
        fetch(url)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Something went wrong...The server responsed with ', response);
            })
            .then(response => {
                setMovies(response.movies);
                setTotalMovies(response.totalFilteredMovies);
                setIsLoading(false);
                setIsError(false);
                window.scrollTo(0, 0);
            })
            .catch(err => {
                setIsError(true);
                setIsLoading(false);
            });
    }

    const getMoviesIfRemoveFilterButtonWasClicked = () => {
        const queryParams = {
            'page': currPage,
            'page-size': pageSize
        }
        const url = `http://localhost:8080/movies?${(new URLSearchParams(queryParams)).toString()}`;
        makeApiCall(url);
    }

    const resetFilterToPreviousSearchedFilter = (initialState) => {
        // console.log('initial state', initialState, movieFilter)
        setMovieFilter(prevState => ({
            ...prevState,
            ...initialState,
            genres: [...initialState.genres],
            platforms: [...initialState.platforms]
        }));
    }

    useEffect(() => {
        setIsLoading(true);
        setIsError(false);
        getMovies();

    }, [currPage, usedReactRouter, pageSize]);

    useEffect(() => {
        if (isLoading) {
            document.body.style.overflow = 'hidden';
            const loaderComponent = document.getElementsByClassName('_loading_overlay_overlay')[0];
            if (loaderComponent) {
                loaderComponent.style.position = 'fixed';
            }
        }
        else {
            document.body.style.overflow = 'auto';
        }
    }, [isLoading]);

    if (isError) {
        return <div style={{ alignContent: 'center' }}><Error /></div>
    }
    else if (!isError && !isLoading && movies.length === 0) {
        return <DataNotFound setUsedReactRouter={setUsedReactRouter} resetFilterToPreviousSearchedFilter={resetFilterToPreviousSearchedFilter}
        />
    }
    return (<div className="_loading_overlay_wrapper">
        <LoadingOverlay spinner active={isLoading}>
            <RowsData rowData={movies}
                setMovies={setMovies}
                getMovies={getMovies}
                isLoading={isLoading}
                isError={isError}
                totalFilteredMovies={totalMovies}
                currPage={currPage}
                pageSize={pageSize}
                totalFilteredMovies={totalMovies}
                setCurrPage={setCurrPage}
                setPageSize={setPageSize}
                setMovieFilter={setMovieFilter}
                movieFilter={movieFilter}
                resetFilterToPreviousSearchedFilter={resetFilterToPreviousSearchedFilter}
                getMoviesIfRemoveFilterButtonWasClicked={getMoviesIfRemoveFilterButtonWasClicked}
                isResetDisabled={isResetDisabled}
                setIsResetDisabled={setIsResetDisabled}
                resetFilter={resetFilter}
            />
        </LoadingOverlay>
    </div>
    );
}

export default withRouter(App);