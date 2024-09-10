import type { Project } from '@/app/types/github/project'
import ProjectPageContainer from './projectPageContainer'
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
    <ProjectPageContainer project={project}>
      <div className="flex flex-col h-full overflow-hidden">
        <div className=" font-bold text-lg md:text-xl">
          {`${project.name
            .replace(/-/gi, ' ')
            .replace(/(^\w|\s\w)/g, (m: string) =>
              m.toUpperCase(),
            )}${project.private ? ' (Private)' : ''}`}
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
    </ProjectPageContainer>
  )
}
