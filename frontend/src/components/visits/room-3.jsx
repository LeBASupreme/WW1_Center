import RoomPage from './RoomPage'

const STOPS = []

export default function Room3() {
  return (
    <RoomPage
      title="Room 3"
      videoSrc="/videos/room-3.mp4"
      stops={STOPS}
    />
  )
}
