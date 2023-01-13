import NavBar from "../components/NavBar";
import Posts from "../components/Posts";

const User = () => {

   return (
     <div >
        <NavBar/>
        <h1 className="text-3xl font-bold px-10 my-1 text-teal-700">Feed</h1>
        <Posts/>
     </div> 
   )
}

export default User;