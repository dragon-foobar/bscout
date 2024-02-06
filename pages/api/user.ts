import type { NextApiRequest, NextApiResponse } from "next";
import { searchUser, updateUser } from "lib/api/user";
import { authOptions } from "pages/api/auth/[...nextauth]";
import { getMdxSource } from "lib/api/user";
import { getServerSession } from "next-auth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      console.log("req,", req.query);
      const result = await searchUser(req.query.query as string);
      console.log("results", result);
      return res.status(200).json(result);
    } catch (e: any) {
      console.log(e);
      return res.status(500).json({
        error: e.toString(),
      });
    }
  } else if (req.method === "PUT") {
    const { username, bio, skillsAndExperience, availability, contact } =
      req.body;
    const session = await getServerSession(req, res, authOptions);

    if (!session || session.username !== username) {
      return res.status(401).json({
        error: "Unauthorized",
      });
    }
    try {
      const result = await updateUser(
        username,
        bio,
        skillsAndExperience,
        availability,
        contact
      );
      if (result) {
        await res.revalidate(`/${username}`);
      }
      // return Mdx data to optimistically show updated state
      const bioMdx = await getMdxSource(bio);
      const skillsAndExperienceMdx = await getMdxSource(skillsAndExperience);
      const availabilityMdx = await getMdxSource(availability);
      const contactMdx = await getMdxSource(contact);
      return res
        .status(200)
        .json({ bioMdx, skillsAndExperienceMdx, availabilityMdx, contactMdx });
    } catch (e: any) {
      console.log(e);
      return res.status(500).json({
        error: e.toString(),
      });
    }
  } else {
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
