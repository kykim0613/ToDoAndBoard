import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Post = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [password, setPassword] = useState("");
    const [post, setPost] = useState([])
    const navigate = useNavigate();
    const handleInput = (e) => {
        setTitle(e.target.value)
    }
    const handleTextarea = (e) => {
        setContent(e.target.value)
    }
    const handlePassword = (e) => {
        setPassword(e.target.value)
    }
    const addPost = () => {
        if (title === "") {
            return alert("제목을 입력해주세요")
        }
        if (content === "") {
            return alert("내용을 입력해주세요")
        }
        const newPost = [...post, { id: Date.now(), title: title, text: content, password: password }]
        setPost(newPost)
        savePost(newPost)
        navigate("/ToDoAndBoard/Board")
    }
    const savePost = (post) => {
        localStorage.setItem('Board', JSON.stringify(post))
    }

    const cancelButton = () => {
        navigate(`/ToDoAndBoard/Board`)
    }

    useEffect(() => {
        const post = JSON.parse(localStorage.getItem('Board'))
        if (post !== null) {
            setPost(post)
        }
    }, [])
    return (
        <>
            <input type="text" value={title} onChange={handleInput} style={{ outline: "none", width: "400px" }}></input><br />
            <textarea value={content} onChange={handleTextarea} style={{ width: "600px", height: "400px", resize: "none", outline: "none" }} />
            <input type="password" onChange={handlePassword} value={password} style={{ outline: "none" }} />
            <button onClick={() => addPost()}>
                확인
            </button>
            <button onClick={cancelButton}>
                취소
            </button>
        </>
    )
}

export default Post;