import styles from "../styles/Home.module.css"

const Home = () => {
    return (
        <div className={`d-flex justify-content-center`}>
            <div className="col-2 vh-100">
                left
            </div>
            <Middle />
            <div className="col-2">
                right
            </div>
        </div>
    )
}

const Middle = () => {
    return (
        <div className="col-4 vh-100">
            middle
        </div>
    )
}

export default Home

