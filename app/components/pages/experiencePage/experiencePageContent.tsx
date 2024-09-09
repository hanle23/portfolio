import type { Experience } from '@/app/types/generic'
import BlockContainer from '@/app/components/specialComponent/BlockContainer'
import FormatDate from '../helper/formatDate'
export default function ExperiencePageContent({
  experience,
  months,
}: {
  experience: Experience
  months: string[]
}): JSX.Element {
  return (
    <article className="flex w-8/12" key={experience.title}>
      <BlockContainer className="flex h-full w-full p-3 relative">
        <div className=" items-center w-4/12 shrink-0">
          <FormatDate
            className="sticky top-10 font-medium"
            experience={experience}
            months={months}
          />
          <div className="sticky -z-[1] bottom-[100px]" />
        </div>
        <div className="grid">
          <div className="text-2xl font-semibold">{experience.title}</div>
          <div className="text-xl font-medium">{experience.company}</div>
          <div>{experience.location}</div>
          <p>{experience.description}</p>
        </div>
      </BlockContainer>
    </article>
  )
}
