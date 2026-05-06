'use client'

import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

interface Node {
  id: string
  label: string
  sub: string
  x: number
  y: number
  type: 'client' | 'gateway' | 'service' | 'data'
}

interface Edge {
  from: string
  to: string
}

const nodes: Node[] = [
  { id: 'client', label: 'CLIENT', sub: 'React / Angular', x: 50, y: 200, type: 'client' },
  { id: 'gateway', label: 'API GATEWAY', sub: 'Spring Cloud', x: 280, y: 200, type: 'gateway' },
  { id: 'auth', label: 'AUTH', sub: 'JWT / OAuth', x: 510, y: 80, type: 'service' },
  { id: 'orders', label: 'ORDERS', sub: 'Spring Boot', x: 510, y: 200, type: 'service' },
  { id: 'payments', label: 'PAYMENTS', sub: 'Microservice', x: 510, y: 320, type: 'service' },
  { id: 'kafka', label: 'KAFKA', sub: 'Event Stream', x: 740, y: 140, type: 'data' },
  { id: 'postgres', label: 'POSTGRES', sub: 'Primary DB', x: 740, y: 260, type: 'data' },
]

const edges: Edge[] = [
  { from: 'client', to: 'gateway' },
  { from: 'gateway', to: 'auth' },
  { from: 'gateway', to: 'orders' },
  { from: 'gateway', to: 'payments' },
  { from: 'orders', to: 'kafka' },
  { from: 'payments', to: 'kafka' },
  { from: 'orders', to: 'postgres' },
  { from: 'auth', to: 'postgres' },
  { from: 'payments', to: 'postgres' },
]

const nodeMap = Object.fromEntries(nodes.map(n => [n.id, n]))

const ArchitectureDiagram = () => {
  const [packets, setPackets] = useState<{ id: number; edgeIdx: number; t: number }[]>([])
  const [hoveredNode, setHoveredNode] = useState<string | null>(null)
  const idRef = useRef(0)

  useEffect(() => {
    const spawn = setInterval(() => {
      idRef.current++
      const edgeIdx = Math.floor(Math.random() * edges.length)
      setPackets(p => [...p, { id: idRef.current, edgeIdx, t: 0 }])
    }, 400)

    let raf: number
    const animate = () => {
      setPackets(prev =>
        prev
          .map(p => ({ ...p, t: p.t + 0.012 }))
          .filter(p => p.t < 1)
      )
      raf = requestAnimationFrame(animate)
    }
    raf = requestAnimationFrame(animate)

    return () => {
      clearInterval(spawn)
      cancelAnimationFrame(raf)
    }
  }, [])

  const nodeColor = (type: Node['type']) => {
    switch (type) {
      case 'client': return '#f0c67a'
      case 'gateway': return '#e8a849'
      case 'service': return '#d4853a'
      case 'data': return '#c77d20'
    }
  }

  return (
    <div className="relative w-full overflow-x-auto">
      <svg
        viewBox="0 0 850 400"
        className="w-full max-w-5xl mx-auto"
        style={{ minWidth: 600 }}
      >
        <defs>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <radialGradient id="nodeGlow">
            <stop offset="0%" stopColor="rgba(232, 168, 73, 0.3)" />
            <stop offset="100%" stopColor="rgba(232, 168, 73, 0)" />
          </radialGradient>
        </defs>

        {/* Edges */}
        {edges.map((edge, i) => {
          const from = nodeMap[edge.from]
          const to = nodeMap[edge.to]
          return (
            <motion.line
              key={i}
              x1={from.x}
              y1={from.y}
              x2={to.x}
              y2={to.y}
              stroke="rgba(232, 168, 73, 0.15)"
              strokeWidth={1}
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              transition={{ duration: 1.5, delay: i * 0.1 }}
              viewport={{ once: true }}
            />
          )
        })}

        {/* Flowing packets */}
        {packets.map(packet => {
          const edge = edges[packet.edgeIdx]
          const from = nodeMap[edge.from]
          const to = nodeMap[edge.to]
          const px = from.x + (to.x - from.x) * packet.t
          const py = from.y + (to.y - from.y) * packet.t
          return (
            <g key={packet.id}>
              <circle cx={px} cy={py} r={6} fill="rgba(232, 168, 73, 0.15)" />
              <circle cx={px} cy={py} r={3} fill="#f0c67a" filter="url(#glow)" />
            </g>
          )
        })}

        {/* Nodes */}
        {nodes.map((node, i) => {
          const isHovered = hoveredNode === node.id
          return (
            <motion.g
              key={node.id}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + i * 0.1, duration: 0.5, ease: 'backOut' }}
              viewport={{ once: true }}
              onMouseEnter={() => setHoveredNode(node.id)}
              onMouseLeave={() => setHoveredNode(null)}
              style={{ cursor: 'pointer' }}
            >
              {/* Halo */}
              <circle
                cx={node.x}
                cy={node.y}
                r={isHovered ? 50 : 30}
                fill="url(#nodeGlow)"
                style={{ transition: 'r 0.5s' }}
              />

              {/* Pulsing ring */}
              <motion.circle
                cx={node.x}
                cy={node.y}
                r={20}
                fill="none"
                stroke={nodeColor(node.type)}
                strokeWidth={1}
                animate={{
                  r: [20, 35, 20],
                  opacity: [0.6, 0, 0.6],
                }}
                transition={{ duration: 3, repeat: Infinity, delay: i * 0.3 }}
              />

              {/* Main circle */}
              <circle
                cx={node.x}
                cy={node.y}
                r={isHovered ? 22 : 18}
                fill="rgba(15, 15, 15, 0.95)"
                stroke={nodeColor(node.type)}
                strokeWidth={isHovered ? 2 : 1.5}
                style={{ transition: 'all 0.3s' }}
              />

              {/* Inner dot */}
              <circle
                cx={node.x}
                cy={node.y}
                r={3}
                fill={nodeColor(node.type)}
                filter="url(#glow)"
              />

              {/* Labels */}
              <text
                x={node.x}
                y={node.y + 38}
                textAnchor="middle"
                fill="#f0ece4"
                fontSize="10"
                fontFamily="JetBrains Mono, monospace"
                fontWeight="700"
                letterSpacing="2"
              >
                {node.label}
              </text>
              <text
                x={node.x}
                y={node.y + 52}
                textAnchor="middle"
                fill="#7a756d"
                fontSize="8"
                fontFamily="JetBrains Mono, monospace"
                letterSpacing="1"
              >
                {node.sub}
              </text>
            </motion.g>
          )
        })}
      </svg>

      <div className="flex flex-wrap justify-center gap-4 mt-8 text-[10px] font-mono tracking-wider text-muted">
        <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#f0c67a]" /> CLIENT</span>
        <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#e8a849]" /> GATEWAY</span>
        <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#d4853a]" /> MICROSERVICE</span>
        <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#c77d20]" /> DATA LAYER</span>
      </div>
    </div>
  )
}

export default ArchitectureDiagram
