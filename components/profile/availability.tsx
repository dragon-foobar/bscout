import TextareaAutosize from "react-textarea-autosize";
import { MDXRemote } from "next-mdx-remote";
import { DataType } from "./tab-contents";

export default function Availability({
  isEditingMode,
  data,
  setData,
}: {
  isEditingMode: boolean;
  data: DataType;
  setData: (newData: DataType) => void;
}) {
  if (isEditingMode) {
    return (
      <>
        <TextareaAutosize
          name="description"
          maxLength={500}
          onInput={(e) => {
            setData({
              ...data,
              availability: (e.target as HTMLTextAreaElement).value,
            });
          }}
          className="mt-1 w-full max-w-2xl px-0 text-sm tracking-wider leading-6 text-white bg-black  border-0 border-b border-gray-800 focus:border-white resize-none focus:outline-none focus:ring-0"
          placeholder="Enter a short bio about yourself... (Markdown supported)"
          value={data.availability}
        />
        <div className="flex justify-end w-full max-w-2xl">
          <p className="text-gray-400  text-sm">
            {data.availability.length}/500
          </p>
        </div>
      </>
    );
  }
  return (
    <article className="mt-3 max-w-2xl text-sm tracking-wider leading-6 text-white  prose prose-headings:text-white prose-a:text-white">
      <MDXRemote {...data.availabilityMdx} />
    </article>
  );
}
