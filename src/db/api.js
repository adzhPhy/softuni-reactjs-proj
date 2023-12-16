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
  .select().eq("post_id", postId.toString())
  return [...posts];
}

// fetch comments of a specific post
export const fetchComments = async (postId) => {
    let {data: comments} = await supabase
  .from('comments')
  .select().eq("post_id", postId.toString())
  return [...comments];
}

export const fetchUser = async (userId) => {
  let { data: profiles } = await supabase
  .from('profiles')
  .select().eq("user_id", userId.toString())
  return [...profiles];
}

export const fetchPostLikes = async (postId) => {
  let {data: likes} = await supabase
  .from("post_likes")
  .select().match({post_id: postId})
  return [...likes]
};

export const updatePost = async (postTitle, postContent) => {
  const { error } = await supabase
  .from('posts')
  .insert([
    { "updated_at": Date.now(), title: postTitle, content: postContent  },
  ])
  .select()
}

export const likePost = async (postId, userId) => {
  const { error } = await supabase
  .from('post_likes')
  .insert([
    { "post_id": postId, user_id: userId },
  ])
  .select()
}