import Link from "next/link";
import SectionContainer from "../layout/SectionContainer";
import { FaLinkedin } from "react-icons/fa";

export default function About() {
  return (
    <SectionContainer id="about">
      <h2 className="uppercase text-small text-primary sm:text-p">
        About Me
      </h2>
      <p className="text-h4 font-bold mt-6 text-brand600 sm:text-h2 lg:mt-12">
        I first started <span className="text-brand950">coding</span> by modding games. Since then I&apos;ve became a full stack <span className="text-brand950">software engineer</span> capable of building <span className="text-brand950">scalable</span> systems end-to-end.
      </p>
      <p className="text-h4 font-bold mt-4 text-brand600 sm:text-h2 lg:mt-6">
        I&apos;m currently 👀 for a <span className="text-brand950">full stack</span> role building solutions that <span className="text-brand950">make</span> an impact. Got something <span className="text-brand950">you</span> want to talk about? Connect with me on {" "}
        <Link href={"https://www.linkedin.com/in/billyflowers/"} target="_blank" className="cursor-pointer group">
          <FaLinkedin className="inline h-9 w-auto text-primary transition-all duration-300 ease-in-out sm:h-14 group-hover:-translate-y-0.5" />
        </Link>.
      </p>
    </SectionContainer>
  );
}