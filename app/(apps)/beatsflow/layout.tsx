import { BeatsflowAppWrapper } from '@/app/(apps)/beatsflow/components/appWrapper'
export const metadata = {
  title: 'Beats Flow',
  description: 'A music playlist manager for Spotify',
}
export default function CustomLayout({
  children,
}: {
  children: React.ReactNode
}): React.JSX.Element {
  return <BeatsflowAppWrapper>{children}</BeatsflowAppWrapper>
}
