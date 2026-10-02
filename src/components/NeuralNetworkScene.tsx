import { useMemo, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Sparkles } from '@react-three/drei'
import * as THREE from 'three'

interface Props {
  animate: boolean
}

const NODE_COUNT = 70
const CONNECT_DISTANCE = 2.6
const FIELD_RADIUS = 5.5

function Satellite({
  radius,
  speed,
  offset,
  color,
}: {
  radius: number
  speed: number
  offset: number
  color: string
}) {
  const ref = useRef<THREE.Group>(null)

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * speed + offset
    if (ref.current) {
      ref.current.position.set(
        Math.cos(t) * radius,
        Math.sin(t * 1.35) * radius * 0.46,
        Math.sin(t) * radius * 0.62,
      )
      ref.current.rotation.set(t, t * 0.7, -t * 0.45)
    }
  })

  return (
    <group ref={ref}>
      <mesh>
        <icosahedronGeometry args={[0.18, 2]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.5} roughness={0.24} metalness={0.65} />
      </mesh>
      <pointLight color={color} intensity={1.2} distance={2.6} />
    </group>
  )
}

function generateNodes(count: number, radius: number): Float32Array {
  const positions = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    // distribute inside a flattened ellipsoid so it reads as a "field", not a sphere
    const theta = Math.random() * Math.PI * 2
    const phi = Math.acos(2 * Math.random() - 1)
    const r = radius * Math.cbrt(Math.random())
    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.6
    positions[i * 3 + 2] = r * Math.cos(phi) * 0.7
  }
  return positions
}

function buildConnections(positions: Float32Array, maxDist: number): Float32Array {
  const lines: number[] = []
  const count = positions.length / 3
  for (let i = 0; i < count; i++) {
    for (let j = i + 1; j < count; j++) {
      const dx = positions[i * 3] - positions[j * 3]
      const dy = positions[i * 3 + 1] - positions[j * 3 + 1]
      const dz = positions[i * 3 + 2] - positions[j * 3 + 2]
      const dist = Math.sqrt(dx * dx + dy * dy + dz * dz)
      if (dist < maxDist) {
        lines.push(
          positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2],
          positions[j * 3], positions[j * 3 + 1], positions[j * 3 + 2],
        )
      }
    }
  }
  return new Float32Array(lines)
}

export default function NeuralNetworkScene({ animate }: Props) {
  const group = useRef<THREE.Group>(null)
  const pointsRef = useRef<THREE.Points>(null)
  const { viewport } = useThree()

  const nodePositions = useMemo(() => generateNodes(NODE_COUNT, FIELD_RADIUS), [])
  const linePositions = useMemo(
    () => buildConnections(nodePositions, CONNECT_DISTANCE),
    [nodePositions],
  )

  const pointer = useRef({ x: 0, y: 0 })

  useFrame((state, delta) => {
    if (!animate) return

    // gentle parallax toward the pointer
    pointer.current.x = THREE.MathUtils.lerp(pointer.current.x, state.pointer.x, 0.03)
    pointer.current.y = THREE.MathUtils.lerp(pointer.current.y, state.pointer.y, 0.03)

    if (group.current) {
      group.current.rotation.y += delta * 0.045
      group.current.rotation.x = THREE.MathUtils.lerp(
        group.current.rotation.x,
        pointer.current.y * 0.15,
        0.05,
      )
      group.current.rotation.z = THREE.MathUtils.lerp(
        group.current.rotation.z,
        -pointer.current.x * 0.08,
        0.05,
      )
    }
  })

  const scale = Math.min(viewport.width / 9, 1.15)

  return (
    <group ref={group} scale={scale}>
      <ambientLight intensity={0.35} />
      <pointLight position={[3.5, 2.5, 3]} color="#7FF0DE" intensity={24} distance={10} />
      <pointLight position={[-3, -2, 2]} color="#F0A94D" intensity={14} distance={8} />

      <Sparkles count={95} scale={[12, 7, 8]} size={1.8} speed={0.25} opacity={0.42} color="#9CF8E8" />

      {/* A translucent, lit core makes the scene feel spatial even on low-power GPUs. */}
      <group rotation={[0.25, -0.4, 0]}>
        <mesh>
          <icosahedronGeometry args={[1.25, 3]} />
          <meshPhysicalMaterial
            color="#123842"
            emissive="#0D5D60"
            emissiveIntensity={0.65}
            metalness={0.7}
            roughness={0.2}
            transparent
            opacity={0.58}
            clearcoat={1}
            clearcoatRoughness={0.12}
          />
        </mesh>
        <mesh scale={1.16}>
          <icosahedronGeometry args={[1.25, 2]} />
          <meshBasicMaterial color="#7FF0DE" wireframe transparent opacity={0.16} />
        </mesh>
        <mesh rotation={[Math.PI / 2.4, 0, 0]}>
          <torusGeometry args={[1.55, 0.018, 10, 96]} />
          <meshBasicMaterial color="#4FD8C4" transparent opacity={0.42} />
        </mesh>
        <mesh rotation={[0.4, Math.PI / 2.3, 0.7]}>
          <torusGeometry args={[1.78, 0.012, 8, 96]} />
          <meshBasicMaterial color="#F0A94D" transparent opacity={0.26} />
        </mesh>
        <mesh>
          <sphereGeometry args={[0.19, 24, 24]} />
          <meshBasicMaterial color="#D8FFFA" />
        </mesh>
        <pointLight color="#7FF0DE" intensity={9} distance={5} />
      </group>

      <Satellite radius={3.2} speed={0.42} offset={0} color="#7FF0DE" />
      <Satellite radius={2.75} speed={-0.56} offset={2.2} color="#F0A94D" />
      <Satellite radius={3.65} speed={0.3} offset={4.5} color="#E0563F" />

      {/* connection lines */}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[linePositions, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#4FD8C4" transparent opacity={0.14} />
      </lineSegments>

      {/* node points */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[nodePositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#7FF0DE"
          size={0.055}
          sizeAttenuation
          transparent
          opacity={0.85}
        />
      </points>

    </group>
  )
}
