# React + Vite

This project is made as a result of the SoftUni ReactJS 2023 Course.

The project represents a Social media platform revolving around sharing articles.

Main components: Home -> PostList -> Post

The detailed view of each Post (via the PostDetail component) unfortunately at the moment is not
accesibble due issues with Supabase's fetching problems.
(as of 13/12/2023 check at https://status.supabase.com/)

Editing and Deleting functionality is authentication and id based, that is only if the authenticated user
is the author of specific posts/articles - only then he can edit them.

Finally, I would like to add that the main functionality to be implemented is accessing the ArXiv API
to be able to save and share articles, as well as create groups.
