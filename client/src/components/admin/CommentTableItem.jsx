import React from 'react'
import { assets } from '../../assets/assets';
import { use } from 'react';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';
const CommentTableItem = ({ comment ,fetchComments }) => {
  const {blog, createdAt, _id} = comment;

  const {axios} = useAppContext();
  const approveComment = async () =>{
    try{
        const {data} = await axios.post(`/api/admin/approve-comment/${_id}`);
        if(data.success===true){
            toast.success(data.message);
            fetchComments();
        }
        else{
            toast.error(data.message || "Error approving comment");
        }
    }catch(err){
        toast.error(err.message || "Error approving comment");
    }
  }

  const deleteComment = async () =>{
    const confirmDelete = window.confirm("Are you sure you want to delete this comment?");
    if(!confirmDelete){
        return;
        }
    try{
        const {data} = await axios.post(`/api/admin/delete-comment/${_id}`);
        if(data.success===true){
            toast.success(data.message);
            fetchComments();
        }
        else{
            toast.error(data.message || "Error deleting comment");
        }
    }catch(err){
        toast.error(err.message || "Error deleting comment");
    }
  }
  const BlogDate = new Date(createdAt);
    return (
    <tr className='order-y border-gray-300'>
        <td className='px-6 py-4'>
            <b className='font-medium text-gray-600'>Blog </b> : {blog.title}
            <br />
            <br />
            <b className='font-medium text-gray-600'>Name</b> : {comment.name}
            <br />
            <b className='font-medium text-gray-600'>Comment</b>
        </td>
        <td className='px-6 py-4 max-sm:hidden'>
            {BlogDate.toLocaleDateString()}
        </td>

        <td className='px-6 py-4 max-sm:hidden'>
            <div className='inline-flex items-center gap-4'>
                {!comment.isApproved ? 
               <img onClick={approveComment} src={assets.tick_icon} className='w-5 hover:scale-110 transition-all cursor-pointer' alt="" /> : <p className='text-xs border border-green-600 bg-green-100  text-green-600 rounded-full px-3 py-1'>Approved</p> }

               <img onClick={deleteComment} src={assets.bin_icon} alt="" className='w-5 hover:scale-100 transition-all cursor-pointer'/>
            </div>
        </td>


    </tr>
  )
}

export default CommentTableItem
