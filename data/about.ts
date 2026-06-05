import { AboutCardProps } from "@/types/about";
import { LuBriefcase, LuFolderKanban, LuLayers, LuTrendingUp } from "react-icons/lu";

export const about: AboutCardProps[] = [
  {
    title: "4+",
    desc: "Years building",
    Icon: LuBriefcase,
    bgColor: "bg-primary/20",
    textColor: "text-primary"
  },
  {
    title: "13+",
    desc: "Projects shipped",
    Icon: LuFolderKanban,
    bgColor: "bg-[#DAB1F8]/20",
    textColor: "text-[#DAB1F8]"
  },
  {
    title: "Expertise",
    desc: "End-to-end engineering",
    Icon: LuLayers,
    bgColor: "bg-[#B1F8C3]/20",
    textColor: "text-[#B1F8C3]"
  },
  {
    title: "Scalable Systems",
    desc: "From concept to production",
    Icon: LuTrendingUp,
    bgColor: "bg-[#F8CFB1]/20",
    textColor: "text-[#F8CFB1]"
  },
];