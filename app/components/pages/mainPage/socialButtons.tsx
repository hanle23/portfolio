import githubLogo from '@/public/svg/githubIcon.svg'
import linkedInLogo from '@/public/svg/linkedInIcon.svg'
import Image from 'next/image'
import BlockContainer from '@/app/components/specialComponent/BlockContainer'
export default function SocialButtons({
  handleContactClick,
}: {
  handleContactClick: () => void
}): JSX.Element {
  return (
    <div className="flex md:items-end  space-x-4 z-0">
      <BlockContainer className="h-fit">
        <button
          className="justify-center items-center border-text-light p-2.5 border rounded-lg text-xl font-bold transition duration-150"
          onClick={handleContactClick}
        >
          Get in touch
        </button>
      </BlockContainer>

      <BlockContainer className="h-fit">
        <a
          target="_blank"
          href="https://github.com/hanle23"
          rel="noopener noreferrer"
          className=""
        >
          <Image src={githubLogo} width={50} alt="GitHub Link" />
        </a>
      </BlockContainer>

      <BlockContainer className="h-fit">
        <a
          target="_blank"
          href="https://www.linkedin.com/in/han-le23/"
          rel="noopener noreferrer"
          className=""
        >
          <Image src={linkedInLogo} width={50} alt="LinkedIn Link" />
        </a>
      </BlockContainer>
    </div>
  )
}
