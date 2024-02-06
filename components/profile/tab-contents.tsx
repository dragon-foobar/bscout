import { MDXRemoteSerializeResult } from "next-mdx-remote";
import Biography from "./biography";
import SkillsAndExperience from "./skills-and-experience";
import Availability from "./availability";
import Contact from "./contact";

export interface DataType {
  username: string;
  image: string;
  bio: string;
  bioMdx: MDXRemoteSerializeResult<Record<string, unknown>>;
  skillsAndExperience: string;
  skillsAndExperienceMdx: MDXRemoteSerializeResult<Record<string, unknown>>;
  availability: string;
  availabilityMdx: MDXRemoteSerializeResult<Record<string, unknown>>;
  contact: string;
  contactMdx: MDXRemoteSerializeResult<Record<string, unknown>>;
  nostrPublicKey: string;
  githubUsername: string;
  linkedInUsername: string;
  xUsername: string;
}

export default function TabContents({
  tabName,
  isEditingMode,
  data,
  setData,
}: {
  tabName: string;
  isEditingMode: boolean;
  data: DataType;
  setData: (newData: DataType) => void;
}) {
  const tabContentComponents: {
    [key: string]: ({
      isEditingMode,
      data,
      setData,
    }: {
      isEditingMode: boolean;
      data: DataType;
      setData: (newData: DataType) => void;
    }) => JSX.Element;
  } = {
    ["Biography"]: Biography,
    ["Skills and Experience"]: SkillsAndExperience,
    ["Availability"]: Availability,
    ["Contact"]: Contact,
  };
  console.log("isEditingMode", isEditingMode);
  const Component = tabContentComponents[tabName];
  return (
    <Component isEditingMode={isEditingMode} data={data} setData={setData} />
  );
}
