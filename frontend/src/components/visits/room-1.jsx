import RoomPage from './RoomPage'

const STOPS = [
  // { at: 10, hold: 3, type: 'info', x: 50, y: 50, title: '...', text: '...' },
  // { at: 30, hold: 3, type: 'room', label: 'Enter this room', href: '/visits/room-2' },
]

export default function Room1() {
  return (
    <RoomPage
      title="Room 1"
      videoSrc="/videos/video-room-1-scroll.mp4"
      stops={STOPS}
      returnTo={23}
    />
  )
}
