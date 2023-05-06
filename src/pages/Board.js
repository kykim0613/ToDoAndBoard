import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaArrowLeft } from 'react-icons/fa';

const NoticeBoard = () => {
    const [list, setList] = useState([])
    const [form, setForm] = useState(false)
    const [selectedPost, setSelectedPost] = useState(null)
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    useEffect(() => {
        const Board = JSON.parse(localStorage.getItem('Board'))
        if (Board !== null) {
            setList(Board)
        }
    }, [])

    const checkPassword = (board) => {
        if (board.password === password) {
            setSelectedPost(board)
            setForm(true)
            navigate(`/ToDoAndBoard/Board/${board.id}`)
        } else {
            alert("비밀번호가 일치하지 않습니다.")
        }
    }

    const handleButton = () => {
        navigate(`/ToDoAndBoard/Board/Post`)
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
            <h1>Board</h1>
            <button onClick={handleButton}>
                글 작성
            </button>
            {list?.map((board) => (
                <ul key={board.id}>
                    <li onClick={() => setSelectedPost(board.id, setForm(true), setPassword(board.password))}>{board.title}</li>
                    {form && selectedPost === board.id && (
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                checkPassword(board)
                            }}
                        >
                            <input
                                type="password"
                                defaultValue={""}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button>
                                확인
                            </button>
                        </form>
                    )}
                </ul>
            ))}
        </>
    )
}

export default NoticeBoard;