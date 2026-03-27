import 'aframe'

const ARScene = () => {
  return (
    <a-scene vr-mode-ui="enabled: true">

      {/* Assets */}
      <a-assets>
        <img id="classroom" src="/classroom.jpg" alt="classroom background" crossOrigin="anonymous" />
      </a-assets>

      {/* 360-degree classroom */}
      <a-sky src="#classroom"></a-sky>

      {/* Camera at seated position */}
      <a-entity
        camera
        position="0 1.6 0"
        look-controls
      ></a-entity>

    </a-scene>
  )
}

export default ARScene
