import PostFeed from "@/components/posts/PostFeed"
import Header from "@/components/Header"
import Form from "@/components/Form"

export default function Home() {
  return (
    <>
      <Header label="Home (게시판)" />
      <Form placeholder="TECPOOL 해보세요 (출발지, 목적지, 시간을 적어주세요)" />
      <PostFeed />
    </>
  )
}