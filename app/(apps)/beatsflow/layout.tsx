import { BeatsflowAppWrapper } from '@/app/(apps)/beatsflow/components/appWrapper'
export default function CustomLayout({
  children,
}: {
  children: React.ReactNode
}): React.JSX.Element {
  return (
    <BeatsflowAppWrapper>
      <div className="flex bg-black h-full w-full">{children}</div>
    </BeatsflowAppWrapper>
  )
}
