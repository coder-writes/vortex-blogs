import React from 'react'
import { assets } from '../../assets/assets'
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';
const BlogTableItem = ({blog,fetchblogs,index}) => {
    const {title,createdAt} = blog;
    const BlogDate = new Date(createdAt);


    const {axios} = useAppContext();

    const deleteBlog = async () =>{
      const confirmDelete = window.confirm("Are you sure you want to delete this blog?");
      if(!confirmDelete){
        return;
    }
      try{
        const {data} = await axios.delete(`/api/blog/${blog._id}`);
        if(data.success){
          toast.success("Blog deleted successfully");
          await fetchblogs();
        }
        else{
          toast.error(data.message || "Error deleting blog");
        }
      }catch(err){
        toast.error(err.message || "Error deleting blog");
      }
    }

    const togglePublish = async() =>{
      try{

        const {data} = await axios.put(`/api/blog/${blog._id}/toggle-publish`); 
        if(data.success===true){
          toast.success(data.message);
          await fetchblogs();
        }else{
          toast.error(data.message || "Error toggling publish status");
        }
      }catch(err){
        toast.error(err.message || "Error toggling publish status");
      }
    }
    return (
    <tr>
      <th className='px-2 py-4'>{index}</th>
      <td className='px-2 py-4'>{title}</td>
      <td className='px-2 py-4 max-sm:hidden'>{BlogDate.toDateString()}</td>
      <td className='px-2 py-4 max-sm:hidden'>
        <p className={`${blog.isPublished ? 
'text-green-500' : 'text-orange-500'
        }`}>{blog.isPublished ? 'Published' : 'Unpublished'}</p>
      </td>

      <td className='px-2 py-4 flex text-xs gap-3' >
        <button onClick={togglePublish} className='border p-2 py-0.5 mt-1 rounded cursor-pointer'>{blog.isPublished ? 'Unpublish' : 'Publish'}</button>
        <img src={assets.cross_icon} className='w-8 hover:scale-110 transition-all cursor-pointer' alt=""  onClick={deleteBlog}/>
      </td>
    </tr>
  )
}

export default BlogTableItem
