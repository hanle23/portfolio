export const metadata = {
  title: 'Beats Flow',
  description: 'A music playlist manager for Spotify',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}): React.JSX.Element {
  return (
    <html lang="en">
      <body className="h-full w-full">{children}</body>
    </html>
  )
}
