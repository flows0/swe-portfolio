import ProjectTechCard from "./ProjectTechCard";

export default function ProjectTechList({ techStack }: { techStack: string[] }) {
  return (
    <div className="mt-4 flex flex-wrap gap-2">
      {techStack.map((tech, index) => (
        <ProjectTechCard key={index} label={tech} />
      ))}
    </div>
  );
}