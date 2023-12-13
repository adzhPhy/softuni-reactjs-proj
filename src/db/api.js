import supabase from "../client"
// fetching functions
// fetch posts
export const fetchPosts = async () => {
    let {data: posts} = await supabase
    .from('posts')
    .select('*')
    return [...posts];
}

export const fetchPost = async (postId) => {
  let {data: posts} = await supabase
  .from('posts')
  .select().eq('id', postId)
  return [...posts];
}

// fetch comments of a specific post
export const fetchComments = async (postId) => {
    let {data: comments} = await supabase
  .from('comments')
  .select('*').eq('post_id', postId)
  return [...comments];
}

export const fetchUsers = async (userId) => {
  let { data: profiles } = await supabase
  .from('profiles')
  .select('*').eq('id', userId)
  return [...profiles];
}

export const updatePost = async (postId, userId) => {}


export const likePost = async (postId, userId) => {
  const { data, error } = await supabase
  .from('post_likes')
  .insert([
    { post_id: postId, user_id: userId },
  ])
  .select()
}