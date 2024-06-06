import { axiosInstance } from "./api";

interface PostArticleParams {
  image: File | null;
  content: string;
  title: string;
}

interface Response {
  createdAt: string;
  updatedAt: string;
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

export type PostArticle = (prop: PostArticleParams) => Promise<Response>;
//Post 요청일 경우 보통 리스폰스를 받아서 확인하나요?

const postArticle: PostArticle = async ({ image, content, title }) => {
  try {
    const { data } = await axiosInstance.post<Response>(`articles`, {
      image,
      content,
      title,
    });
    return data;
  } catch (error) {
    console.error("APP ERROR: ", error);
    if (error instanceof Error) {
      throw new Error(`게시글을 등록할 수 없습니다`);
    }
    throw new Error("알 수 없는 오류로 게시글을 등록할 수 없습니다.");
  }
};

export default postArticle;
