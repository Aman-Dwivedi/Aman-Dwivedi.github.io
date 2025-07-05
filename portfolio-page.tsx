"use client"

import { useEffect, useState } from "react"
import { Moon, Sun, Github, Linkedin, Mail, Phone, MapPin } from "lucide-react"

export default function Component() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

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

  useEffect(() => {
    // Smooth scrolling for navigation links
    const handleClick = (e: Event) => {
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
      }
    }

    const navLinks = document.querySelectorAll('nav a[href^="#"]')
    navLinks.forEach((link) => {
      link.addEventListener("click", handleClick)
    })

    return () => {
      navLinks.forEach((link) => {
        link.removeEventListener("click", handleClick)
      })
    }
  }, [])

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
        <div className="flex items-center justify-between px-6 py-6 max-w-6xl mx-auto">
          <div className="font-semibold text-gray-900 dark:text-white transition-colors duration-300">Aman Dwivedi</div>
          <nav className="flex items-center space-x-8">
            <a
              href="#work"
              className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-300 relative group"
            >
              Work
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-sky-400 transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a
              href="#about"
              className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-300 relative group"
            >
              About
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-sky-400 transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a
              href="#contact"
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
        </div>
      </header>

      {/* Hero Section */}
      <main className="pt-24 relative">
        <section className="max-w-4xl mx-auto px-6 py-16 text-center scroll-mt-24">
          <div className="animate-fade-in-up">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 transition-colors duration-300">
              Hey! I'm Aman Dwivedi <span className="inline-block animate-wave">👋</span>
            </h1>

            <p className="text-xl md:text-2xl text-sky-400 dark:text-sky-300 italic mb-8 font-light transition-colors duration-300">
              Computer Science Researcher & Software Developer
            </p>

            <div className="max-w-2xl mx-auto mb-8">
              <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-6 transition-colors duration-300">
                I'm a Computer Science graduate student at UC Davis, passionate about systems research, software
                development, and building efficient solutions. I specialize in memory management systems, satellite
                networks, and full-stack development.
              </p>

              <p className="text-gray-700 dark:text-gray-300 text-lg transition-colors duration-300">
                Currently working as a Graduate Research Assistant on HeMem - a Heterogeneous Memory Management System.
              </p>
            </div>
          </div>

          {/* Project Cards */}
          <div className="grid md:grid-cols-2 gap-6 mt-20">
            {/* Left Project Card - HeMem Research */}
            <div className="group bg-gradient-to-br from-purple-200 to-purple-300 dark:from-purple-800 dark:to-purple-900 rounded-2xl p-8 h-80 flex items-end justify-center relative overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-2xl cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-64 h-40 flex items-center justify-center transition-all duration-300 group-hover:shadow-2xl relative z-10 overflow-hidden">
                <img
                  src="/images/hemem-system.png"
                  alt="HeMem Memory Management System"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            </div>

            {/* Right Project Card - Charitap */}
            <div className="group bg-gradient-to-br from-sky-100 to-sky-200 dark:from-sky-800 dark:to-sky-900 rounded-2xl p-8 h-80 flex items-end justify-center relative overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-2xl cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-br from-sky-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-64 h-40 flex items-center justify-center transition-all duration-300 group-hover:shadow-2xl relative z-10 overflow-hidden">
                <img
                  src="/images/charitap-app.png"
                  alt="Charitap Micro-Donation Platform"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Work Section */}
        <section id="work" className="py-20 bg-gray-50 dark:bg-gray-800 scroll-mt-24 transition-colors duration-300">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 transition-colors duration-300">
                Work & Research
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto transition-colors duration-300">
                A selection of research projects and software development work showcasing my technical expertise
              </p>
            </div>

            <div className="space-y-16">
              {/* Project 1 - HeMem Research */}
              <div className="grid md:grid-cols-2 gap-12 items-center group">
                <div className="bg-gradient-to-br from-purple-200 to-purple-300 dark:from-purple-800 dark:to-purple-900 rounded-2xl p-8 h-64 flex items-center justify-center transition-all duration-500 group-hover:scale-105">
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-48 h-32 flex items-center justify-center transition-all duration-300 group-hover:shadow-2xl overflow-hidden">
                    <img
                      src="/images/hemem-system.png"
                      alt="HeMem Memory Management System"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white transition-colors duration-300">
                    HeMem - Heterogeneous Memory Management
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed transition-colors duration-300">
                    Graduate Research Assistant working with Dr. Amanda Raybuck on improving the efficiency of HeMem
                    system. Developed prefetching techniques to migrate pages between NVM and DRAM, optimizing memory
                    performance.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded-full text-sm transition-colors duration-300">
                      Systems Research
                    </span>
                    <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded-full text-sm transition-colors duration-300">
                      Memory Management
                    </span>
                    <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded-full text-sm transition-colors duration-300">
                      C/C++
                    </span>
                  </div>
                </div>
              </div>

              {/* Project 2 - OSIRIS-REx */}
              <div className="grid md:grid-cols-2 gap-12 items-center group">
                <div className="md:order-2">
                  <div className="bg-gradient-to-br from-sky-100 to-sky-200 dark:from-sky-800 dark:to-sky-900 rounded-2xl p-8 h-64 flex items-center justify-center transition-all duration-500 group-hover:scale-105">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-48 h-32 flex items-center justify-center transition-all duration-300 group-hover:shadow-2xl overflow-hidden">
                      <img
                        src="/images/nasa-osiris.png"
                        alt="NASA OSIRIS-REx Mission"
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                  </div>
                </div>
                <div className="md:order-1 space-y-4">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white transition-colors duration-300">
                    NASA OSIRIS-REx Data Management
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed transition-colors duration-300">
                    Developed a comprehensive data architecture and management system for NASA's OSIRIS-REx mission.
                    Created a multiplatform Flutter app for seamless data upload and management by 250+ scientists
                    worldwide.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-sky-100 dark:bg-sky-900 text-sky-700 dark:text-sky-300 rounded-full text-sm transition-colors duration-300">
                      Python
                    </span>
                    <span className="px-3 py-1 bg-sky-100 dark:bg-sky-900 text-sky-700 dark:text-sky-300 rounded-full text-sm transition-colors duration-300">
                      Django
                    </span>
                    <span className="px-3 py-1 bg-sky-100 dark:bg-sky-900 text-sky-700 dark:text-sky-300 rounded-full text-sm transition-colors duration-300">
                      Flutter
                    </span>
                    <span className="px-3 py-1 bg-sky-100 dark:bg-sky-900 text-sky-700 dark:text-sky-300 rounded-full text-sm transition-colors duration-300">
                      PostgreSQL
                    </span>
                  </div>
                </div>
              </div>

              {/* Project 3 - Charitap */}
              <div className="grid md:grid-cols-2 gap-12 items-center group">
                <div className="bg-gradient-to-br from-green-100 to-green-200 dark:from-green-800 dark:to-green-900 rounded-2xl p-8 h-64 flex items-center justify-center transition-all duration-500 group-hover:scale-105">
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-48 h-32 flex items-center justify-center transition-all duration-300 group-hover:shadow-2xl overflow-hidden">
                    <img
                      src="/images/charitap-app.png"
                      alt="Charitap Micro-Donation Platform"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white transition-colors duration-300">
                    Charitap - Micro-Donation Platform
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed transition-colors duration-300">
                    A micro-donation platform that rounds up everyday purchases and automatically donates spare change
                    to chosen charities. Implemented as a Chrome Extension leveraging Stripe API and e-commerce
                    principles.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-full text-sm transition-colors duration-300">
                      JavaScript
                    </span>
                    <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-full text-sm transition-colors duration-300">
                      Chrome Extension
                    </span>
                    <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-full text-sm transition-colors duration-300">
                      Stripe API
                    </span>
                  </div>
                </div>
              </div>

              {/* Project 4 - Hypatia Simulator */}
              <div className="grid md:grid-cols-2 gap-12 items-center group">
                <div className="md:order-2">
                  <div className="bg-gradient-to-br from-amber-100 to-amber-200 dark:from-amber-800 dark:to-amber-900 rounded-2xl p-8 h-64 flex items-center justify-center transition-all duration-500 group-hover:scale-105">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-48 h-32 flex items-center justify-center transition-all duration-300 group-hover:shadow-2xl overflow-hidden">
                      <img
                        src="/images/hypatia-simulator.png"
                        alt="Hypatia LEO Satellite Simulator"
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                  </div>
                </div>
                <div className="md:order-1 space-y-4">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white transition-colors duration-300">
                    LEO Satellite Network Optimization
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed transition-colors duration-300">
                    Worked with Dr. Beichuan Zhang on improving efficiency of Hypatia Simulator for Low Earth Orbit
                    satellite networks. Replaced brute force algorithms with optimized rules for shortest path
                    calculations between satellites.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-300 rounded-full text-sm transition-colors duration-300">
                      Network Optimization
                    </span>
                    <span className="px-3 py-1 bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-300 rounded-full text-sm transition-colors duration-300">
                      Python
                    </span>
                    <span className="px-3 py-1 bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-300 rounded-full text-sm transition-colors duration-300">
                      Algorithm Design
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
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 transition-colors duration-300">
                About
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto transition-colors duration-300">
                Computer Science researcher passionate about systems optimization and software development
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div className="group">
                <div className="bg-gradient-to-br from-amber-100 to-amber-200 dark:from-amber-800 dark:to-amber-900 rounded-2xl p-8 h-80 flex items-center justify-center transition-all duration-500 group-hover:scale-105">
                  <div className="w-32 h-32 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center transition-all duration-300 group-hover:shadow-2xl">
                    <div className="text-gray-500 dark:text-gray-400 text-sm transition-colors duration-300">Photo</div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed transition-colors duration-300">
                  I'm currently pursuing my Master's in Computer Science at UC Davis (GPA: 3.9), building on my strong
                  foundation from the University of Arizona where I graduated with a perfect 4.0 GPA in Computer Science
                  with a minor in Mathematics.
                </p>

                <p className="text-gray-700 dark:text-gray-300 leading-relaxed transition-colors duration-300">
                  My research focuses on systems optimization, particularly memory management and network efficiency.
                  I've had the privilege of working on cutting-edge projects including NASA missions and satellite
                  network research.
                </p>

                <p className="text-gray-700 dark:text-gray-300 leading-relaxed transition-colors duration-300">
                  As a Teaching Assistant for over 3 years, I've helped hundreds of students master complex concepts in
                  computer science and mathematics, from introductory programming to advanced discrete structures.
                </p>

                <div className="pt-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 transition-colors duration-300">
                    Technical Skills
                  </h3>
                  <div className="grid grid-cols-1 gap-4">
                    <div className="group">
                      <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2 transition-colors duration-300">
                        Languages
                      </h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm transition-colors duration-300">
                        Python, Java, C/C++, JavaScript, TypeScript, SQL, HTML/CSS, Dart, MATLAB, Fortran
                      </p>
                    </div>
                    <div className="group">
                      <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2 transition-colors duration-300">
                        Frameworks & Tools
                      </h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm transition-colors duration-300">
                        Django, Flask, Flutter, Node.js, AWS, Git, UNIX, Streamlit
                      </p>
                    </div>
                    <div className="group">
                      <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2 transition-colors duration-300">
                        Libraries & Databases
                      </h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm transition-colors duration-300">
                        Pandas, NumPy, Matplotlib, Scikit-Learn, PostgreSQL, MySQL, Oracle
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 bg-gray-50 dark:bg-gray-800 scroll-mt-24 transition-colors duration-300">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 transition-colors duration-300">
                Contact
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto transition-colors duration-300">
                Let's discuss research opportunities, software development projects, or potential collaborations
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-16">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 transition-colors duration-300">
                  Get in touch
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed transition-colors duration-300">
                  I'm always interested in discussing new research opportunities, software development projects, and
                  collaborations. Whether you're looking for a researcher, developer, or teaching assistant, I'd love to
                  hear from you.
                </p>

                <div className="space-y-4">
                  <div className="flex items-center space-x-3 group cursor-pointer">
                    <div className="w-10 h-10 bg-sky-400 dark:bg-sky-500 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                      <Mail className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-gray-700 dark:text-gray-300 transition-colors duration-300 group-hover:text-sky-600 dark:group-hover:text-sky-400">
                      dwivedi@ucdavis.edu
                    </span>
                  </div>
                  <div className="flex items-center space-x-3 group cursor-pointer">
                    <div className="w-10 h-10 bg-sky-400 dark:bg-sky-500 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                      <Phone className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-gray-700 dark:text-gray-300 transition-colors duration-300 group-hover:text-sky-600 dark:group-hover:text-sky-400">
                      520-910-8976
                    </span>
                  </div>
                  <div className="flex items-center space-x-3 group cursor-pointer">
                    <div className="w-10 h-10 bg-sky-400 dark:bg-sky-500 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                      <Linkedin className="w-5 h-5 text-white" />
                    </div>
                    <a
                      href="#"
                      className="text-gray-700 dark:text-gray-300 hover:text-sky-600 dark:hover:text-sky-400 transition-colors duration-300"
                    >
                      LinkedIn Profile
                    </a>
                  </div>
                  <div className="flex items-center space-x-3 group cursor-pointer">
                    <div className="w-10 h-10 bg-sky-400 dark:bg-sky-500 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                      <Github className="w-5 h-5 text-white" />
                    </div>
                    <a
                      href="#"
                      className="text-gray-700 dark:text-gray-300 hover:text-sky-600 dark:hover:text-sky-400 transition-colors duration-300"
                    >
                      GitHub Profile
                    </a>
                  </div>
                  <div className="flex items-center space-x-3 group cursor-pointer">
                    <div className="w-10 h-10 bg-sky-400 dark:bg-sky-500 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                      <MapPin className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-gray-700 dark:text-gray-300 transition-colors duration-300">Davis, CA</span>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-sm dark:shadow-2xl transition-all duration-300 hover:shadow-lg dark:hover:shadow-2xl">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-300"
                    >
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-sky-400 focus:border-transparent outline-none transition-all duration-300 ${
                        formErrors.name ? "border-red-500 dark:border-red-400" : "border-gray-200 dark:border-gray-600"
                      } dark:bg-gray-800 dark:text-white`}
                      placeholder="Your name"
                    />
                    {formErrors.name && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400">{formErrors.name}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-300"
                    >
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-sky-400 focus:border-transparent outline-none transition-all duration-300 ${
                        formErrors.email ? "border-red-500 dark:border-red-400" : "border-gray-200 dark:border-gray-600"
                      } dark:bg-gray-800 dark:text-white`}
                      placeholder="your@email.com"
                    />
                    {formErrors.email && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400">{formErrors.email}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-300"
                    >
                      Subject
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-lg focus:ring-2 focus:ring-sky-400 focus:border-transparent outline-none transition-all duration-300"
                    >
                      <option value="Research Collaboration">Research Collaboration</option>
                      <option value="Software Development">Software Development</option>
                      <option value="Teaching Opportunity">Teaching Opportunity</option>
                      <option value="General Inquiry">General Inquiry</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-300"
                    >
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-sky-400 focus:border-transparent outline-none transition-all duration-300 resize-none ${
                        formErrors.message
                          ? "border-red-500 dark:border-red-400"
                          : "border-gray-200 dark:border-gray-600"
                      } dark:bg-gray-800 dark:text-white`}
                      placeholder="Tell me about your project or opportunity..."
                    ></textarea>
                    {formErrors.message && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400">{formErrors.message}</p>
                    )}
                  </div>

                  {submitStatus === "success" && (
                    <div className="p-4 bg-green-100 dark:bg-green-900 border border-green-400 dark:border-green-600 rounded-lg">
                      <p className="text-green-700 dark:text-green-300 text-sm">
                        ✅ Message sent successfully! I'll get back to you soon.
                      </p>
                    </div>
                  )}

                  {submitStatus === "error" && (
                    <div className="p-4 bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-600 rounded-lg">
                      <p className="text-red-700 dark:text-red-300 text-sm">
                        ❌ Failed to send message. Please try again or contact me directly at dwivedi@ucdavis.edu
                      </p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-3 px-6 rounded-lg font-medium transform transition-all duration-300 ${
                      isSubmitting
                        ? "bg-gray-400 dark:bg-gray-600 cursor-not-allowed"
                        : "bg-gray-900 dark:bg-sky-600 hover:bg-gray-800 dark:hover:bg-sky-700 hover:scale-105 hover:shadow-lg"
                    } text-white`}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center">
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      "Send Message"
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-8 border-t border-gray-200 dark:border-gray-700 transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-gray-600 dark:text-gray-400 transition-colors duration-300">
            © 2024 Aman Dwivedi. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
