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
  const Content = ({ isPrivate }: { isPrivate: boolean }): JSX.Element => {
    return (
      <>
        <div className="flex flex-col h-full overflow-hidden">
          <div className=" font-bold text-lg md:text-xl">
            {`${project.name
              .replace(/-/gi, ' ')
              .replace(/(^\w|\s\w)/g, (m: string) =>
                m.toUpperCase(),
              )}${isPrivate ? ' (Private)' : ''}`}
          </div>
          <p className="line-clamp-2">{project.description ?? ''}</p>
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
      </>
    )
  }
  return project?.private ? (
    <div className="border border-text-light  rounded-md p-2.5 h-full transition duration-150 w-full">
      <Content isPrivate />
    </div>
  ) : (
    <a
      target="_blank"
      href={project.html_url}
      rel="noopener noreferrer"
      className="border border-text-light rounded-md p-2.5 h-full transition duration-150 w-full "
    >
      <Content isPrivate={false} />
    </a>
  )
}
