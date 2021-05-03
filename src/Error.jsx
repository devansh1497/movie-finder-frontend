import { Button } from "@material-ui/core";
import {Link} from 'react-router-dom';
const Error = () => {
    return (<>
        <label style={{textAlign: 'center', marginLeft: '25%', marginTop: '10%'}}>
            <p style={{fontWeight: 'bolder', zoom: '500%', fontFamily: 'fantasy'}}>Aw, Snap!</p>
            <p style={{fontWeight: 'bold', zoom: '100%'}}>Something went wrong. Please try again.</p>
            <p>Please consider reporting this issue to <strong>Devansh Singh</strong> on <strong>devanshsingh1997@gmail.com</strong> if it persists.</p>
        </label>
        </>)
}
 
export default Error;