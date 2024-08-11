import supabase from "../client"
// fetching functions
// fetch posts
export const fetchPosts = async () => {
    let {data: posts} = await supabase
    .from('posts')
    .select('*')
    return [...posts];
}

export const fetchPostLikes = async (postId) => {
  let { data: likes } = await supabase
  .from('post_likes')
  .select('*')
  .eq('post_id', postId)
  return [...likes]
};

export const fetchComments = async (postId) => {
    let {data: comments} = await supabase
  .from('comments')
  .select('*')
  .eq('post_id', postId)
  return [...comments];
}

export const fetchUsers = async () => {
  let { data: profiles } = await supabase
  .from('profiles')
  .select('*')
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
}

export const likePost = async (postId, userId) => {
  const { data, error } = await supabase
  .from('post_likes')
  .insert([
    { "post_id": postId, "user_id": userId },
  ])
}

