import React, {  useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { useParams } from 'react-router'
import { assets} from '../assets/assets' 
import Moment from 'moment' 
import Footer from '../components/Footer'
import Loader from '../components/Loader'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'
import { SpinnerInfinity } from 'spinners-react'


const Blog = () => {

  
  const {id} = useParams();
  const {axios} = useAppContext();
  const [data,setData] = useState(null);
  const [comments, setComments] = useState([]);

  const [name,setName] = useState("");
  const [content,setContent] = useState("");
  const [loading,setLoading] = useState(false);

  const fetchBlogData = async () => {
    try{
      const {data} = await axios.get(`/api/blog/${id}`);
 
      if(data.success===true){
        setData(data.blog);
      }else{
        toast.error(data.message);
      }
    }catch(error){
      toast.error(error.message || "Error fetching blog data");
    }
  }

  const addComment = async(e) =>{
    setLoading(true);
    setContent("");

    e.preventDefault();
    try{
      const {data} = await axios.post('/api/blog/add-comment', {blog: id, name, content});
      if(data.success === true){
        toast.success(data.message);
        setName("");
        fetchComments(); 
      }
      else{
        setLoading(false);
        toast.error(data.message || "Error adding comment");
      }
    }catch(err){
      toast.error(err.message || "Error adding comment");
    }finally{
      setLoading(false);
    }
  }

  const fetchComments = async () => {
    try {
      const {data} = await axios.post(`/api/blog/comments/${id}`);
      if(data.success===true){
        setComments(data.comments);
      } else {
        toast.error(data.message || "Error fetching comments");
      }

    }
    catch(error){
      toast.error(error.message || "Error fetching comments");
    }
  }
  useEffect(() => {
    fetchBlogData(),
    fetchComments();
  }, []);

  return data ? (
    <div className='relative'>
      <img src={assets.gradientBackground} alt=""  className='absolute -top-50 -z-1 opacity-50' />

      <Navbar />

      <div className='text-center mt-20 text-gray-600'>
        <p className='text-primary py-4 font-medium'>Published on: {Moment(data.createdAt).format('MMMM Do YYYY')}</p>
        <h1 className='text-2xl sm-text-5xl font-semibold max-w-2xl mx-auto text-gray-800'>{data.title}</h1>
        <h2 className='my-5 max-w-lg truncuate mx-auto'>{data.subTitle}</h2>
        <p className='inline-block py-1 px-4 rounded-full mb-6 border text-sm border-primary/35 bg-primary/5 font-medium text-primary'>Rishi 
          Verma
        </p>
      </div>
      <div className='mx-5 max-w-3xl md:mx-auto my-10 mt-6'>
        <img src={data.image} alt="" className='rounded-3xl mb-5'/>

        <div className='rich-text max-w-3xl mx-auto' dangerouslySetInnerHTML={{__html: data.description}}></div>

          <div className='mt-14 mb-10 max-w-3xl mx-auto'>
            <p className='font-semibold mb-4'>Comments: {comments.length}</p>
            <div className='flex flex-col gap-4'>
              {comments.map((item,index)=>(
                <div key={index} className='relative bg-primary/2 border border-primary/5 max-w-xl p-4 rounded text-gray-600'>
            <div className='flex items-center gap-2 mb-2'>
              <img src={assets.user_icon} alt=""  className='w-6'/>
              <p className='font-medium'>{item.name}</p>
            </div>
            <p className='text-sm max-w-md ml-8'>{item.content}</p>
            <div className='absolute right-4 bottom-3 flex items-center gap-2 text-xs'>{Moment(item.createdAt).fromNow()}</div>
                </div>
              ))   }
            </div>
          </div>
          <div className='max-w-3xl mx-auto'>
            <p className='font-semibold mb-4'>Add your comment:</p>
              <form onSubmit={addComment} className='flex flex-col items-start gap-4 max-w-lg'>
                <input onChange={(e)=>setName(e.target.value)} value={name} type="text" placeholder='Name' required className='w-full p-2 border border-gray-300  rounded outline-none' />
                <div className="relative w-full">
            <textarea
              onChange={(e)=>setContent(e.target.value)}
              value={content}
              placeholder='Comment'
              className='w-full p-2 border border-gray-300 rounded outline-none h-48 '
              required
            ></textarea>
            {loading && (
              <div className="absolute inset-0 flex justify-center items-center bg-white/70 z-10">
                <SpinnerInfinity size={90} thickness={180} speed={135} color="rgba(80, 68, 229, 1)" secondaryColor="rgba(0, 0, 0, 0.44)" />
              </div>
            )}
                </div>
                <button disabled={loading}  type="submit" className='bg-rim text-white rounded p-2 px-8 hover:scale-102 transistion-all cursor-pointer bg-primary'>{loading ? "Submiting..."  : "Submit"}</button>
              </form>
          </div>
            {/* Social buxxxxxtton */}
        <div className='my-24 max-w-3cl mx-auto'>
            <p className='font-semibold my-4'>Share this article on social media </p>
            <div className='flex cursor-pointer'>
              <img  src={assets.facebook_icon} alt="" width={50}/>
              <img src={assets.twitter_icon} alt="" width={50}/>
              <img src={assets.googleplus_icon} alt="" width={50}/>
            </div>
        </div>
      </div>
      <Footer/>
    </div>
  ) : <Loader />
}


export default Blog
