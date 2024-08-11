import supabase from "../client"
// fetching functions
// fetch posts
export const fetchPosts = async () => {
    let {data: posts} = await supabase
    .from('posts')
    .select('*')
    return [...posts];
}

export const fetchPostLikes = async () => {
  let { data: likes, error} = await supabase
  .from('post_likes')
  .select("*")
  if (error) {
    console.log(error)
  }
  return [...likes]
};

export const fetchComments = async () => {
    let {data: comments, error} = await supabase
  .from('comments')
  .select("*")
  if (error) {
    console.log(error)
  }
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
