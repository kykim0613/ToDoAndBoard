import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router";

const ToDoList = () => {
    const [toDo, setToDo] = useState("");
    const [toDoList, setToDoList] = useState([]);
    const navigate = useNavigate()

    useEffect(() => {
        const getToDo = localStorage.getItem('ToDo-List')
        if (getToDo !== null) {
            setToDoList(JSON.parse(getToDo))
        }
    }, [])

    const formEvent = (e) => {
        e.preventDefault()
    }
    const handleInput = (e) => {
        setToDo(e.target.value)
    }

    const saveToDoList = (List) => {
        localStorage.setItem('ToDo-List', JSON.stringify(List))
    }

    const addToDo = () => {
        if (toDo === "")
            return alert("ToDo를 입력해주세요.")
        const addList = [...toDoList, { id: Date.now(), text: toDo }]
        saveToDoList(addList)
        setToDoList(addList)
        setToDo("")
    }

    const deleteToDo = (id) => {
        const deleteList = toDoList.filter((todo) => todo.id !== id);
        saveToDoList(deleteList)
        setToDoList(deleteList)
    }
    const backButton = () => {
        navigate(`/ToDoAndBoard`)
    }


    return (
        <>
            <button
                onClick={backButton}
                style={{ border: "none", background: "none", cursor: "pointer" }}
            >
                <FaArrowLeft size={30} />
            </button>
            <h1>ToDo-List</h1>
            <form onClick={formEvent}>
                <input type="text" value={toDo} onChange={handleInput} />
                <button onClick={() => addToDo()}>추가</button>
            </form>
            {toDoList?.map((todo) => (
                <div key={todo.id}>
                    <span>{todo.text}</span>
                    <button onClick={() => deleteToDo(todo.id)}>삭제</button>
                </div>
            ))}
        </>
    )
}

export default ToDoList;