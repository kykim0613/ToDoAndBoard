import { Link } from "react-router-dom";

const Home = () => {

    return (
        <>
            <Link to={`/ToDoAndBoard/ToDo`}>ToDoList</Link><br />
            <Link to={`/ToDoAndBoard/Board`}>Board</Link>
        </>
    )
}

export default Home;