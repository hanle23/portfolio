import type { Project } from '@/app/types/github/project'
export default function ProjectPageContainer({
  children,
  project,
}: {
  children: React.ReactNode
  project: Project
}): JSX.Element {
  if (project.private) {
    return (
      <div className="border border-text-light inline-block rounded-md p-2.5  transition duration-150 w-full relative">
        {children}
      </div>
    )
  } else {
    return (
      <a
        target="_blank"
        href={project.html_url}
        rel="noopener noreferrer"
        className="border border-text-light inline-block rounded-md p-2.5  transition duration-150 w-full relative"
      >
        {children}
      </a>
    )
  }
}
