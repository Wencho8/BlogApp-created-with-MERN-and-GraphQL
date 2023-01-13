import NavBar from "../components/NavBar";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EditPostForm from "../components/EditPostForm";


const EditPage = () => {
    const postId = useParams().postId;
    const [post, setPost] = useState({});
    const [user, setUser] = useState('');
  
    const fetcher = async () => {
      const response = await fetch(
        `http://localhost:5000/feed/getPost/${postId}`
      );
      const data = await response.json();
      setPost(data.post); 
      console.log(data.post);
      setUser(data.post.creator.name);

    };
  
    useEffect(() => {
      fetcher();
    }, []);
  
    return (
      <>
        <NavBar />
        <EditPostForm post={post} user={user}/>
      </>
    );
}

export default EditPage;