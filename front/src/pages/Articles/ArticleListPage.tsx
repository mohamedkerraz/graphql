import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_POSTS_QUERY } from '../../graphql/queries';
import { CREATE_POST_MUTATION } from '../../graphql/mutations';
import { DELETE_LIKE_POST } from '../../graphql/mutations';
import { CREATE_LIKE_POST } from '../../graphql/mutations';
import { Link } from 'react-router-dom';
import { Comment, Post } from '../../types/types';
import { getCookie } from '../../storage/cookies';
import './ArticleListPage.css';

const ArticleListPage = () => {
  const { loading, error, data, refetch } = useQuery(GET_POSTS_QUERY);
  const [createPost] = useMutation(CREATE_POST_MUTATION);
  const [createLikePost] = useMutation(CREATE_LIKE_POST);
  const [deleteLikePost] = useMutation(DELETE_LIKE_POST);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const userId = getCookie('gqlid');
  const token = getCookie('gqltoken');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createPost({ variables: { title, body, token }, refetchQueries: [{ query: GET_POSTS_QUERY }] });
      setTitle('');
      setBody('');
    } catch (err) {
      console.error("Error creating post:", err);
    }
  };

  const handleLike = async (postId: string) => {
    try {
      await createLikePost({ variables: { postId, token } });
      await refetch();
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  const handleReset = () => {
    setTitle('');
    setBody('');
  };

  const handleDislike = async (postId: string) => {
    try {
      await deleteLikePost({ variables: { postId, token } });
      await refetch();
    } catch (error) {
      console.error('Error disliking post:', error);
    }
  };

  if (loading) return <p className="loading">Loading...</p>;
  if (error) return <p className="error">Error: {error.message}</p>;

  return (
    <div className="container">
      <h1>Articles</h1>



      {data.getPosts.length > 0 ? (
        data.getPosts.map((post: Post) => (

          <div className="post" key={post.id}>
            <div className="post-title">{post.title}</div>
            <div className="post-content">{post.body}</div>
            <div className="post-actions">
                <button type="button" className="comment-button"><Link to={`/comments/${post.id}`} style={{ color: 'white' }}>Commentaire</Link></button>
                <span className="like-count">{post.usersLikes.length} likes</span>
                {post.usersLikes.some(like => like.userId === userId) ? (
                  <button onClick={() => handleDislike(post.id)} className="like-button">Dislike Post</button>
                ) : (
                  <button onClick={() => handleLike(post.id)} className="like-button">Like Post</button>
                )}
            </div>
            <div className="comments-list">
              {post.comments.map((comment: Comment) => (
                <div className="comment" key={comment.id}>
                  <p>{comment.comment}</p>
                </div>
              ))}

            </div>
            <button type="button" className="comment-button"><Link to={`/article/${post.id}`} style={{ color: 'white' }}>En savoir plus</Link></button> 
            
          </div>




        ))
      ) : (
        <p className="no-articles">No articles found.</p>
      )}

      <form onSubmit={handleSubmit} onReset={handleReset} style={{ paddingLeft: '2%' }}>
        <input
          style={{ maxWidth: '95%' }}
          type="text"
          placeholder="Titre"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          style={{ maxWidth: '95%', minHeight: '100px' }}
          placeholder="Contenu de l'article"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
        <div className="post-actions" >
          <button type="submit">Créer un post</button>
          <button type="reset">Annuler</button>
        </div>
        
      </form>


    </div>
  );
};

export default ArticleListPage;
