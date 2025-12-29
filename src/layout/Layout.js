import { Outlet } from "react-router-dom"
import Header from "../components/common/Header"
import Footer from "../components/common/Footer"
import Gnb from "../components/common/Gnb"

const Layout = () => {
    return (
        <div className="wrapper">
            <Header/>
            <main>
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}

export default Layout
