import type { Project } from '@/app/types/github/project'
export default function ProjectPageContent({
  project,
  maxDate,
  currentDate,
}: {
  project: Project
  maxDate: Date
  currentDate: number
}): JSX.Element {
  return (
    <a
      target="_blank"
      href={project.html_url}
      rel="noopener noreferrer"
      className="border border-text-light inline-block rounded-md p-2.5  transition duration-150 w-full relative"
    >
      <div className="flex flex-col h-full overflow-hidden">
        <div className=" font-bold text-lg md:text-xl">
          {project.name
            .replace(/-/gi, ' ')
            .replace(/(^\w|\s\w)/g, (m: string) => m.toUpperCase())}
        </div>
        <p className="line-clamp-2 hover:line-clamp-none">
          {project.description ?? ''}
        </p>
        <div className="text-sm  flex items-center space-x-1 mt-auto">
          <div
            className={`border border-transparent ${
              maxDate.getTime() <= currentDate ? 'bg-sky-100' : 'bg-green-600'
            } h-[10px] w-[10px] rounded-full`}
          />
          <div>
            {maxDate.getTime() <= currentDate
              ? 'Stale'
              : 'New update available!'}
          </div>
        </div>
      </div>
    </a>
  )
}
