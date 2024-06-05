import BackToListButton from "@/components/BackToListButton";
import Comment from "@/components/Comment";
import CustomTextArea from "@/components/Inputs/CustomTextArea";
import RegisterButton from "@/components/RegisterButton";
import ArticleContent from "@/pageComponents/boards/[Id]/ArticleContent";
import { ChangeEvent, useEffect, useState } from "react";
import getArticle from "@/apis/getArticle";
import { GetServerSidePropsContext } from "next";
import getArticleComments from "@/apis/getArticleComments";
import NoContentSign from "@/components/NoContentSign";
import empty_sign from "@/images/Img_reply_empty.png";

interface ArticleType {
  updatedAt: string;
  createdAt: string;
  likeCount: number;
  writer: {
    id: number;
    nickname: string;
  };
  image: string | null;
  content: string;
  title: string;
  id: number;
}
interface ArticleComments {
  list: {
    id: number;
    content: string;
    createdAt: string;
    updatedAt: string;
    writer: {
      id: number;
      nickname: string;
      image: string | null;
    };
  }[];
  nextCursor: number;
}

interface ArticleDetailProps {
  article: ArticleType;
  articleComments: ArticleComments;
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { id } = context.query;
  const articleId = Number(id);

  if (isNaN(articleId)) {
    return {
      notFound: true,
    };
  }

  const article = await getArticle({ articleId });
  const articleComments = await getArticleComments({ articleId, limit: 3 });

  return {
    props: {
      article,
      articleComments,
    },
  };
}

const ArticleDetail = ({ article, articleComments }: ArticleDetailProps) => {
  const { id, title, content, image, likeCount, updatedAt, writer } = article;
  const comments = articleComments.list;
  const [newComment, setNewComment] = useState("");

  const handleTextArea = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setNewComment(e.target.value);
  };

  useEffect(() => {}, []);

  return (
    <div className="max-w-[122rem] h-screen px-[1rem] mx-auto flex flex-col gap-[2.4rem] my-[2.4rem]">
      <ArticleContent
        id={id}
        title={title}
        content={content}
        image={image}
        likeCount={likeCount}
        updatedAt={updatedAt}
        nickname={writer.nickname}
      />

      <div className="h-[4rem] sm:h-[1.6rem]" />

      <div className="flex flex-col gap-[1.6rem]">
        <CustomTextArea
          label="댓글 달기"
          placeholder="좋은 말할 때 댓글 달아라"
          id="comment"
          name="content"
          textAreaHeight={104}
          onChange={handleTextArea}
          value={newComment}
        />
        <div className="text-end">
          <RegisterButton
            width={74}
            height={42}
            disabled={newComment === ""}
            onClick={() => {}}
          >
            등록
          </RegisterButton>
        </div>
      </div>

      <div className="w-full max-h-[34rem] flex flex-col gap-[2.4rem]">
        {comments.length === 0 && (
          <NoContentSign image={empty_sign} imageHeight={140} imageWidth={140}>
            {"아직 댓글이 없어요,\n 지금 댓글을 달아주세요"}
          </NoContentSign>
        )}
        {comments.map((comment) => {
          return (
            <Comment
              key={comment.id}
              nickname={comment.writer.nickname}
              image={comment.writer.image}
              updatedAt={comment.updatedAt}
              content={comment.content}
            />
          );
        })}
      </div>
      <div className="h-[1.6rem]" />
      <div className="flex justify-center">
        <BackToListButton />
      </div>
    </div>
  );
};

export default ArticleDetail;
