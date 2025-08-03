import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { useParams } from 'react-router'
import { assets } from '../assets/assets'
import Moment from 'moment'
import Footer from '../components/Footer'
import Loader from '../components/Loader'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'
import { SpinnerInfinity } from 'spinners-react'

const Blog = () => {
  const { id } = useParams();
  const { axios } = useAppContext();
  const [data, setData] = useState(null);
  const [comments, setComments] = useState([]);
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchBlogData = async () => {
    try {
      const { data } = await axios.get(`/api/blog/${id}`);
      if (data.success) {
        setData(data.blog);
      } else {
        toast.error(data.message);
      }
    } catch {
      toast.error("Error fetching blog data");
    }
  }

  const addComment = async (e) => {
    e.preventDefault();
    if (!name.trim() || !content.trim()) return;
    setContent("");
    setLoading(true);
    try {
      const { data } = await axios.post('/api/blog/add-comment', { blog: id, name, content });
      if (data.success==true) {
        toast.success(data.message);
        setName("");
        setContent("");
        fetchComments();
      } else {
        toast.error(data.message);
      }
    } catch {
      toast.error("Failed to add comment");
    } finally {
      setLoading(false);
    }
  }

  const fetchComments = async () => {
    try {
      const { data } = await axios.post(`/api/blog/comments/${id}`);
      if (data.success) setComments(data.comments);
    } catch {
      console.log("Error fetching comments");
    }
  }

  useEffect(() => {
    fetchBlogData();
    fetchComments();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!data) return <Loader />;

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 to-blue-50'>
      <Navbar />
      
      {/* Hero Section */}
      <div className='max-w-4xl mx-auto px-6 pt-24 pb-12'>
        <div className='text-center mb-12'>
          <div className='inline-flex items-center gap-2 bg-[#5044E5]/10 px-4 py-2 rounded-full mb-6'>
            <div className='w-2 h-2 bg-[#5044E5] rounded-full animate-pulse'></div>
            <span className='text-[#5044E5] font-medium text-sm'>
              {Moment(data.createdAt).format('MMMM Do, YYYY')}
            </span>
          </div>
          
          <h1 className='text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight'>
            {data.title}
          </h1>
          
          <p className='text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed'>
            {data.subTitle}
          </p>
          
          <div className='flex items-center justify-center gap-3'>
            <div className='w-12 h-12 bg-gradient-to-r from-[#5044E5] to-purple-600 rounded-full flex items-center justify-center'>
              <span className='text-white font-bold text-lg'>R</span>
            </div>
            <div className='text-left'>
              <p className='font-semibold text-gray-900'>Rishi Verma</p>
              <p className='text-sm text-gray-500'>Author</p>
            </div>
          </div>
        </div>

        {/* Featured Image */}
        <div className='relative mb-16 group'>
          <img 
            src={data.image} 
            alt={data.title}
            className='w-full h-[400px] object-cover rounded-3xl shadow-2xl transition-transform duration-700 group-hover:scale-[1.02]'
          />
          <div className='absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-3xl'></div>
        </div>

        {/* Article Content */}
        <article className='prose prose-lg max-w-none mb-20'>
          <div 
            className='rich-text text-gray-700 leading-relaxed' 
            dangerouslySetInnerHTML={{ __html: data.description }}
          />
        </article>

        {/* Social Share */}
        <div className='flex items-center justify-center gap-4 mb-16 p-6 bg-white rounded-2xl shadow-lg'>
          <span className='text-gray-600 font-medium'>Share this article:</span>
          <div className='flex gap-3'>
            {[assets.facebook_icon, assets.twitter_icon, assets.googleplus_icon].map((icon, i) => (
              <button key={i} className='w-12 h-12 rounded-full bg-gray-100 hover:bg-[#5044E5] hover:scale-110 transition-all duration-300 flex items-center justify-center group'>
                <img src={icon} alt="social" className='w-6 h-6 group-hover:brightness-0 group-hover:invert transition-all duration-300' />
              </button>
            ))}
          </div>
        </div>

        {/* Comments Section */}
        <div className='bg-white rounded-3xl shadow-xl p-8 mb-8'>
          <h3 className='text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3'>
            <div className='w-8 h-8 bg-[#5044E5] rounded-lg flex items-center justify-center'>
              <span className='text-white text-sm font-bold'>{comments.length}</span>
            </div>
            Comments
          </h3>

          <form onSubmit={addComment} className='mb-8 p-6 bg-gray-50 rounded-2xl'>
            <div className='grid md:grid-cols-2 gap-4 mb-4'>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder='Your name'
                className='px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#5044E5] focus:border-transparent outline-none transition-all'
                required
              />
            </div>
            <div className="relative mb-4">
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder='Share your thoughts...'
                rows="4"
                className='w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#5044E5] focus:border-transparent outline-none transition-all resize-none'
                required
              />
              {loading && (
                <div className="absolute inset-0 flex items-center justify-center bg-white/60 rounded-lg z-10">
                  <SpinnerInfinity size={90} thickness={180} speed={135} color="rgba(80, 68, 229, 1)" secondaryColor="rgba(0, 0, 0, 0.44)" />
                </div>
              )}
            </div>
            <button
              type="submit"
              disabled={loading}
              className='bg-[#5044E5] hover:bg-[#4338CA] text-white px-8 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed'
            >
              {loading ? 'Posting...' : 'Post Comment'}
            </button>
          </form>

          {/* Comments List */}
          <div className='space-y-4 max-h-96 overflow-y-auto'>
            {comments.map((comment, index) => (
              <div key={index} className='group p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-100 hover:shadow-md transition-all duration-300'>
                <div className='flex items-start gap-3'>
                  <div className='w-10 h-10 bg-gradient-to-r from-[#5044E5] to-purple-600 rounded-full flex items-center justify-center flex-shrink-0'>
                    <span className='text-white font-bold text-sm'>{comment.name[0].toUpperCase()}</span>
                  </div>
                  <div className='flex-1'>
                    <div className='flex items-center gap-2 mb-2'>
                      <h4 className='font-semibold text-gray-900'>{comment.name}</h4>
                      <span className='text-xs text-gray-500'>{Moment(comment.createdAt).fromNow()}</span>
                    </div>
                    <p className='text-gray-700 leading-relaxed'>{comment.content}</p>
                  </div>
                </div>
              </div>
            ))}
            {comments.length === 0 && (
              <div className='text-center py-8 text-gray-500'>
                <p>No comments yet. Be the first to share your thoughts!</p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Blog;
