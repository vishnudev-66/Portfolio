import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import NeuralNetworkScene from './NeuralNetworkScene'
import { useReducedMotion } from '../hooks/useReducedMotion'

interface Props {
  inView: boolean
}

export default function ThreeBackground({ inView }: Props) {
  const reducedMotion = useReducedMotion()
  const animate = inView && !reducedMotion

  return (
    <Canvas
      className="!absolute inset-0"
      dpr={[1, 1.5]}
      gl={{ antialias: false, alpha: true, powerPreference: 'low-power' }}
      camera={{ position: [0, 0, 6.5], fov: 45 }}
      frameloop={inView ? 'always' : 'never'}
      aria-hidden="true"
    >
      <Suspense fallback={null}>
        <NeuralNetworkScene animate={animate} />
      </Suspense>
    </Canvas>
  )
}
