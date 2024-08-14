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

export const fetchArticles = async () => {
  let { data: articles, error } = await supabase
  .from('articles')
  .select('*')
  if (error) throw (error)
  return [...articles];
}

export const fetchOldPosts = async () => {
  let {data: oldposts, error} = await supabase
  .from('history_of_posts')
  .select("*")
  if (error) throw (error)
  return [...oldposts]
}

// update, insert, delete queries

export const updatePost = async (postId, postTitle, postContent) => {
  const { data, error } = await supabase
  .from("posts")
  .update({
    title: postTitle,
    content: postContent,
  })
  .eq("id", postId)
  if (error) throw (error.message)
}
 
export const updateComment = async (postId, userId, commentContent) => {
  const {data, error} = await supabase
  .from("comments")
  .update({
    content: commentContent
  })
  .match({post_id: postId, user_id: userId})
}

export const likePost = async (postId, userId) => {
  const { error } = await supabase
  .from('post_likes')
  .insert([
    { post_id: postId, user_id: userId },
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

export const insertArticle = async (postId, userId) => {
  const { error } = await supabase
  .from('articles')
  .insert([
    { post_id: postId, user_id: userId },
  ])
  .select()
  if (error) throw (error)
}
          
export const insertComment = async (postId, userId, commentContent) => {
  const {error} = await supabase
  .from('comments')
  .insert([
    {post_id: postId, user_id: userId, content: commentContent}
  ])
  .select()
  if (error) throw (error)
}

export const insertOldPost = async (postId, postTitle, postContent, userId) => {
  const { data, error } = await supabase
  .from('history_of_posts')
  .insert([
    { post_data: {post_id: postId, post_title: postTitle, post_content: postContent }, user_id: userId},
  ])
  .select()
  if (error) throw (error)       
}

export const deleteArticle = async (postId, userId) => {
  const { error } = await supabase
  .from('articles')
  .delete()
  .match({post_id: postId, user_id: userId}) 
  if (error) throw (error)
}

export const deletePost = async (postId, userId) => {
  const { error } = await supabase
  .from('posts')
  .delete()
  .match({id: postId, user_id: userId}) 
  if (error) throw (error)
}

export const deleteOldPost = async (postId, userId) => {
  const { error } = await supabase
  .from('history_of_posts')
  .delete()
  .match({id: postId, user_id: userId}) 
  if (error) throw (error)
} 