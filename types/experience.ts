import { StaticImageData } from "next/image";

export type ExperienceCardProps = {
  title: string;
  company: string;
  date: string;
  summary: string;
  tags: string[];
  leftCol?: boolean;
  isActive?: boolean;
  img?: StaticImageData;
}