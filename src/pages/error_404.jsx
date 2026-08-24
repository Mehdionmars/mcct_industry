import { useEffect, useState } from "react"

export default function UnderConstruction() {
  const [progress, setProgress] = useState(0)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    // Simulate progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 1
      })
    }, 30)

    return () => clearInterval(interval)
  }, [])

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#0A2540] via-[#1976D2] to-[#2196F3]">
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-64 h-64 border-2 border-white/30 animate-rotate" />
        <div
          className="absolute bottom-20 right-20 w-96 h-96 border-2 border-white/30 animate-rotate"
          style={{ animationDirection: "reverse", animationDuration: "30s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border-2 border-white/20 animate-rotate"
          style={{ animationDuration: "40s" }}
        />
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 py-12">
        {/* Logo */}
        <div
          className={`mb-12 transition-all duration-1000 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"}`}
        >
          <div className="animate-float">
            <img
              src="/logo1.png"
              alt="MCCT Industry Logo"
              className="w-auto h-24 md:h-32"
            />
          </div>
        </div>

        {/* Main content */}
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Heading */}
          <div
            className={`space-y-4 transition-all duration-1000 delay-300 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight">Site en Construction</h1>
            <div className="h-1 w-32 bg-white mx-auto rounded-full" />
          </div>

          {/* Description */}
          <div
            className={`transition-all duration-1000 delay-500 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <p className="text-xl md:text-2xl text-white/90 leading-relaxed max-w-2xl mx-auto">
              Nous travaillons actuellement sur notre nouveau site web pour vous offrir une meilleure expérience.
            </p>
          </div>

          {/* Progress bar */}
          <div
            className={`transition-all duration-1000 delay-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <div className="max-w-md mx-auto space-y-4">
              <div className="relative h-3 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm">
                <div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-white to-white/80 rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${progress}%` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-pulse border-orange-700" />
                </div>
              </div>
              <p className="text-white/80 text-sm font-medium">Progression: {progress}%</p>
            </div>
          </div>

          {/* Construction icons */}
          <div
            className={`flex justify-center gap-8 pt-8 transition-all duration-1000 delay-1000 ${mounted ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}
          >
            <div className="flex flex-col items-center gap-2 animate-float" style={{ animationDelay: "0s" }}>
              <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                  />
                </svg>
              </div>
              <span className="text-white/70 text-xs font-medium">Design</span>
            </div>

            <div className="flex flex-col items-center gap-2 animate-float" style={{ animationDelay: "0.5s" }}>
              <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                  />
                </svg>
              </div>
              <span className="text-white/70 text-xs font-medium">Développement</span>
            </div>

            <div className="flex flex-col items-center gap-2 animate-float" style={{ animationDelay: "1s" }}>
              <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <span className="text-white/70 text-xs font-medium">Tests</span>
            </div>
          </div>

          {/* Contact info */}
          <div
            className={`pt-12 pb-16 transition-all duration-1000 delay-1200 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <div className="inline-flex flex-col px-8 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 text-chart-1 gap-3 py-[30px]">
              <p className="text-white/90 text-sm font-medium">Pour toute question, contactez-nous:</p>
              <a
                href="mailto:mcctindustry@gmail.com"
                className="text-white font-semibold text-lg hover:text-white/80 transition-colors"
              >
                mcctindustry@gmail.com
              </a>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
          className={`absolute bottom-8 left-0 right-0 text-center transition-all duration-1000 delay-1500 ${mounted ? "opacity-100" : "opacity-0"}`}
        >
          <p className="text-white/60 text-sm">© {new Date().getFullYear()} MCCT Industry. Tous droits réservés.</p>
        </div>
      </div>
    </main>
  )
}