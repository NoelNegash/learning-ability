import { useSelector } from "react-redux"
import RegisteredHomePage from "./RegisteredHomePage"
import UnregisteredHomePage from "./UnregisteredHomePage"

const HomePage = () => {

    const { userInfo } = useSelector((state) => state.auth)

    return (
        <>
            { userInfo ? <RegisteredHomePage/> : <UnregisteredHomePage/> }
        </>
    )
}

export default HomePage