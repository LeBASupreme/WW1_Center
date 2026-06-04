import RoomPage from './RoomPage'

const STOPS = []

export default function Room2() {
  return (
    <RoomPage
      title="Room 2"
      videoSrc="/videos/video-room-2-scroll.mp4"
      stops={STOPS}
      returnTo={85}
    />
  )
}
