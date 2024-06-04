import CustomFileInput from "@/components/Inputs/CustomFileInput";
import CustomInput from "@/components/Inputs/CustomInput";
import CustomTextArea from "@/components/Inputs/CustomTextArea";

const NewArticle = () => {
  return (
    <div className="max-w-[122rem] h-screen px-[1rem] mx-auto my-0 flex flex-col gap-[2.4rem]">
        
      <div className="flex justify-between">
        <h2 className="font-bold text-[2rem] leading-[2.4rem] my-auto mx-0">
          게시글
        </h2>
        <button className="py-[1.2rem] px-[2.3rem] rounded-[0.8rem] bg-gray-400 font-semibold text-[1.6rem] text-white leading-[1.9rem]">
          등록
        </button>
      </div>

      <CustomInput
        label="*제목"
        placeholder="제목을 입력하세요"
        id="title"
        name="title"
      />
      <CustomTextArea
        label="*내용"
        placeholder="내용을 입력하세요"
        id="content"
        name="content"
      />
      <CustomFileInput onDelete={() => {}} name="image" />
    </div>
  );
};

export default NewArticle;
