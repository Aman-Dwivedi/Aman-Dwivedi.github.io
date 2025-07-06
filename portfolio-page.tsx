"use client"

import { useEffect, useState } from "react"
import { Moon, Sun, Github, Linkedin, Mail, Phone, MapPin, Menu, X } from "lucide-react"

export default function Component() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "Research Collaboration",
    message: "",
  })
  const [formErrors, setFormErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)

  useEffect(() => {
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem("theme")
    if (savedTheme === "dark" || (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      setIsDarkMode(true)
      document.documentElement.classList.add("dark")
    }

    // Handle scroll events for header background
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    if (!isDarkMode) {
      document.documentElement.classList.add("dark")
      localStorage.setItem("theme", "dark")
    } else {
      document.documentElement.classList.remove("dark")
      localStorage.setItem("theme", "light")
    }
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  const validateForm = () => {
    const errors = {}

    if (!formData.name.trim()) {
      errors.name = "Name is required"
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Please enter a valid email address"
    }

    if (!formData.message.trim()) {
      errors.message = "Message is required"
    } else if (formData.message.trim().length < 10) {
      errors.message = "Message must be at least 10 characters long"
    }

    return errors
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Clear error for this field when user starts typing
    if (formErrors[name]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: "",
      }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const errors = validateForm()
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors)
      return
    }

    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      // Simulate API call - in a real app, you'd call your backend API
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: "dwivedi@ucdavis.edu",
          from: formData.email,
          subject: `Portfolio Contact: ${formData.subject}`,
          name: formData.name,
          message: formData.message,
        }),
      })

      if (response.ok) {
        setSubmitStatus("success")
        setFormData({
          name: "",
          email: "",
          subject: "Research Collaboration",
          message: "",
        })
      } else {
        throw new Error("Failed to send message")
      }
    } catch (error) {
      console.error("Error sending message:", error)
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const target = e.target as HTMLAnchorElement
    if (target.hash) {
      e.preventDefault()
      const element = document.querySelector(target.hash)
      if (element) {
        const headerOffset = 96
        const elementPosition = element.getBoundingClientRect().top
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        })
      }
      closeMobileMenu()
    }
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 dark:bg-purple-900 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-sky-300 dark:bg-sky-900 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-amber-300 dark:bg-amber-900 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700"
            : "bg-transparent"
        }`}
      >
        <div className="flex items-center justify-between px-6 py-4 max-w-6xl mx-auto">
          <button
            onClick={() => {
              window.scrollTo({
                top: 0,
                behavior: "smooth"
              })
            }}
            className="font-semibold text-gray-900 dark:text-white transition-colors duration-300 hover:text-sky-600 dark:hover:text-sky-400 cursor-pointer text-lg"
          >
            Aman Dwivedi
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a
              href="#work"
              onClick={handleNavClick}
              className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-300 relative group"
            >
              Work
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-sky-400 transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a
              href="#about"
              onClick={handleNavClick}
              className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-300 relative group"
            >
              About
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-sky-400 transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a
              href="#contact"
              onClick={handleNavClick}
              className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-300 relative group"
            >
              Contact
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-sky-400 transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-300 relative group"
            >
              Resume
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-sky-400 transition-all duration-300 group-hover:w-full"></span>
            </a>
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 hover:scale-110"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </nav>

          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center space-x-4">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 shadow-lg">
            <nav className="flex flex-col space-y-1 px-6 py-4">
              <a
                href="#work"
                onClick={handleNavClick}
                className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-300 py-2 px-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                Work
              </a>
              <a
                href="#about"
                onClick={handleNavClick}
                className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-300 py-2 px-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                About
              </a>
              <a
                href="#contact"
                onClick={handleNavClick}
                className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-300 py-2 px-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                Contact
              </a>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-300 py-2 px-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                Resume
              </a>
            </nav>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <main className="relative">
        <section className="min-h-screen flex items-center justify-center px-6 text-center pt-24">
          <div className="animate-fade-in-up max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 transition-colors duration-300">
              Hey! I'm Aman Dwivedi <span className="inline-block animate-wave">👋</span>
            </h1>

            <p className="text-lg md:text-xl lg:text-2xl text-sky-400 dark:text-sky-300 italic mb-8 font-light transition-colors duration-300">
              Computer Science Researcher & Software Developer
            </p>

            <div className="max-w-2xl mx-auto mb-8">
              <p className="text-gray-700 dark:text-gray-300 text-base md:text-lg leading-relaxed mb-6 transition-colors duration-300">
                I'm a Computer Science graduate student at UC Davis, passionate about systems research, software
                development, and building efficient solutions. I specialize in memory management systems and full-stack development.
              </p>

              <p className="text-gray-700 dark:text-gray-300 text-base md:text-lg transition-colors duration-300">
                Currently working as a Graduate Research Assistant on HeMem - a Heterogeneous Memory Management System.
              </p>
            </div>
          </div>
        </section>

        {/* Work Section */}
        <section id="work" className="py-20 bg-gray-50 dark:bg-gray-800 scroll-mt-24 transition-colors duration-300">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6 transition-colors duration-300">
                Work & Research
              </h2>
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto transition-colors duration-300">
                A selection of research projects and software development work showcasing my technical expertise
              </p>
            </div>

            <div className="space-y-16">
              {/* Project 1 - HeMem Research */}
              <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center group">
                <div className="bg-gradient-to-br from-purple-200 to-purple-300 dark:from-purple-800 dark:to-purple-900 rounded-2xl p-2 h-64 md:h-96 flex items-center justify-center transition-all duration-500 group-hover:scale-105">
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-sm md:w-80 h-32 md:h-80 flex items-center justify-center transition-all duration-300 group-hover:shadow-2xl overflow-hidden">
                    <img
                      src="/images/hemem-system.png"
                      alt="HeMem Memory Management System"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white transition-colors duration-300">
                    Graduate Research Assistant - HeMem
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed transition-colors duration-300 text-sm md:text-base">
                    I'm currently working on something pretty exciting in the memory systems space. The idea is to make heterogeneous memory work smarter by predicting what data applications will need next and moving it between different storage tiers before it's actually requested. It's like having a really good librarian who knows exactly which books you'll want to read next and puts them on your desk ahead of time.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded-full text-xs md:text-sm transition-colors duration-300">
                      Memory Systems
                    </span>
                    <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded-full text-xs md:text-sm transition-colors duration-300">
                      Prefetching
                    </span>
                    <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded-full text-xs md:text-sm transition-colors duration-300">
                      C/C++
                    </span>
                  </div>
                </div>
              </div>

              {/* Project 2 - Software Engineering Intern */}
              <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center group">
                <div className="md:order-2">
                  <div className="bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-800 dark:to-blue-900 rounded-2xl p-2 h-64 md:h-96 flex items-center justify-center transition-all duration-500 group-hover:scale-105">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-sm md:w-80 h-32 md:h-80 flex items-center justify-center transition-all duration-300 group-hover:shadow-2xl overflow-hidden">
                      <img
                        src="/images/daniels-company.jpg"
                        alt="The Daniels Company Website"
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                  </div>
                </div>
                <div className="md:order-1 space-y-4">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white transition-colors duration-300">
                    Software Engineering Intern
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed transition-colors duration-300 text-sm md:text-base">
                    At The Daniels Company, I got to build their web presence from the ground up. What started as a simple website request turned into a full-stack project where I designed both the user experience and the underlying architecture. The challenge was creating something that looked great but could also handle real business needs while staying secure and scalable in the cloud.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-xs md:text-sm transition-colors duration-300">
                      Next.js
                    </span>
                    <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-xs md:text-sm transition-colors duration-300">
                      Node.js
                    </span>
                    <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-xs md:text-sm transition-colors duration-300">
                      AWS
                    </span>
                    <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-xs md:text-sm transition-colors duration-300">
                      Full-Stack
                    </span>
                  </div>
                </div>
              </div>

              {/* Project 3 - OSIRIS-REx */}
              <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center group">
                <div className="bg-gradient-to-br from-sky-100 to-sky-200 dark:from-sky-800 dark:to-sky-900 rounded-2xl p-2 h-64 md:h-96 flex items-center justify-center transition-all duration-500 group-hover:scale-105">
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-sm md:w-80 h-32 md:h-80 flex items-center justify-center transition-all duration-300 group-hover:shadow-2xl overflow-hidden">
                    <img
                      src="/images/nasa-osiris.png"
                      alt="NASA OSIRIS-REx Mission"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white transition-colors duration-300">
                    Software Developer - NASA OSIRIS-REx
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed transition-colors duration-300 text-sm md:text-base">
                    Working on a NASA mission was surreal. I built the data infrastructure that hundreds of scientists around the world use to upload and analyze samples from an asteroid. The tricky part wasn't just handling the data, it was making sure everything worked seamlessly across different platforms and could scale as the mission progressed. Every line of code had to be rock solid because, well, it's NASA.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-sky-100 dark:bg-sky-900 text-sky-700 dark:text-sky-300 rounded-full text-xs md:text-sm transition-colors duration-300">
                      Python
                    </span>
                    <span className="px-3 py-1 bg-sky-100 dark:bg-sky-900 text-sky-700 dark:text-sky-300 rounded-full text-xs md:text-sm transition-colors duration-300">
                      Django
                    </span>
                    <span className="px-3 py-1 bg-sky-100 dark:bg-sky-900 text-sky-700 dark:text-sky-300 rounded-full text-xs md:text-sm transition-colors duration-300">
                      Flutter
                    </span>
                    <span className="px-3 py-1 bg-sky-100 dark:bg-sky-900 text-sky-700 dark:text-sky-300 rounded-full text-xs md:text-sm transition-colors duration-300">
                      Data Architecture
                    </span>
                  </div>
                </div>
              </div>

              {/* Project 4 - Legacy Codebase Refactoring */}
              <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center group">
                <div className="md:order-2">
                  <div className="bg-gradient-to-br from-amber-100 to-amber-200 dark:from-amber-800 dark:to-amber-900 rounded-2xl p-2 h-64 md:h-96 flex items-center justify-center transition-all duration-500 group-hover:scale-105">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-sm md:w-80 h-32 md:h-80 flex items-center justify-center transition-all duration-300 group-hover:shadow-2xl overflow-hidden">
                      <img
                        src="/images/research-visualization.png"
                        alt="Research Data Visualization"
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                  </div>
                </div>
                <div className="md:order-1 space-y-4">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white transition-colors duration-300">
                    Undergraduate Research Assistant
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed transition-colors duration-300 text-sm md:text-base">
                    Sometimes the most impactful work is the least glamorous. I spent months translating decades-old mathematical models from FORTRAN into modern Python, essentially giving new life to research that was trapped in legacy code. The real satisfaction came from seeing simulations that used to take hours now run in minutes, opening up entirely new possibilities for the research team.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-300 rounded-full text-xs md:text-sm transition-colors duration-300">
                      Code Migration
                    </span>
                    <span className="px-3 py-1 bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-300 rounded-full text-xs md:text-sm transition-colors duration-300">
                      Python
                    </span>
                    <span className="px-3 py-1 bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-300 rounded-full text-xs md:text-sm transition-colors duration-300">
                      Performance
                    </span>
                    <span className="px-3 py-1 bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-300 rounded-full text-xs md:text-sm transition-colors duration-300">
                      Visualization
                    </span>
                  </div>
                </div>
              </div>

              {/* Project 5 - Charitap */}
              <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center group">
                <div className="bg-gradient-to-br from-green-100 to-green-200 dark:from-green-800 dark:to-green-900 rounded-2xl p-2 h-64 md:h-96 flex items-center justify-center transition-all duration-500 group-hover:scale-105">
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-sm md:w-80 h-32 md:h-80 flex items-center justify-center transition-all duration-300 group-hover:shadow-2xl overflow-hidden">
                    <img
                      src="/images/charitap-app.png"
                      alt="Charitap Micro-Donation Platform"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white transition-colors duration-300">
                    Charitap - Personal Project
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed transition-colors duration-300 text-sm md:text-base">
                    I've always been fascinated by the idea of effortless giving. Charitap rounds up your online purchases to the nearest dollar and donates the difference to charity. Building it as a Chrome extension was the perfect challenge, it had to be lightweight, secure, and work seamlessly across thousands of different websites while handling real money transactions.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-full text-xs md:text-sm transition-colors duration-300">
                      Chrome Extension
                    </span>
                    <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-full text-xs md:text-sm transition-colors duration-300">
                      JavaScript
                    </span>
                    <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-full text-xs md:text-sm transition-colors duration-300">
                      Stripe API
                    </span>
                    <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-full text-xs md:text-sm transition-colors duration-300">
                      Fintech
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 scroll-mt-24 transition-colors duration-300">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6 transition-colors duration-300">
                About
              </h2>
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto transition-colors duration-300">
                Computer Science researcher passionate about systems optimization and software development
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div className="group order-2 md:order-1">
                <div className="bg-gradient-to-br from-amber-100 to-amber-200 dark:from-amber-800 dark:to-amber-900 rounded-2xl p-4 md:p-8 h-64 md:h-[28rem] flex items-center justify-center transition-all duration-500 group-hover:scale-105">
                  <div className="w-48 h-48 md:w-80 md:h-80 rounded-full overflow-hidden shadow-2xl transition-all duration-300 group-hover:shadow-3xl">
                    <img
                      src="/aman-profile.jpg"
                      alt="Aman Dwivedi"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-6 order-1 md:order-2">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed transition-colors duration-300 text-sm md:text-base">
                  I'm currently pursuing my Master's in Computer Science at UC Davis, where I spend most of my time diving deep into memory management systems and exploring how we can make computing more efficient. Before this, I completed my undergraduate degree at the University of Arizona with a focus on both computer science and mathematics, which gave me a solid foundation for tackling complex problems from multiple angles.
                </p>

                <p className="text-gray-700 dark:text-gray-300 leading-relaxed transition-colors duration-300 text-sm md:text-base">
                  What excites me most is the intersection between theoretical research and real-world applications. Whether I'm working on optimizing heterogeneous memory systems, building full-stack applications, or helping students understand complex algorithms as a teaching assistant, I'm always looking for ways to bridge that gap between academic research and practical software development. I believe the best solutions come from understanding both the theory behind the problem and the practical constraints of implementing it.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 bg-gray-50 dark:bg-gray-800 scroll-mt-24 transition-colors duration-300">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6 transition-colors duration-300">
                Contact
              </h2>
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto transition-colors duration-300">
                Let's discuss research opportunities, software development projects, or potential collaborations
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8 lg:gap-12 items-start">
              {/* Left side - Get in Touch */}
              <div className="lg:col-span-1">
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-6 transition-colors duration-300">
                  Get in touch
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed transition-colors duration-300 text-sm md:text-base">
                  I'm always interested in discussing new research opportunities, software development projects, and
                  collaborations. Whether you're looking for a researcher, developer, or teaching assistant, I'd love to
                  hear from you.
                </p>
              </div>

              {/* Right side - Contact methods in two columns */}
              <div className="lg:col-span-2 grid sm:grid-cols-2 gap-4 lg:gap-6">
                {/* First column - 2 contact methods */}
                <div className="space-y-4">
                  <a
                    href="mailto:dwivedi@ucdavis.edu"
                    className="flex items-center space-x-3 md:space-x-4 group cursor-pointer p-3 md:p-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 block"
                  >
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-sky-400 dark:bg-sky-500 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                      <Mail className="w-5 h-5 md:w-6 md:h-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">Email</p>
                      <span className="text-sm md:text-lg text-gray-700 dark:text-gray-300 transition-colors duration-300 group-hover:text-sky-600 dark:group-hover:text-sky-400 font-medium truncate block">
                        dwivedi@ucdavis.edu
                      </span>
                    </div>
                  </a>

                  <a
                    href="https://www.linkedin.com/in/amandwivedi16/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 md:space-x-4 group cursor-pointer p-3 md:p-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 block"
                  >
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-sky-400 dark:bg-sky-500 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                      <Linkedin className="w-5 h-5 md:w-6 md:h-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">LinkedIn</p>
                      <span className="text-sm md:text-lg text-gray-700 dark:text-gray-300 hover:text-sky-600 dark:hover:text-sky-400 transition-colors duration-300 font-medium">
                        LinkedIn Profile
                      </span>
                    </div>
                  </a>
                </div>

                {/* Second column - 2 contact methods */}
                <div className="space-y-4">
                  <a
                    href="https://github.com/Aman-Dwivedi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 md:space-x-4 group cursor-pointer p-3 md:p-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 block"
                  >
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-sky-400 dark:bg-sky-500 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                      <Github className="w-5 h-5 md:w-6 md:h-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">GitHub</p>
                      <span className="text-sm md:text-lg text-gray-700 dark:text-gray-300 hover:text-sky-600 dark:hover:text-sky-400 transition-colors duration-300 font-medium">
                        GitHub Profile
                      </span>
                    </div>
                  </a>

                  <div className="flex items-center space-x-3 md:space-x-4 group cursor-pointer p-3 md:p-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-sky-400 dark:bg-sky-500 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                      <MapPin className="w-5 h-5 md:w-6 md:h-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">Location</p>
                      <span className="text-sm md:text-lg text-gray-700 dark:text-gray-300 transition-colors duration-300 font-medium">
                        Davis, CA
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-8 border-t border-gray-200 dark:border-gray-700 transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-gray-600 dark:text-gray-400 transition-colors duration-300 text-sm md:text-base">
            © 2025 Aman Dwivedi. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
