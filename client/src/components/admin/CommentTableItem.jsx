import React from 'react'
import { assets } from '../../assets/assets';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';
import ComingSoon from '../../pages/ComminSoon';
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
        <tr className="border-b border-gray-200 hover:bg-[#f6f6ff] transition-colors">
            <td className="px-6 py-5">
                <div className="mb-2 text-[#5044E5] font-semibold text-base">{blog.title}</div>
                <div className="text-sm text-gray-500 mb-1">
                    <span className="font-medium text-[#5044E5]">Name:</span> {comment.name}
                </div>
                <div className="text-sm text-gray-700 italic border-l-4 border-[#5044E5] pl-3 mt-1">
                    {comment.content}
                </div>
            </td>
            <td className="px-6 py-5 max-sm:hidden text-sm text-gray-400">
                {BlogDate.toLocaleDateString()}
            </td>
            <td className="px-6 py-5 max-sm:hidden">
                <div className="flex items-center gap-4">
                    {!comment.isApproved ? (
                        <button
                            onClick={approveComment}
                            className="rounded-full cursor-pointer  bg-red-50 hover:bg-red-100 transition-colors p-2"
                            title="Approve"
                        >
                            <img src={assets.tick_icon} className="w-4" alt="Approve" />
                        </button>
                    ) : (
                        <span className="text-xs border border-[#5044E5] bg-[#f0efff] text-[#5044E5] rounded-full px-3 py-1">
                            Approved
                        </span>
                    )}
                    <button
                        onClick={deleteComment}
                        className="rounded-full cursor-pointer bg-red-50 hover:bg-red-500 transition-colors p-2"
                        title="Delete"
                    >
                        <img src={assets.bin_icon} alt="Delete" className="w-4" />
                    </button>
                </div>
            </td>
        </tr>
    )
}

export default CommentTableItem
