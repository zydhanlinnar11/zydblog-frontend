import Head from 'next/head'
import BlogConfig from '../config/BlogConfig'
import { useAuth } from '../providers/AuthProvider'
import PostCard from '../components/PostCard'
import Header from '../components/Header'
import CenteredErrorMessage from '../components/CenteredErrorMessage'

interface Post {
  title: string
  slug: string
  createdAt: string
  coverUrl: string
}

export default function Home({ posts }: { posts: Post[] }) {
  const title = `Home`
  const { user } = useAuth()

  return (
    <div>
      <Head>
        <title>
          {title} - {BlogConfig.BLOG_TITLE}
        </title>
        <meta name='description' content={BlogConfig.BLOG_DESC} />
        <meta property='og:title' content={title} />
        <meta property='og:url' content={BlogConfig.BLOG_DOMAIN} />
        <meta property='og:description' content={BlogConfig.BLOG_DESC} />
      </Head>
      <Header
        midText={BlogConfig.BLOG_TITLE}
        bottomText={
          user ? `Welcome, ${user.name}! Have fun here.` : BlogConfig.BLOG_DESC
        }
      />
      {posts?.length > 0 ? (
        <div className='text-center grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mx-auto gap-12 mb-14'>
          {posts.map((post) => (
            <PostCard post={post} url={`/post/${post.slug}`} key={post.slug} />
          ))}
        </div>
      ) : (
        <CenteredErrorMessage
          header='Tidak ada pos'
          message='Saat ini belum ada pos, atau server sedang maintenance.'
        ></CenteredErrorMessage>
      )}
    </div>
  )
}

export async function getStaticProps() {
  interface Response {
    title: string
    slug: string
    created_at: string
    cover_url: string
  }

  const posts: Post[] = []
  try {
    const response = await fetch(`${BlogConfig.BLOG_API}/posts`)
    const json: Response[] = await response.json()
    json.forEach((post) => {
      posts.push({
        title: post.title,
        slug: post.slug,
        createdAt: post.created_at,
        coverUrl: post.cover_url,
      })
    })
    return {
      props: {
        posts,
      },
    }
  } catch {
    return {
      props: {
        posts: [],
      },
    }
  }
}
