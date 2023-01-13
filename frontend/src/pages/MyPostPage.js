import NavBar from "../components/NavBar";
import MyPosts from "../components/MyPosts";


const MyPostPage = () => {

   return (
     <div >
        <NavBar/>
        <h1 className="text-3xl font-bold px-10 my-1 text-teal-700">My Posts</h1>
        <MyPosts/>
     </div> 
   )
}

export default MyPostPage;