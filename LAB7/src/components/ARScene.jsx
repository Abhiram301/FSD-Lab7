import 'aframe'

const ARScene = () => {
  return (
    <a-scene vr-mode-ui="enabled: true">

      {/* 360-degree sky - use a solid color until classroom.jpg is added */}
      <a-sky color="#87CEEB"></a-sky>

      {/* AR box from Step 4 */}
      <a-box id="box" position="0 0 -3" color="#4CC3D9" scale="1 1 1"></a-box>

      {/* Ground */}
      <a-plane position="0 0 -4" rotation="-90 0 0" width="10" height="10" color="#7BC8A4"></a-plane>

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
