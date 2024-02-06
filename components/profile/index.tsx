import { UserProps } from "@/lib/api/user";
import { getGradient } from "@/lib/gradients";
import {
  CheckIcon,
  EditIcon,
  LoadingDots,
  UploadIcon,
  XIcon,
} from "@/components/icons";
import Avvvatars from "avvvatars-react";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa6";
import { GiOstrich } from "react-icons/gi";
import { useSession } from "next-auth/react";
import BlurImage from "../blur-image";
import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import TabContents from "./tab-contents";

export const profileWidth = "max-w-5xl mx-auto px-4 sm:px-6 lg:px-8";

export default function Profile({
  settings,
  user,
}: {
  settings?: boolean;
  user: UserProps;
}) {
  console.log("user", user);
  const router = useRouter();
  const { data: session } = useSession();
  const [saving, setSaving] = useState(false);

  const [data, setData] = useState({
    username: user.username,
    image: user.image,
    bio: user.bio,
    bioMdx: user.bioMdx,
    skillsAndExperience: user.skillsAndExperience,
    skillsAndExperienceMdx: user.skillsAndExperienceMdx,
    availability: user.availability,
    availabilityMdx: user.availabilityMdx,
    contact: user.contact,
    contactMdx: user.contactMdx,
    xUsername: user.xUsername,
    nostrPublicKey: user.nostrPublicKey,
    githubUsername: user.githubUsername,
    linkedInUsername: user.linkedInUsername,
  });
  const [selectedTab, setSelectedTab] = useState("Biography");
  console.log("settings, user", settings, user);
  if (data.username !== user.username) {
    setData(user);
  }
  console.log(
    "router settings and as path",
    router.query.settings === "true" && router.asPath === "/settings"
  );
  const [error, setError] = useState("");
  const settingsPage =
    settings ||
    (router.query.settings === "true" && router.asPath === "/settings");

  const handleDismiss = useCallback(() => {
    if (settingsPage) router.replace(`/${user.username}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  const handleTabChange = (tabName: string) => {
    setSelectedTab(tabName);
  };

  const handleSave = async () => {
    setError("");
    setSaving(true);
    try {
      const response = await fetch("/api/user", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        console.log("response", response);
        const { bioMdx, skillsAndExperienceMdx, contactMdx, availabilityMdx } =
          await response.json();
        // optimistically show updated state for bioMdx
        setData({
          ...data,
          bioMdx,
          skillsAndExperienceMdx,
          availabilityMdx,
          contactMdx,
        });
        router.replace(`/${user.username}`, undefined, { shallow: true });
      } else if (response.status === 401) {
        setError("Not authorized to edit this profile.");
      } else {
        setError("Error saving profile.");
      }
    } catch (error) {
      console.error(error);
    }
    setSaving(false);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onKeyDown = async (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      handleDismiss();
    } else if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
      await handleSave();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onKeyDown]);

  return (
    <div className="min-h-screen pb-20">
      <div>
        <div
          className={`h-48 w-full lg:h-64 
          ${getGradient(user.username)}`}
        />
        <div
          className={`${profileWidth} -mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5`}
        >
          <div className="relative group h-24 w-24 rounded-full sm:h-32 sm:w-32">
            <Avvvatars style="shape" size={120} value={user.name} />
          </div>
          <div className="mt-6 sm:flex-1 sm:min-w-0 sm:flex sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
            <div className="flex min-w-0 flex-1 items-center space-x-6">
              <h1 className="text-2xl font-semibold text-white truncate">
                {user.name}
              </h1>
              <div className="flex min-w-0 flex-1 items-center space-x-3">
                {data.nostrPublicKey && (
                  <a
                    target="_blank"
                    href={`https://primal.net/p/${data.nostrPublicKey}`}
                    rel="noopener noreferrer"
                  >
                    <GiOstrich size="1.5em" fill="lightgrey" />
                  </a>
                )}
                {data.githubUsername && (
                  <a
                    target="_blank"
                    href={`https://github.com/${data.githubUsername}`}
                    rel="noopener noreferrer"
                  >
                    <FaGithub size="1.5em" fill="lightgrey" />
                  </a>
                )}
                {data.linkedInUsername && (
                  <a
                    target="_blank"
                    href={`https://linkedin.com/in/${data.linkedInUsername}`}
                    rel="noopener noreferrer"
                  >
                    <FaLinkedin size="1.5em" fill="lightgrey" />
                  </a>
                )}
                {data.xUsername && (
                  <a
                    target="_blank"
                    href={`https://x.com/${data.xUsername}`}
                    rel="noopener noreferrer"
                  >
                    <FaXTwitter size="1.5em" fill="lightgrey" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-6 sm:mt-2 2xl:mt-5">
        <div className="border-b border-gray-800">
          <div className={`${profileWidth} mt-10`}>
            <nav className="-mb-px flex space-x-8" aria-label="Tabs">
              {tabs.map((tab) => (
                <button
                  key={tab.name}
                  onClick={() => handleTabChange(tab.name)}
                  className={`${
                    tab.name === selectedTab
                      ? "border-white text-bitcoin-main"
                      : "border-transparent text-gray-400 cursor-pointer"
                  }
                    whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm `}
                >
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Tab */}
      <div className={`${profileWidth} mt-16`}>
        <h2 className="font-semibold  text-2xl text-white has-tooltip">
          {selectedTab}
          {/* <span className='tooltip rounded shadow-lg p-1 bg-gray-500 text-black text-xs'>Markdown compatible</span> */}
        </h2>
        <TabContents
          tabName={selectedTab}
          isEditingMode={
            router.query.settings === "true" && router.asPath === "/settings"
          }
          data={data}
          setData={setData}
        />
      </div>

      {/* Edit buttons */}
      {settingsPage ? (
        <div className="fixed bottom-10 right-10 flex items-center space-x-3">
          <p className="text-sm text-gray-500">{error}</p>
          <button
            className={`${
              saving ? "cursor-not-allowed" : ""
            } rounded-full border border-bitcoin-main hover:border-4 border-2 w-12 h-12 flex justify-center items-center transition-all`}
            disabled={saving}
            onClick={handleSave}
          >
            {saving ? (
              <LoadingDots color="white" />
            ) : (
              <CheckIcon className="h-4 w-4 text-white" />
            )}
          </button>
          <Link
            href={`/${user.username}`}
            shallow
            replace
            scroll={false}
            className="rounded-full border-3 border-gray-800 hover:border-bitcoin-main w-12 h-12 flex justify-center items-center transition-all"
          >
            <XIcon className="h-4 w-4 text-white" />
          </Link>
        </div>
      ) : session?.username === user.username ? (
        <Link
          href={{ query: { settings: true } }}
          as="/settings"
          shallow
          replace
          scroll={false}
        >
          <div className="fixed bottom-10 right-10 rounded-full border-3 bg-black border-gray-800 hover:border-bitcoin-main w-12 h-12 flex justify-center items-center transition-all">
            <EditIcon className="h-4 w-4 text-white" />
          </div>
        </Link>
      ) : null}
    </div>
  );
}

const tabs = [
  { name: "Biography" },
  { name: "Skills and Experience" },
  { name: "Availability" },
  { name: "Contact" },
];
