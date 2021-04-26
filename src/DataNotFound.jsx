import { Button } from "@material-ui/core";
import {Link, withRouter} from 'react-router-dom';
const DataNotFound = ({setUsedReactRouter, resetFilterToPreviousSearchedFilter}) => {

    const goBack = () => {
        setUsedReactRouter(true);
        resetFilterToPreviousSearchedFilter();
    }

    return <div style={{textAlign: 'center'}}><img src={`${process.env.PUBLIC_URL}/results-not-found.png`} alt="No results found" style={{ display: 'block', margin: 'auto' }} />
    <label style={{color: 'rgba(57,12,10,1)', fontWeight: 'bold'}}>Please broaden your search scope and try again...</label>
    {/* <Button variant="link" onClick={handleGoBack}>Go back</Button> */}
    <Link to={"/home"} onClick={goBack}>Go back</Link>
</div>
}
 
export default withRouter(DataNotFound);