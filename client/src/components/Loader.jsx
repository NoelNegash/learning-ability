import { Spinner } from "react-bootstrap";

const Loader = () => {
    return(
        <Spinner
            animation="border"
            role="status"
            style={{
                width: "30px", height: "30px", display:"block", margin:"auto"
            }}>
            
        </Spinner>
    )
}

export default Loader