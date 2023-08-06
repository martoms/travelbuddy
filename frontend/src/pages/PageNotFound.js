import { Link } from "react-router-dom";

const PageNotFound = () => {
    return ( 
        <>
            <div id="page404" className="page container-fluid d-flex flex-column">
                <div className="row">
                    <h1 className="scrollOffsetIndicator">Oops!</h1>
                    <h2>You wandered off too far!</h2>
                    <div>
                        <h3>Let's go home now</h3>
                        <Link to="/">Home</Link>
                    </div>
                </div>
            </div>
        </>
    );
}
 
export default PageNotFound;