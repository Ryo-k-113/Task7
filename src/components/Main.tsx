import React from 'react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

//記事一覧取得API
const postListUrl: string = "https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/posts";

export const Main: React.FC = () => {

  type Posts = {
    id: number,
    title: string,
    thumbnailUrl: string,
    createdAt: string,
    categories: string[],
    content: string
  }

  const [posts, setPosts] = useState<Posts[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetcher = async () => {
      const res = await fetch(postListUrl)
      const { posts } = await res.json()
      setPosts(posts)
      setLoading(false)
    }

    fetcher()
  }, [])

  if(loading){
    return <div>読み込み中...</div>;
  } 

  return (
    <main className="max-w-3xl mx-auto">
      <ul>
        {posts.map(post =>  {
          return(
            <li key={post.id} className="postList border-1 border-gray-300 mt-10 pl-4 pr-12 py-4">
              <Link to={`/articles/${post.id}`}> 
                <div className="flex justify-between">
                  <p className="postDate text-gray-500 text-xs">{new Date(post.createdAt).toLocaleDateString()}</p>
                  <div className="flex gap-x-2 items-center">
                    {post.categories.map((category: string) => {
                      return(
                        <p key={category} className="category text-sm text-fuchsia-600 border-2 border-fuchsia-600 rounded-md p-1">{category}</p>
                      );
                    })}
                  </div>
                </div>
                <div className="postTitle text-2xl font-medium mt-3">APIで取得した{post.title}</div>
                <p className="postContent mt-3 line-clamp-2" dangerouslySetInnerHTML={{ __html:post.content}} />
              </Link>
            </li>
          );
        })}
      </ul>
    </main>
  );
}

