export default function TracksTable({
  allTrackPages,
}: {
  allTrackPages: Playlists[] | undefined
}): React.JSX.Element {
  console.log(allTrackPages)
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {allTrackPages?.map(
            (trackPage, i) =>
              trackPage?.items?.map((track, j) => (
                <tr key={track.track.id}>
                  <td>{track.track.name}</td>
                </tr>
              )),
          )}
        </tbody>
      </table>
    </div>
  )
}
