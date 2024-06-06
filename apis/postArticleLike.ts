import { axiosInstance } from "./api";

interface PostArticleLikeParams {
  articleId: number;
}

interface Response {
  updatedAt: string;
  createdAt: string;
  likeCount: number;
  writer: {
    nickname: string;
    id: number;
  };
  image: string | null;
  content: string;
  title: string;
  id: number;
  isLiked: boolean;
}

export type PostArticleLike = (
  prop: PostArticleLikeParams
) => Promise<Response>;
//Post 요청일 경우 보통 리스폰스를 받아서 확인하나요?

const postArticleLike: PostArticleLike = async ({ articleId }) => {
  try {
    const { data } = await axiosInstance.post<Response>(
      `articles/${articleId}/like`
    );
    return data;
  } catch (error) {
    console.error("APP ERROR: ", error);
    if (error instanceof Error) {
      throw new Error(`좋아요를 할 수 없습니다`);
    }
    throw new Error("알 수 없는 오류로 인해 좋아요를 할 수 없습니다.");
  }
};

export default postArticleLike;
