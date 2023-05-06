import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

const PostDetailPage = () => {
    const [newPost, setNewPost] = useState([])
    const [post, setPost] = useState([])
    const [updateButton, setUpdateButton] = useState(false)
    const [deleteButton, setDeleteButton] = useState(false)
    const [passwordForm, setPasswordForm] = useState(null)
    const [password, setPassword] = useState()
    const [update, setUpdate] = useState(false)
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        const Board = JSON.parse(localStorage.getItem('Board'))
        const BoardFilter = Board.filter((board) => board.id === Number(id))
        if (Board !== null) {
            setPost(BoardFilter)
            setNewPost(Board)
            BoardFilter.map((board) => {
                setPassword(board.password)
                setTitle(board.title)
                setContent(board.text)
            })
        }
    }, [])

    const handleForm = (e) => {
        e.preventDefault();
        if (passwordForm === String(password)) {
            setUpdate(true)
            setUpdateButton(false)
        } else (
            alert("비밀번호가 틀렸습니다.")
        )
    }

    const handleInput = (e) => {
        setPasswordForm(e.target.value)
    }

    const addupdate = () => {
        // 게시글 수정 생각했을 때 처음 한 접근법 ↓
        // const newUpdate = [{id: Number(id), title: updateTitle, text:updatePost, password:String(password)}]
        // const save = {id: Number(id), title: updateTitle, text:updatePost, password:String(password)}
        // console.log(newPost.indexOf(post))
        // const find = newPost.splice(prePost, 1, save)
        // setPost(newUpdate)
        // saveUpdate(find)
        if (title === "") {
            setUpdate(true)
            return alert("타이틀을 입력해주세요")
        }
        if (content === "") {
            setUpdate(true)
            return alert("내용을 입력해주세요")
        }

        const editPost = newPost.map((p) => {
            if (p.id === Number(id)) {
                return { ...p, title: title, text: content }
            } return p
        })
        setPost(editPost.filter((p) => p.id === Number(id)));
        saveUpdate(editPost);
        setUpdate(false)
        navigate(`/ToDoAndBoard/Board/${id}`)
    }

    const deletePost = (e) => {
        if (passwordForm !== String(password)) {
            return alert("비밀번호가 틀렸습니다")
        }
        if (passwordForm === String(password)) {
            const deletePost = newPost.filter((p) => p.id !== Number(id))
            saveUpdate(deletePost)
            navigate(`/ToDoAndBoard/Board`)
        }
        e.preventDefault();
    }

    const saveUpdate = (post) => {
        localStorage.setItem('Board', JSON.stringify(post))
        console.log(post)
    }



    return (
        <>
            {update ? (
                <>
                    {post.map((board) => (
                        <form key={board.id} onSubmit={(e) => e.preventDefault()}>
                            <input defaultValue={board.title} onChange={(e) => setTitle(e.target.value)} style={{ outline: "none", width: "400px" }} />
                            <textarea defaultValue={board.text} onChange={(e) => setContent(e.target.value)} style={{ width: "600px", height: "400px", resize: "none", outline: "none" }}></textarea>
                            <button onClick={() => addupdate()}>수정</button>
                            <button onClick={() => setUpdate(false)}>취소</button>
                        </form>
                    ))}
                </>
            ) : (
                <>
                    {post.map((board) => (
                        <div key={board.id}>
                            <h1>{board.title}</h1>
                            <span>{board.text}</span>
                            <button onClick={() => setUpdateButton(true)}>수정</button>
                            <button onClick={() => setDeleteButton(true)}>삭제</button>
                            {updateButton && (
                                <div>
                                    <form onSubmit={handleForm}>
                                        <input type="password" defaultValue={""} onChange={handleInput} />
                                        <button>확인</button>
                                    </form>
                                </div>
                            )}
                            {deleteButton && (
                                <div>
                                    <form onSubmit={deletePost}>
                                        <input type="password" defaultValue={""} onChange={handleInput} />
                                        <button>확인</button>
                                    </form>
                                </div>
                            )}
                        </div>
                    ))}
                </>
            )}
        </>
    )
}

export default PostDetailPage;