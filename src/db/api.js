import supabase from "../client"
// fetching functions
// fetch posts
export const fetchPosts = async () => {
    let {data:posts} = await supabase
    .from('posts')
    .select('*')
    return [...posts];
}
// fetch comments of a specific post
export const fetchComments = async (postId) => {
    let {data: comments} = await supabase
  .from('comments')
  .select('*').eq('post', postId)
  return [...comments];
}

export const handleEmailChange = async () => {
  
}