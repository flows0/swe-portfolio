import { BiLogoGithub, BiLogoLinkedin, BiSolidInbox } from "react-icons/bi";
import SectionContainer from "../layout/SectionContainer";
import Link from "next/link";
import AboutCard from "../about/AboutCard";

export default function About() {
  return (
    <SectionContainer>
      <div>
        <h2 className="text-h4 font-bold bg-linear-to-r bg-clip-text text-transparent from-[#51f0e3] to-brand950 from-20% to-25% sm:text-h2 md:from-10% md:to-15%">
          About Me
        </h2>
      </div>
      <div className="grid grid-cols-1 mt-12 md:grid-cols-2">
        <div>
          <p className="text-p text-brand800">I&apos;m a full-stack software engineer with four years of experience building reliable and scalable software. I focus on developing practical solutions that solve real business problems, with an emphasis on clean architecture, maintainable code, and efficient systems.</p>
          <p className="text-p mt-4 text-brand800">My work primarily involves building internal tools, dashboards, and APIs that help teams operate more efficiently and make better use of their data. I enjoy designing systems end-to-end and turning complex requirements into scalable web solutions.</p>
          <p className="text-p mt-4 text-brand800">I&apos;m driven by the challenge of improving systems, simplifying workflows, and building software that delivers real value to the people who use it every day.</p>
          <div className="mt-24">
            {/* socials */}
            <div className="flex items-center gap-x-4">
              <Link
                href="https://www.linkedin.com/in/billyflowers/"
                target="_blank"
                className="p-2 rounded-lg border bg-brand200 text-brand600 border-brand300"
              >
                <BiLogoLinkedin className="size-8" />
              </Link>
              <Link
                href="https://www.linkedin.com/in/billyflowers/"
                target="_blank"
                className="p-2 rounded-lg border bg-brand200 text-brand600 border-brand300"
              >
                <BiLogoGithub className="size-8" />
              </Link>
              <Link
                href="https://www.linkedin.com/in/billyflowers/"
                target="_blank"
                className="p-2 rounded-lg border bg-brand200 text-brand600 border-brand300"
              >
                <BiSolidInbox className="size-8" />
              </Link>
            </div>
          </div>
        </div>
        <div className="md:grid md:grid-cols-2">
          {/* stats */}
          <AboutCard />
          <AboutCard />
          <AboutCard />
          <AboutCard />
        </div>
      </div>
    </SectionContainer>
  );
}