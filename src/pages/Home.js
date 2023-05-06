import { Link } from "react-router-dom";

const Home = () => {

    return (
        <>
            <Link style={{textDecoration:"none", color: "red"}} to={`/ToDoAndBoard/ToDo`}>ToDoList</Link><br />
            <Link style={{textDecoration:"none", color: "blue"}} to={`/ToDoAndBoard/Board`}>Board</Link>
        </>
    )
}

export default Home;