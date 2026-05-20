"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { Link } from "react-router-dom"

const vertexShader = `
  attribute vec4 position;
  void main() {
    gl_Position = position;
  }
`

const fragmentShader = `
  precision mediump float;
  uniform float u_time;
  uniform vec2 u_resolution;
  uniform vec2 u_mouse;
  uniform float u_intensity;
  
  // Advanced noise functions
  vec3 hash3(vec2 p) {
    vec3 q = vec3(dot(p, vec2(127.1, 311.7)), 
                  dot(p, vec2(269.5, 183.3)), 
                  dot(p, vec2(419.2, 371.9)));
    return fract(sin(q) * 43758.5453);
  }
  
  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * f * (f * (f * 6.0 - 15.0) + 10.0); // Improved smoothstep
    return mix(mix(dot(hash3(i + vec2(0.0,0.0)).xy, f - vec2(0.0,0.0)), 
                   dot(hash3(i + vec2(1.0,0.0)).xy, f - vec2(1.0,0.0)), u.x),
               mix(dot(hash3(i + vec2(0.0,1.0)).xy, f - vec2(0.0,1.0)), 
                   dot(hash3(i + vec2(1.0,1.0)).xy, f - vec2(1.0,1.0)), u.x), u.y);
  }
  
  float fbm(vec2 p, int octaves) {
    float value = 0.0;
    float amplitude = 1.0;
    float frequency = 0.25;
    // Capped at 6 octaves max for performance (avoids heavy GPU load that causes stuttering)
    for(int i = 0; i < 6; i++) {
      if(i >= octaves) break;
      value += amplitude * noise(p * frequency);
      amplitude *= 0.52;
      frequency *= 1.13;
    }
    return value;
  }
  
  // Smooth voronoi
  float voronoi(vec2 p) {
    vec2 n = floor(p);
    vec2 f = fract(p);
    float md = 50.0;
    
    for(int i = -2; i <= 2; i++) {
      for(int j = -2; j <= 2; j++) {
        vec2 g = vec2(i, j);
        vec2 o = hash3(n + g).xy;
        o = 0.5 + 0.41 * sin(u_time * 1.5 + 6.28 * o);
        vec2 r = g + o - f;
        float d = dot(r, r);
        md = min(md, d);
      }
    }
    return sqrt(md);
  }
  
  // Smooth plasma
  float plasma(vec2 p, float time) {
    float a = sin(p.x * 8.0 + time * 2.0);
    float b = sin(p.y * 8.0 + time * 1.7);
    float c = sin((p.x + p.y) * 6.0 + time * 1.3);
    float d = sin(sqrt(p.x * p.x + p.y * p.y) * 8.0 + time * 2.3);
    return (a + b + c + d) * 0.5;
  }
  
  // Curl noise for fluid motion
  vec2 curl(vec2 p, float time) {
    float eps = 0.5;
    float n1 = fbm(p + vec2(eps, 0.0), 6);
    float n2 = fbm(p - vec2(eps, 0.0), 6);
    float n3 = fbm(p + vec2(0.0, eps), 6);
    float n4 = fbm(p - vec2(0.0, eps), 6);
    
    return vec2((n3 - n4) / (2.0 * eps), (n2 - n1) / (2.0 * eps));
  }

  // Film grain
  float grain(vec2 uv, float time) {
    vec2 seed = uv * time;
    return fract(sin(dot(seed, vec2(12.9898, 78.233))) * 43758.5453);
  }
  
  void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    vec2 st = (uv - 0.5) * 2.0;
    st.x *= u_resolution.x / u_resolution.y;
    
    float time = u_time * 0.25;
    
    // Fluid motion using curl noise
    vec2 curlForce = curl(st * 2.0, time) * 0.6;
    vec2 flowField = st + curlForce;
    
    // Multiple smooth distortion layers (octave counts reduced for performance)
    float dist1 = fbm(flowField * 1.5 + time * 1.2, 5) * 0.4;
    float dist2 = fbm(flowField * 2.3 - time * 0.8, 4) * 0.3;
    float dist3 = fbm(flowField * 3.1 + time * 1.8, 3) * 0.2;
    float dist4 = fbm(flowField * 4.7 - time * 1.1, 2) * 0.15;
    
    // Smooth voronoi cellular structure
    float cells = voronoi(flowField * 2.5 + time * 0.5);
    cells = smoothstep(0.1, 0.7, cells);
    
    // Enhanced plasma effect
    float plasmaEffect = plasma(flowField + vec2(dist1, dist2), time * 1.5) * 0.2;
    
    // Combined smooth distortion
    float totalDist = dist1 + dist2 + dist3 + dist4 + plasmaEffect;
    
    // Smooth vertical streaks with multiple frequencies
    float streak1 = sin((st.x + totalDist) * 15.0 + time * 3.0) * 0.5 + 0.5;
    float streak2 = sin((st.x + totalDist * 0.7) * 25.0 - time * 2.0) * 0.5 + 0.5;
    float streak3 = sin((st.x + totalDist * 1.3) * 35.0 + time * 4.0) * 0.5 + 0.5;
    
    // Smooth power curves for streaks
    streak1 = smoothstep(0.3, 0.7, streak1);
    streak2 = smoothstep(0.2, 0.8, streak2);
    streak3 = smoothstep(0.4, 0.6, streak3);
    
    float combinedStreaks = streak1 * 0.6 + streak2 * 0.4 + streak3 * 0.5;
    
    // Multiple smooth flowing shapes
    float shape1 = 1.0 - abs(st.x + totalDist * 0.6);
    float shape2 = 1.0 - abs(st.x + totalDist * 0.4 + sin(st.y * 3.0 + time) * 0.15);
    float shape3 = 1.0 - abs(st.x + totalDist * 0.8 + cos(st.y * 2.0 - time) * 0.1);
    
    shape1 = smoothstep(0.0, 1.0, shape1);
    shape2 = smoothstep(0.1, 0.9, shape2);
    shape3 = smoothstep(0.2, 0.8, shape3);
    
    float finalShape = max(shape1 * 0.8, max(shape2 * 0.6, shape3 * 0.4));
    
    // BRAND ALIGNED COLOR PALETTE (Expeons Navy, Violet, Purple, Cyan, soft silver)
    vec3 color1 = vec3(0.486, 0.475, 1.0);   // Expeons brand-violet (#7C79FF)
    vec3 color2 = vec3(0.357, 0.361, 0.965); // Expeons brand-purple (#5B5CF6)
    vec3 color3 = vec3(0.25, 0.12, 0.85);    // Rich deep indigo/violet
    vec3 color4 = vec3(0.12, 0.52, 0.95);    // Process fluid blue
    vec3 color5 = vec3(0.0, 0.85, 0.75);     // Electric cyan (gas simulation)
    vec3 color6 = vec3(0.051, 0.059, 0.122); // Expeons brand-navy (#0D0F1F)
    vec3 color7 = vec3(0.933, 0.949, 1.0);   // Expeons brand-purple-light (#EEF2FF)
    
    // Smooth color transitions
    float gradient = 1.0 - uv.y;
    float colorNoise = fbm(flowField * 3.0 + time * 0.5, 4) * 0.5 + 0.5;
    float colorShift = sin(time * 1.5 + st.y * 2.0) * 0.5 + 0.5;
    
    vec3 finalColor;
    
    // Smooth multi-layer color blending
    float t1 = smoothstep(0.85, 1.0, gradient);
    float t2 = smoothstep(0.7, 0.85, gradient);
    float t3 = smoothstep(0.5, 0.7, gradient);
    float t4 = smoothstep(0.3, 0.5, gradient);
    float t5 = smoothstep(0.15, 0.3, gradient);
    float t6 = smoothstep(0.0, 0.15, gradient);
    
    finalColor = mix(color6, color7, t6);
    finalColor = mix(finalColor, color5, t5);
    finalColor = mix(finalColor, color4, t4);
    finalColor = mix(finalColor, color3, t3);
    finalColor = mix(finalColor, color2, t2);
    finalColor = mix(finalColor, color1, t1);
    
    // Smooth color variations
    finalColor = mix(finalColor, color1, colorNoise * 0.82);
    finalColor = mix(finalColor, color5, colorShift * 0.5);
    
    // Enhanced chromatic aberration
    vec2 aberration = curlForce * 0.02;
    vec3 aberrationColor = finalColor;
    aberrationColor.r = mix(finalColor.r, color1.r, length(aberration) * 2.0);
    aberrationColor.b = mix(finalColor.b, color4.b, length(aberration) * 1.5);
    aberrationColor.g = mix(finalColor.g, color5.g, length(aberration) * 1.2);
    
    // Smooth energy pulses
    float pulse1 = sin(time * 3.0 + st.y * 6.0) * 0.5 + 0.5;
    float pulse2 = sin(time * 4.5 - st.y * 8.0) * 0.5 + 0.5;
    float energyPulse = smoothstep(0.3, 0.7, pulse1 * pulse2);
    
    // Apply all effects smoothly
    float intensity = finalShape * combinedStreaks * (1.0 + energyPulse * 0.4);
    intensity *= (1.0 + cells * 0.2);
    intensity *= u_intensity; // Global intensity control
    
    // Enhanced mouse interaction
    vec2 mouse = u_mouse / u_resolution.xy;
    mouse = (mouse - 0.5) * 2.0;
    mouse.x *= u_resolution.x / u_resolution.y;
    
    float mouseInfluence = 1.0 - length(st - mouse) * 0.6;
    mouseInfluence = max(0.0, mouseInfluence);
    mouseInfluence = smoothstep(0.0, 1.0, mouseInfluence);
    
    intensity += mouseInfluence * 0.6;
    aberrationColor = mix(aberrationColor, color1, 0.3);
    
    // Final color application with post-processing
    vec3 result = aberrationColor * intensity;
    
    // Bloom effect
    float bloom = smoothstep(0.4, 1.0, intensity) * 0.54;
    result += bloom * finalColor;
    
    // Color grading
    result = pow(result, vec3(0.85)); // Gamma correction
    result = mix(result, result * result, 0.2); // Contrast boost
    
    // Vignette effect
    float vignette = 1.0 - length(uv - 0.5) * 0.85;
    vignette = smoothstep(0.2, 1.0, vignette);
    
    // Enhanced background with subtle brand colors
    vec3 bgColor = vec3(0.02, 0.01, 0.08) + finalColor * 0.04;
    result = mix(bgColor, result, smoothstep(0.0, 0.4, intensity));
    result *= vignette;
    
    // Final saturation and brightness
    result = mix(vec3(dot(result, vec3(0.299, 0.587, 0.114))), result, 1.3);
    // Note: Film grain and scanlines removed — they caused per-frame random flicker and shimmer
    
    gl_FragColor = vec4(result, 1.0);
  }
`

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
      className={`block mb-2 text-4xl md:text-6xl lg:text-7xl font-heading font-black leading-none cursor-pointer transition-all duration-300 transform-gpu perspective-1000 ${isHovered ? "z-10" : ""
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
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const heroTextRef = useRef<HTMLDivElement>(null)
  const navRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const glRef = useRef<WebGLRenderingContext | null>(null)
  const programRef = useRef<WebGLProgram | null>(null)
  const bufferRef = useRef<WebGLBuffer | null>(null)
  const positionLocationRef = useRef<number>(0)
  const timeLocationRef = useRef<WebGLUniformLocation | null>(null)
  const resolutionLocationRef = useRef<WebGLUniformLocation | null>(null)
  const mouseLocationRef = useRef<WebGLUniformLocation | null>(null)
  const intensityLocationRef = useRef<WebGLUniformLocation | null>(null)
  const startTimeRef = useRef<number>(Date.now())
  const globalIntensityRef = useRef<number>(1.0)

  // Map to core Expeons process engineering services
  const navLinks = [
    { text: "SIMULATE", to: "/services", gradient: "linear-gradient(135deg, #ffffff, #7C79FF)" },
    { text: "SCHEMATICS", to: "/services", gradient: "linear-gradient(135deg, #ffffff, #5B5CF6)" },
    { text: "STANDARDS", to: "/services", gradient: "linear-gradient(135deg, #EEF2FF, #7C79FF)" },
    { text: "SAFETY", to: "/services", gradient: "linear-gradient(135deg, #ffffff, #EEF2FF)" },
  ]

  const createShader = (type: number, source: string) => {
    const gl = glRef.current
    if (!gl) return null

    const shader = gl.createShader(type)
    if (!shader) return null

    gl.shaderSource(shader, source)
    gl.compileShader(shader)

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error("Shader compile error:", gl.getShaderInfoLog(shader))
      gl.deleteShader(shader)
      return null
    }

    return shader
  }

  const initGL = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const gl = canvas.getContext("webgl")
    if (!gl) return

    glRef.current = gl

    // Create shader program
    const vertShader = createShader(gl.VERTEX_SHADER, vertexShader)
    const fragShader = createShader(gl.FRAGMENT_SHADER, fragmentShader)

    if (!vertShader || !fragShader) return

    const program = gl.createProgram()
    if (!program) return

    gl.attachShader(program, vertShader)
    gl.attachShader(program, fragShader)
    gl.linkProgram(program)

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("Program link error:", gl.getProgramInfoLog(program))
      return
    }

    programRef.current = program

    // Create buffer
    const buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW)

    bufferRef.current = buffer

    // Get uniform locations
    const positionLocation = gl.getAttribLocation(program, "position")
    positionLocationRef.current = positionLocation
    const timeLocation = gl.getUniformLocation(program, "u_time")
    timeLocationRef.current = timeLocation
    const resolutionLocation = gl.getUniformLocation(program, "u_resolution")
    resolutionLocationRef.current = resolutionLocation
    const mouseLocation = gl.getUniformLocation(program, "u_mouse")
    mouseLocationRef.current = mouseLocation
    const intensityLocation = gl.getUniformLocation(program, "u_intensity")
    intensityLocationRef.current = intensityLocation

    // Resize canvas — debounced to avoid flash during rapid resize events
    let resizeTimer: ReturnType<typeof setTimeout>
    const resizeCanvas = () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(() => {
        const rect = canvas.getBoundingClientRect()
        // Cap pixel ratio at 2 to avoid over-rendering on high-DPI mobile devices
        const dpr = Math.min(window.devicePixelRatio, 2)
        canvas.width = rect.width * dpr
        canvas.height = rect.height * dpr
        gl.viewport(0, 0, canvas.width, canvas.height)
      }, 50)
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio, 2)
      mouseRef.current.x = (e.clientX - rect.left) * dpr
      mouseRef.current.y = (rect.height - (e.clientY - rect.top)) * dpr

      // Smoother intensity changes
      gsap.to(globalIntensityRef, {
        current: 1.15,
        duration: 0.3,
        ease: "power2.out",
      })

      // Smooth decay back to normal
      gsap.to(globalIntensityRef, {
        current: 1.0,
        duration: 1.0,
        delay: 0.1,
        ease: "power2.out",
      })
    }

    canvas.addEventListener("mousemove", handleMouseMove)
  }

  useEffect(() => {
    initGL()

    let animationFrameId: number
    let lastFrameTime = 0
    // On mobile, cap to ~30fps to reduce GPU pressure and prevent stuttering
    const isMobile = window.matchMedia("(max-width: 768px)").matches
    const targetInterval = isMobile ? 1000 / 30 : 1000 / 60

    const animateFrame = (timestamp: number) => {
      animationFrameId = requestAnimationFrame(animateFrame)

      const elapsed = timestamp - lastFrameTime
      if (elapsed < targetInterval) return
      lastFrameTime = timestamp - (elapsed % targetInterval)

      const time = (Date.now() - startTimeRef.current) * 0.001
      const gl = glRef.current
      const program = programRef.current
      const buffer = bufferRef.current
      const positionLocation = positionLocationRef.current
      const timeLocation = timeLocationRef.current
      const resolutionLocation = resolutionLocationRef.current
      const mouseLocation = mouseLocationRef.current
      const intensityLocation = intensityLocationRef.current

      if (gl && program && buffer && timeLocation && resolutionLocation && mouseLocation && intensityLocation) {
        gl.useProgram(program)
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
        gl.enableVertexAttribArray(positionLocation)
        gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0)

        gl.uniform1f(timeLocation, time)
        gl.uniform2f(resolutionLocation, gl.canvas.width, gl.canvas.height)
        gl.uniform2f(mouseLocation, mouseRef.current.x, mouseRef.current.y)
        gl.uniform1f(intensityLocation, globalIntensityRef.current)

        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
      }
    }

    animationFrameId = requestAnimationFrame(animateFrame)

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <section className="relative h-screen w-full overflow-hidden bg-brand-navy">
      {/* will-change + transform promote canvas to its own GPU layer, preventing composite thrashing */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ background: "#050612", willChange: "transform", transform: "translateZ(0)" }}
      />
      
      {/* Mobile overlay — static gradient, NO backdrop-blur (blur over animating WebGL causes severe GPU composite thrashing) */}
      <div className="absolute inset-0 lg:hidden pointer-events-none z-0" style={{ background: "linear-gradient(to bottom, rgba(5,6,18,0.55) 0%, rgba(5,6,18,0.35) 50%, rgba(5,6,18,0.6) 100%)" }} />

      <div className="relative z-10 h-full flex flex-col justify-between p-6 md:p-12 lg:p-16">
        <div ref={heroTextRef} className="text-left flex flex-col gap-4 pt-0">
          {/* Brand Logo */}
          <Link to="/" className="inline-block w-fit mb-2">
            <img
              src="/brand/logo-white.png"
              alt="Expeons"
              className="h-7 lg:h-8 w-auto"
            />
          </Link>
          <div className="flex flex-col gap-1">
            <p className="text-brand-violet text-xs md:text-sm uppercase tracking-widest font-heading font-bold">
              {"Precision Process Engineering"}
            </p>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-white/70 lg:text-white/50 text-[10px] md:text-xs">
              <span>{"EPC-READY DELIVERABLES"}</span>
              <span className="w-1 h-1 rounded-full bg-white/20"></span>
              <span>{"ASPEN HYSYS / PLUS SIMULATION"}</span>
              <span className="w-1 h-1 rounded-full bg-white/20"></span>
              <span>{"INTERNATIONAL STANDARDS"}</span>
            </div>
          </div>
        </div>

        {/* Bottom content grid */}
        <div className="flex flex-col lg:grid lg:grid-cols-[1.5fr_1fr] gap-6 lg:gap-8 justify-between items-end pb-4 lg:pb-12">
          {/* Left Navigation */}
          <nav ref={navRef} className="text-left w-full mb-4 lg:mb-0">
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
            <h1 className="mb-3 font-heading font-bold text-2xl md:text-4xl text-white leading-tight">
              {"We engineer the process behind your project."}
            </h1>
            <p className="mb-6 text-white/90 lg:text-white/70 font-body leading-relaxed text-sm">
              {"Specialized process-only engineering support for EPC contractors, industrial facilities, and SMEs — simulation, documentation, safety, and design. Expert quality, optimized execution."}
            </p>
            <div className="flex flex-wrap lg:justify-end gap-3 mb-6">
              <Link
                to="/services"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-purple hover:bg-brand-violet text-white font-body font-semibold text-xs md:text-sm rounded-lg transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-brand-purple/20"
              >
                {"Explore Our Services"}
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-transparent border border-white/20 hover:border-white/40 hover:bg-white/5 text-white font-body font-semibold text-xs md:text-sm rounded-lg transition-all duration-300"
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
