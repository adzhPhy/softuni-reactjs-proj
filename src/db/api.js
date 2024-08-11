import supabase from "../client"
// fetching functions
// fetch posts
export const fetchPosts = async () => {
    let {data: posts, error} = await supabase
    .from('posts')
    .select('*')
    if (error) throw (error)
    return [...posts];
}

export const fetchPostLikes = async () => {
  let { data: likes, error} = await supabase
  .from('post_likes')
  .select("*")
  if (error) throw (error)
  return [...likes]
};

export const fetchComments = async () => {
    let {data: comments, error} = await supabase
  .from('comments')
  .select("*")
  if (error) throw (error)
  return [...comments];
}

export const fetchUsers = async () => {
  let { data: profiles, error } = await supabase
  .from('profiles')
  .select('*')
  if (error) throw (error)
  return [...profiles];
}


// update, insert queries

export const updatePost = async (postTitle, postContent) => {
  const { error } = await supabase
  .from('posts')
  .update([
    { "updated_at": Date.now(), "title": postTitle, "content": postContent  },
  ])
  .select("*")
  if (error) throw (error)
}

export const likePost = async (postId, userId) => {
  const { error } = await supabase
  .from('post_likes')
  .insert([
    { "post_id": postId, "user_id": userId },
  ])
  if (error) throw (error)
}         


export const insertPost = async (userId, postTitle, postContent) => {
  const { error } = await supabase
  .from('posts')
  .insert([
    { user_id: userId, title: postTitle, content: postContent, },
  ])
  .select()
  if (error) throw (error)
}
          