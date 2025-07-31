import { useContext ,useState} from "react";
import { createContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { useEffect } from "react";


axios.defaults.baseURL = import.meta.env.VITE_BASE_URL || "http://localhost:3000";

const AppContext = createContext(

)

export const AppProvider = ({children}) =>{

    const navigate = useNavigate();

    const [token, setToken] = useState(null);
    const [blogs, setBlogs] = useState([]);
    const [input, setInput] = useState("");

    const fetchBlogs = async () => {
        try{
           const {data} =  await axios.get('/api/blog/all');
           data.success ? setBlogs(data.blogs) : toast.error(data.message);
           
        }catch(err){
            toast.error(err.message);
        }
    }

    useEffect(()=>{
        fetchBlogs();
        const token = localStorage.getItem('token');
        if(token){
            setToken(token);
            axios.defaults.headers.common['Authorization'] = token;
        }
    },[]);

    const value = {
        axios,
        navigate,
        token,
        setToken,
        blogs,
        setBlogs,
        input,
        setInput,
    };
    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () =>{
    return useContext(AppContext);
}