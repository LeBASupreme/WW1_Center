import MuseumScroll from '../MuseumScroll'

function RoomPage({ title, videoSrc, stops = [], returnTo = null }) {
  return (
    <MuseumScroll
      src={videoSrc}
      title={title}
      stops={stops}
      showBack
      returnTo={returnTo}
      scrollHeight={800}
    />
  )
}

export default RoomPage
