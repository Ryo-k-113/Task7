import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { Post } from '../types/Post'
//記事詳細API

const postDetailUrl = "https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/posts";



export const Article: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetcher = async () => {
      const res = await fetch(`${postDetailUrl}/${id}`)
      const { post } = await res.json()
      setPost(post)
      setLoading(false)
    }

    fetcher()
  }, [id])

  
  if(loading){
    return <div>読み込み中...</div>;
  } 

  if(!post) {
    return <div>記事が見つかりません</div>;
  }

  return (
    <div className="container max-w-3xl mx-auto">
      <div className="articleContents mt-14 px-4">
        <div className="articleThumbnail">
          <img src={post.thumbnailUrl} alt="" />
        </div>
        <div className="post p-4">
          <div className="flex justify-between">
            <p className="postDate text-gray-500 text-xs">{new Date(post.createdAt).toLocaleDateString()}</p>
            <div className="flex gap-x-2 items-center">
              {post.categories.map((category) => {
                return(
                  <p key={category} className="category text-sm text-fuchsia-600 border-1 rounded-sm p-1">{category}</p>
                );
              })}
            </div>
          </div>
          <div className="articleTitle text-2xl font-medium mt-3">APIで取得した{post.title}</div>
          <p className="articleText mt-3" dangerouslySetInnerHTML={{ __html:post.content}} />    
        </div>
      </div>
    </div>
  );
}


