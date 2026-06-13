import type React from "react"
import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { Link } from "react-router-dom"

interface NavLinkProps {
  children: React.ReactNode
  to: string
  gradient: string
}

function NavLink({ children, to, gradient }: NavLinkProps) {
  const linkRef = useRef<HTMLAnchorElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const link = linkRef.current
    if (!link) return

    const handleMouseEnter = () => {
      setIsHovered(true)
      gsap.to(link, {
        scale: 1.05,
        rotationX: -2,
        z: 20,
        duration: 0.6,
        ease: "power3.out",
      })

      gsap.to(link, {
        textShadow: "0 5px 20px rgba(124,121,255,0.4)",
        duration: 0.5,
        ease: "power3.out",
      })
    }

    const handleMouseLeave = () => {
      setIsHovered(false)
      gsap.to(link, {
        scale: 1,
        rotationX: 0,
        z: 0,
        duration: 0.6,
        ease: "power3.out",
      })

      gsap.to(link, {
        textShadow: "0 0 0px rgba(124,121,255,0)",
        duration: 0.5,
        ease: "power3.out",
      })
    }

    link.addEventListener("mouseenter", handleMouseEnter)
    link.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      link.removeEventListener("mouseenter", handleMouseEnter)
      link.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [])

  return (
    <Link
      ref={linkRef}
      to={to}
      className={`block mb-2 text-3xl md:text-6xl lg:text-7xl font-heading font-black leading-none cursor-pointer transition-all duration-300 transform-gpu perspective-1000 ${isHovered ? "z-10" : ""
        }`}
      style={{
        background: gradient,
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        color: "transparent",
        filter: isHovered ? "brightness(1.2) saturate(1.3)" : "brightness(1) saturate(1)",
      }}
    >
      {children}
    </Link>
  )
}

export function Hero() {
  const heroTextRef = useRef<HTMLDivElement>(null)
  const navRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

  // Map to core Expeons process engineering services
  const navLinks = [
    { text: "SIMULATE", to: "/services", gradient: "linear-gradient(135deg, #ffffff, #7C79FF)" },
    { text: "SCHEMATICS", to: "/services", gradient: "linear-gradient(135deg, #ffffff, #5B5CF6)" },
    { text: "STANDARDS", to: "/services", gradient: "linear-gradient(135deg, #EEF2FF, #7C79FF)" },
    { text: "SAFETY", to: "/services", gradient: "linear-gradient(135deg, #ffffff, #EEF2FF)" },
  ]

  return (
    <section className="relative h-screen w-full overflow-hidden bg-brand-navy">
      {/* Background Videos - stop on last frame (no loop) */}
      
      {/* Desktop Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover hidden md:block"
        autoPlay
        muted
        playsInline
      >
        <source src="/bg-video-16-9.mp4" type="video/mp4" />
      </video>

      {/* Mobile Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover md:hidden"
        autoPlay
        muted
        playsInline
      >
        <source src="/bg-video-9-16.mp4" type="video/mp4" />
      </video>

      {/* Sophisticated gradient overlay for text readability */}
      <div 
        className="absolute inset-0 pointer-events-none z-0" 
        style={{ 
          background: "linear-gradient(to bottom, rgba(5, 6, 18, 0.7) 0%, rgba(5, 6, 18, 0.3) 25%, rgba(5, 6, 18, 0.3) 70%, rgba(5, 6, 18, 0.8) 100%)" 
        }} 
      />

      <div className="relative z-10 h-full flex flex-col justify-between p-6 md:p-12 lg:p-16">
        <div ref={heroTextRef} className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-6 pt-0 text-left">
          {/* Brand Logo */}
          <Link to="/" className="inline-block w-fit mb-4 lg:mb-2">
            <img
              src="/brand/logo-white.png"
              alt="Expeons"
              className="h-7 lg:h-8 w-auto"
            />
          </Link>
          <div className="flex flex-col gap-1 lg:text-right lg:items-end">
            <p className="text-brand-violet text-[10px] md:text-sm uppercase tracking-widest font-heading font-bold">
              {"Precision Process Engineering"}
            </p>
          </div>
        </div>

        {/* Bottom content grid */}
        <div className="flex flex-col lg:grid lg:grid-cols-[1.5fr_1fr] gap-10 lg:gap-8 justify-between items-end pb-4 lg:pb-12">
          {/* Left Navigation */}
          <nav ref={navRef} className="text-left w-full mb-8 lg:mb-0">
            {navLinks.map((link) => (
              <NavLink key={link.text} to={link.to} gradient={link.gradient}>
                {link.text}
              </NavLink>
            ))}
          </nav>

          {/* Right Corporate Card Info */}
          <div
            ref={ctaRef}
            className="text-left lg:text-right text-gray-300 text-xs md:text-sm max-w-lg lg:ml-auto"
          >
            <h1 className="mb-3 font-heading font-bold text-xl md:text-4xl text-white leading-tight">
              {"We engineer the process behind your project."}
            </h1>
            <p className="mb-6 text-white/90 lg:text-white/70 font-body leading-relaxed text-[13px] md:text-sm">
              {"From Feasibility Studies and Front-End Engineering Design (FEED) to Process Simulation and Detailed Engineering—we provide comprehensive solutions across the entire project lifecycle. Expeons coordinates high-precision deliverables that ensure technical excellence and seamless execution at every stage."}
            </p>
            <div className="flex flex-wrap lg:justify-end gap-3 mb-6">
              <Link
                to="/services"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-purple hover:bg-brand-violet text-white font-body font-semibold text-xs md:text-sm rounded-full transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-brand-purple/20"
              >
                {"Explore Our Services"}
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-transparent border border-white/20 hover:border-white/40 hover:bg-white/5 text-white font-body font-semibold text-xs md:text-sm rounded-full transition-all duration-300"
              >
                {"Get in Touch"}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
