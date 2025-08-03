import React from 'react'
import { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { toast } from 'react-hot-toast';
const Newsletter = () => {
  const [email,setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const {axios} = useAppContext();

  const handleNewsLetterSubmit = async (e) =>{
    e.preventDefault();
    if(!email) return;
    setLoading(true);
    try {
      const {data} = await axios.post('/api/send-email', {email});
      if(data.success === true){
        setEmail("");
        setLoading(false);
        toast.success(data.message);
      }else{
        toast.error(data.message);
      }
    } catch (error) {
      setLoading(false);
      setEmail("");
      toast.error(error.response?.data?.message || "Something went wrong!");
    }
  }
  
  
  return (
    <div className='flex flex-col items-center justify-center text-center space-y-2 my-32'>
      <h1 className='md:text-4xl text-2xl font-semibold'>Never Miss a Blog !</h1>
      <p className='md:text-lg text-gray-500/70 pb-8'>Subscribe to our newsletter to stay updated on the latest blog posts.</p>

        <form className='flex items-center justify-between max-w-2xl w-full md:h-13 h-12'>
          <input value={email} onChange={(e)=>setEmail(e.target.value)} type="text" placeholder="Enter your email" className='border border-gray-300 rounded-md h-full border-r-0 outline-none w-full rounded-r-none px-3 text-gray-500' />
          <button disabled={loading} onClick={handleNewsLetterSubmit}  type="submit" className='md:px-12 px-8 h-full text-white bg-primary/80 hover:bg-primary transition-all cursor-pointer rounded-md rounded-l-none'>
            {loading ? "Subscribing..." : "Subscribe"}
          </button>
        </form>
    </div>
  )
}

export default Newsletter
