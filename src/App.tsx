import { useEffect, useRef } from 'react'
import './App.scss'

export default function App() {
  const year = new Date().getFullYear()
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles: { x: number; y: number; vx: number; vy: number; size: number; alpha: number }[] = []

    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 2 + 0.5,
        alpha: Math.random() * 0.4 + 0.1,
      })
    }

    let animId: number
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach(p => {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(0, 212, 255, ${p.alpha})`
        ctx.fill()
      })

      particles.forEach((p, i) => {
        particles.slice(i + 1).forEach(p2 => {
          const dx = p.x - p2.x
          const dy = p.y - p2.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 120) {
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.strokeStyle = `rgba(0, 212, 255, ${0.08 * (1 - dist / 120)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        })
      })

      animId = requestAnimationFrame(draw)
    }
    draw()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <div className="app">
      <canvas ref={canvasRef} className="particles" />

      <main className="hero">
        <div className="logo-wrapper">
          <div className="logo-letters">
            <span className="letter s">S</span>
            <span className="letter t1">T</span>
            <span className="letter t2">T</span>
            <span className="letter a">a</span>
            <span className="letter l">L</span>
            <span className="letter i">I</span>
            <span className="letter s2">s</span>
          </div>
          <div className="logo-sub">TECH SOLUTIONS</div>
        </div>

        <div className="product-name">
          <span className="product-label">apresenta</span>
          <h1 className="product-title">
            STTaLIs <span className="highlight">Connect</span>
          </h1>
        </div>

        <div className="coming-soon">
          <span className="badge">Em breve</span>
          <p className="tagline">
            Conectando a fronteira.<br />
            <span>Serviços locais, alcance global.</span>
          </p>
        </div>

        <div className="notify">
          <p className="notify-text">Marketplace binacional de serviços</p>
          <p className="notify-sub">Ponta Porã (BR) · Pedro Juan Caballero (PY)</p>
        </div>
      </main>

      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <span className="footer-logo">STTaLIs</span>
            <span className="footer-company">Tech Solutions</span>
          </div>

          <div className="footer-info">
            <div className="footer-item">
              <span className="footer-label">Cidade</span>
              <span className="footer-value">Ponta Porã · MS · Brasil</span>
            </div>
            <div className="footer-item">
              <span className="footer-label">Fronteira</span>
              <span className="footer-value">Brasil · Paraguai</span>
            </div>
            <div className="footer-item">
              <span className="footer-label">Email</span>
              <a href="mailto:sttalistechsolution@gmail.com" className="footer-link">
                sttalistechsolution@gmail.com
              </a>
            </div>
            <div className="footer-item">
              <span className="footer-label">WhatsApp</span>
              <a href="https://wa.me/5567991813023" className="footer-link" target="_blank" rel="noreferrer">
                +55 67 99181-3023
              </a>
            </div>
            <div className="footer-item">
              <span className="footer-label">Site</span>
              <a href="https://sttalis.com.br" className="footer-link" target="_blank" rel="noreferrer">
                sttalis.com.br
              </a>
            </div>
          </div>

          <div className="footer-bottom">
            <span>© {year} STTaLIs Tech Solutions · Todos os direitos reservados</span>
            <span className="footer-ptin">              
            </span>
          </div>
        </div>
      </footer>
    </div>
  )
}