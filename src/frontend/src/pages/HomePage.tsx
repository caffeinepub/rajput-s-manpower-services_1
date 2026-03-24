import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Award,
  Briefcase,
  Building2,
  ChevronRight,
  ClipboardList,
  Loader2,
  Menu,
  MessageCircle,
  Phone,
  Star,
  TrendingUp,
  UserCheck,
  Users,
  X,
} from "lucide-react";
import { motion } from "motion/react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { useSubmitQuery } from "../hooks/useQueries";

const WHATSAPP_NUMBER = "918091318061";

const services = [
  {
    icon: Users,
    title: "Industrial Staffing",
    desc: "Skilled and semi-skilled workers for factories, plants, and industrial units. We match the right talent to your operational needs.",
  },
  {
    icon: Briefcase,
    title: "Contract Workers",
    desc: "Flexible contractual workforce solutions for project-based requirements, seasonal demands, and short-term placements.",
  },
  {
    icon: UserCheck,
    title: "Permanent Placement",
    desc: "End-to-end recruitment for full-time positions. We source, screen, and place qualified candidates across all levels.",
  },
  {
    icon: ClipboardList,
    title: "On-Site Management",
    desc: "Dedicated supervisors and team leads deployed at your facility to manage workforce productivity and compliance.",
  },
];

const testimonials = [
  {
    name: "Arvind Sharma",
    company: "ABC Manufacturing Pvt Ltd",
    text: "Rajput's Manpower Services has been our go-to partner for over 3 years. Their workers are skilled, punctual, and professional. Highly recommend!",
    rating: 5,
  },
  {
    name: "Priya Mehta",
    company: "Horizon Logistics",
    text: "We needed 50 workers on short notice and they delivered within 48 hours. Exceptional responsiveness and quality of workforce.",
    rating: 5,
  },
  {
    name: "Rajan Patel",
    company: "BuildRight Constructions",
    text: "Their on-site management team is outstanding. They handle everything from attendance to compliance, letting us focus on our core business.",
    rating: 5,
  },
];

const workPhotos = [
  {
    src: "/assets/generated/work-construction.dim_800x500.jpg",
    label: "Industrial Staffing",
  },
  {
    src: "/assets/generated/work-recruitment.dim_800x500.jpg",
    label: "Recruitment & Placement",
  },
  {
    src: "/assets/generated/work-industrial.dim_800x500.jpg",
    label: "Industrial Operations",
  },
  {
    src: "/assets/generated/work-security.dim_800x500.jpg",
    label: "Security Services",
  },
];

export default function HomePage() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [testimonialIdx, setTestimonialIdx] = useState(0);
  const formRef = useRef<HTMLElement>(null);
  const submitQuery = useSubmitQuery();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    company: "",
    workersNeeded: "",
    typeOfWork: "",
    message: "",
  });

  function scrollToForm() {
    formRef.current?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (
      !form.name ||
      !form.phone ||
      !form.company ||
      !form.workersNeeded ||
      !form.typeOfWork
    ) {
      toast.error("Please fill all required fields.");
      return;
    }
    try {
      await submitQuery.mutateAsync({
        name: form.name,
        phone: form.phone,
        company: form.company,
        workersNeeded: BigInt(form.workersNeeded),
        typeOfWork: form.typeOfWork,
        message: form.message,
      });
      toast.success("Quote request submitted! We'll contact you shortly.");
      setForm({
        name: "",
        phone: "",
        company: "",
        workersNeeded: "",
        typeOfWork: "",
        message: "",
      });
    } catch {
      toast.error("Failed to submit. Please try again.");
    }
  }

  const navLinks = [
    { label: "Home", href: "#top" },
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <div id="top" className="min-h-screen bg-background font-sans">
      {/* ─── Top Utility Bar ─── */}
      <div className="bg-navy-700 text-white/70 text-xs py-2">
        <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
          <span>Professional Manpower Solutions Across India</span>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:text-white transition-colors"
          >
            <MessageCircle className="w-3 h-3" />
            WhatsApp Us
          </a>
        </div>
      </div>

      {/* ─── Header ─── */}
      <header className="sticky top-0 z-50 bg-white border-b border-border shadow-xs">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded bg-navy-700 flex items-center justify-center">
              <Users className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="font-extrabold text-sm leading-tight text-navy-700 tracking-wide uppercase">
                Rajput's Manpower
              </div>
              <div className="text-[10px] text-muted-foreground tracking-widest uppercase">
                Services
              </div>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((l) => (
              <a
                key={l.label}
                href={l.href}
                data-ocid={`nav.${l.label.toLowerCase()}.link`}
                className="text-sm font-medium text-foreground hover:text-orange-500 transition-colors"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <Button
              onClick={scrollToForm}
              data-ocid="header.request_quote.button"
              className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-5"
            >
              Request a Quote
            </Button>
            <Link to="/admin">
              <Button
                variant="outline"
                size="sm"
                data-ocid="header.admin.link"
                className="text-xs"
              >
                Admin
              </Button>
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            type="button"
            className="md:hidden p-2"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
            data-ocid="header.mobile_menu.toggle"
          >
            {mobileOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden bg-white border-t border-border px-4 py-4 flex flex-col gap-3">
            {navLinks.map((l) => (
              <a
                key={l.label}
                href={l.href}
                onClick={() => setMobileOpen(false)}
                className="text-sm font-medium py-2 border-b border-border last:border-0"
              >
                {l.label}
              </a>
            ))}
            <Button
              onClick={scrollToForm}
              className="bg-orange-500 hover:bg-orange-600 text-white w-full mt-2"
            >
              Request a Quote
            </Button>
          </div>
        )}
      </header>

      {/* ─── RMS Company Banner ─── */}
      <div className="w-full overflow-hidden relative">
        <img
          src="/assets/generated/rms-banner.dim_1200x400.jpg"
          alt="Rajput's Manpower Services"
          className="w-full object-cover max-h-[180px] md:max-h-[300px]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
      </div>

      <main>
        {/* ─── Hero ─── */}
        <section
          className="relative overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, #0B2340 0%, #0d3060 40%, #1a4070 100%)",
            minHeight: "580px",
          }}
        >
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "repeating-linear-gradient(45deg, transparent, transparent 40px, rgba(255,255,255,0.05) 40px, rgba(255,255,255,0.05) 80px)",
            }}
          />
          <div className="absolute right-0 top-0 w-1/2 h-full opacity-10">
            <div
              className="w-full h-full"
              style={{
                background:
                  "radial-gradient(ellipse at 70% 50%, rgba(224,106,31,0.4) 0%, transparent 70%)",
              }}
            />
          </div>

          <div className="relative max-w-6xl mx-auto px-4 py-24 md:py-32">
            <div className="max-w-xl">
              <motion.div
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
              >
                <span className="inline-block bg-orange-500/20 text-orange-400 text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-5">
                  Trusted Since 2010
                </span>
                <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-5">
                  Your Trusted Partner in{" "}
                  <span className="text-orange-400">Workforce Solutions</span>
                </h1>
                <p className="text-white/75 text-base md:text-lg leading-relaxed mb-8">
                  We provide skilled, semi-skilled, and unskilled manpower
                  across industries — construction, manufacturing, logistics,
                  security, and more. Reliable, fast, and compliant staffing
                  solutions tailored to your business needs.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button
                    onClick={scrollToForm}
                    data-ocid="hero.explore.primary_button"
                    className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 h-auto text-sm"
                  >
                    Explore Our Staffing Solutions
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                  <Button
                    onClick={scrollToForm}
                    variant="outline"
                    data-ocid="hero.consultation.secondary_button"
                    className="border-white/40 text-white hover:bg-white/10 font-medium px-6 py-3 h-auto text-sm bg-transparent"
                  >
                    Request a Workforce Consultation
                  </Button>
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mt-16 grid grid-cols-3 gap-4 max-w-lg"
            >
              {[
                { val: "14+", label: "Years Experience" },
                { val: "500+", label: "Clients Served" },
                { val: "10K+", label: "Workers Placed" },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <div className="text-2xl md:text-3xl font-extrabold text-orange-400">
                    {s.val}
                  </div>
                  <div className="text-white/60 text-xs mt-1">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ─── Services ─── */}
        <section id="services" className="py-20 bg-secondary">
          <div className="max-w-6xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <span className="text-orange-500 text-xs font-semibold uppercase tracking-widest">
                What We Offer
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-navy-700 mt-2">
                Our Expertise
              </h2>
              <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
                Comprehensive manpower solutions designed to keep your
                operations running smoothly.
              </p>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.map((s, i) => (
                <motion.div
                  key={s.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="bg-white rounded-lg p-6 shadow-card border border-border hover:border-orange-300 transition-all group"
                >
                  <div className="w-12 h-12 rounded-lg bg-navy-700/10 flex items-center justify-center mb-4 group-hover:bg-orange-500/10 transition-colors">
                    <s.icon className="w-6 h-6 text-navy-700 group-hover:text-orange-500 transition-colors" />
                  </div>
                  <h3 className="font-bold text-navy-700 mb-2">{s.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {s.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── About ─── */}
        <section id="about" className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <span className="text-orange-500 text-xs font-semibold uppercase tracking-widest">
                  Who We Are
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-navy-700 mt-2 mb-4">
                  Rajput's Manpower Services
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Founded in 2010, Rajput's Manpower Services has grown into one
                  of India's most trusted staffing companies. We specialize in
                  sourcing, vetting, and deploying skilled workers across
                  diverse industries nationwide.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Our mission is to bridge the gap between businesses and talent
                  — ensuring every client gets the right workforce at the right
                  time. We handle all compliance, documentation, and on-site
                  coordination so you can focus on what matters most.
                </p>
                <div className="flex flex-wrap gap-3">
                  {[
                    "ISO Certified",
                    "PF & ESI Compliant",
                    "Pan-India Network",
                    "24/7 Support",
                  ].map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 bg-secondary text-navy-700 text-xs font-semibold px-3 py-1.5 rounded-full"
                    >
                      <ChevronRight className="w-3 h-3 text-orange-500" />
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="grid grid-cols-2 gap-4"
              >
                {[
                  {
                    icon: Award,
                    val: "14+",
                    label: "Years of Experience",
                    color: "bg-orange-500",
                  },
                  {
                    icon: Building2,
                    val: "500+",
                    label: "Happy Clients",
                    color: "bg-navy-700",
                  },
                  {
                    icon: Users,
                    val: "10,000+",
                    label: "Workers Placed",
                    color: "bg-navy-700",
                  },
                  {
                    icon: TrendingUp,
                    val: "98%",
                    label: "Client Retention",
                    color: "bg-orange-500",
                  },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="bg-secondary rounded-lg p-5 flex flex-col items-start gap-3"
                  >
                    <div
                      className={`w-10 h-10 rounded-lg ${stat.color} flex items-center justify-center`}
                    >
                      <stat.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-2xl font-extrabold text-navy-700">
                        {stat.val}
                      </div>
                      <div className="text-xs text-muted-foreground mt-0.5">
                        {stat.label}
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* ─── Our Work ─── */}
        <section className="py-20 bg-white border-t border-border">
          <div className="max-w-6xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <span className="text-orange-500 text-xs font-semibold uppercase tracking-widest">
                Gallery
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-navy-700 mt-2">
                Our Work
              </h2>
              <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
                See Our Expertise In Action
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {workPhotos.map((photo, i) => (
                <motion.div
                  key={photo.label}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  data-ocid={`ourwork.item.${i + 1}`}
                  className="relative rounded-xl overflow-hidden aspect-[4/3] group cursor-pointer"
                >
                  <img
                    src={photo.src}
                    alt={photo.label}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <span className="text-white font-bold text-sm leading-tight drop-shadow">
                      {photo.label}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Testimonials ─── */}
        <section className="py-20 bg-navy-700">
          <div className="max-w-6xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <span className="text-orange-400 text-xs font-semibold uppercase tracking-widest">
                Testimonials
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-white mt-2">
                What Our Clients Say
              </h2>
            </motion.div>

            <div className="relative">
              <div className="grid md:grid-cols-3 gap-6">
                {testimonials.map((t, i) => (
                  <motion.div
                    key={t.name}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15 }}
                    className={`bg-white/10 backdrop-blur rounded-lg p-6 border transition-all cursor-pointer ${
                      testimonialIdx === i
                        ? "border-orange-400 ring-1 ring-orange-400/40"
                        : "border-white/10"
                    }`}
                    onClick={() => setTestimonialIdx(i)}
                  >
                    <div className="flex gap-1 mb-3">
                      {[1, 2, 3, 4, 5].slice(0, t.rating).map((n) => (
                        <Star
                          key={n}
                          className="w-4 h-4 fill-orange-400 text-orange-400"
                        />
                      ))}
                    </div>
                    <p className="text-white/85 text-sm leading-relaxed mb-4">
                      "{t.text}"
                    </p>
                    <div>
                      <div className="font-semibold text-white text-sm">
                        {t.name}
                      </div>
                      <div className="text-white/50 text-xs">{t.company}</div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="flex justify-center gap-2 mt-6">
                {testimonials.map((t, i) => (
                  <button
                    type="button"
                    key={`dot-${t.name}`}
                    onClick={() => setTestimonialIdx(i)}
                    data-ocid={`testimonials.pagination.${i + 1}`}
                    className={`h-2 rounded-full transition-all ${
                      testimonialIdx === i
                        ? "bg-orange-400 w-5"
                        : "bg-white/30 w-2"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ─── Contact / Quote Form ─── */}
        <section
          id="contact"
          ref={formRef as React.RefObject<HTMLDivElement>}
          className="py-20 bg-secondary"
        >
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-start">
              <motion.div
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <span className="text-orange-500 text-xs font-semibold uppercase tracking-widest">
                  Get In Touch
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-navy-700 mt-2 mb-4">
                  Partner With Us
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-8">
                  Looking for reliable manpower solutions? Reach out to us —
                  we'll respond within 24 hours with a customized workforce plan
                  for your business.
                </p>

                <div className="space-y-5">
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-lg bg-navy-700 flex items-center justify-center shrink-0">
                      <Phone className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground uppercase tracking-wide">
                        Call Us
                      </div>
                      <div className="font-semibold text-navy-700">
                        +91 80913 18061
                      </div>
                      <div className="text-xs text-muted-foreground" />
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-lg bg-green-600 flex items-center justify-center shrink-0">
                      <MessageCircle className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground uppercase tracking-wide">
                        WhatsApp
                      </div>
                      <a
                        href={`https://wa.me/${WHATSAPP_NUMBER}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-ocid="contact.whatsapp.button"
                        className="font-semibold text-navy-700 hover:text-green-600 transition-colors"
                      >
                        Chat on WhatsApp →
                      </a>
                    </div>
                  </div>
                </div>

                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hello%2C%20I%20am%20interested%20in%20your%20manpower%20services.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-ocid="contact.whatsapp_cta.button"
                  className="mt-8 inline-flex items-center gap-3 bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
                >
                  <MessageCircle className="w-5 h-5" />
                  Send WhatsApp Message
                </a>

                <div className="mt-10 p-5 bg-white rounded-lg border border-border">
                  <h4 className="font-bold text-navy-700 mb-3">
                    Industries We Serve
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      "Construction",
                      "Manufacturing",
                      "Logistics",
                      "Security",
                      "Housekeeping",
                      "Warehousing",
                    ].map((ind) => (
                      <div
                        key={ind}
                        className="flex items-center gap-2 text-sm text-muted-foreground"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                        {ind}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="bg-white rounded-xl shadow-card border border-border p-8">
                  <h3 className="text-xl font-bold text-navy-700 mb-1">
                    Request A Workforce Quote
                  </h3>
                  <p className="text-muted-foreground text-sm mb-6">
                    Fill the form below and we'll get back to you within 24
                    hours.
                  </p>

                  <form
                    onSubmit={handleSubmit}
                    className="space-y-4"
                    data-ocid="quote.form"
                  >
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label
                          htmlFor="name"
                          className="text-xs font-semibold text-navy-700 uppercase tracking-wide"
                        >
                          Full Name *
                        </Label>
                        <Input
                          id="name"
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          placeholder="Your full name"
                          required
                          data-ocid="quote.name.input"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label
                          htmlFor="phone"
                          className="text-xs font-semibold text-navy-700 uppercase tracking-wide"
                        >
                          Phone Number *
                        </Label>
                        <Input
                          id="phone"
                          name="phone"
                          value={form.phone}
                          onChange={handleChange}
                          placeholder="+91 XXXXX XXXXX"
                          required
                          data-ocid="quote.phone.input"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <Label
                        htmlFor="company"
                        className="text-xs font-semibold text-navy-700 uppercase tracking-wide"
                      >
                        Company Name *
                      </Label>
                      <Input
                        id="company"
                        name="company"
                        value={form.company}
                        onChange={handleChange}
                        placeholder="Your company or organization"
                        required
                        data-ocid="quote.company.input"
                      />
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label
                          htmlFor="workersNeeded"
                          className="text-xs font-semibold text-navy-700 uppercase tracking-wide"
                        >
                          No. of Workers *
                        </Label>
                        <Input
                          id="workersNeeded"
                          name="workersNeeded"
                          type="number"
                          min="1"
                          value={form.workersNeeded}
                          onChange={handleChange}
                          placeholder="e.g. 25"
                          required
                          data-ocid="quote.workers.input"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-xs font-semibold text-navy-700 uppercase tracking-wide">
                          Type of Work *
                        </Label>
                        <Select
                          value={form.typeOfWork}
                          onValueChange={(v) =>
                            setForm((prev) => ({ ...prev, typeOfWork: v }))
                          }
                        >
                          <SelectTrigger data-ocid="quote.work_type.select">
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            {[
                              "Construction",
                              "Manufacturing",
                              "Logistics",
                              "Security",
                              "Housekeeping",
                              "Other",
                            ].map((t) => (
                              <SelectItem key={t} value={t}>
                                {t}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <Label
                        htmlFor="message"
                        className="text-xs font-semibold text-navy-700 uppercase tracking-wide"
                      >
                        Message / Details
                      </Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        placeholder="Describe your requirements, location, duration, etc."
                        rows={4}
                        data-ocid="quote.message.textarea"
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={submitQuery.isPending}
                      data-ocid="quote.submit.button"
                      className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold h-12 text-sm"
                    >
                      {submitQuery.isPending ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Quote Request{" "}
                          <ArrowRight className="ml-2 w-4 h-4" />
                        </>
                      )}
                    </Button>
                  </form>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      {/* ─── Footer ─── */}
      <footer className="bg-navy-700 text-white">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded bg-orange-500 flex items-center justify-center">
                  <Users className="w-4 h-4 text-white" />
                </div>
                <span className="font-extrabold uppercase tracking-wide text-sm">
                  Rajput's Manpower Services
                </span>
              </div>
              <p className="text-white/60 text-sm leading-relaxed">
                Bridging the gap between businesses and talent across India.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-white text-sm mb-4 uppercase tracking-widest">
                Contact Us
              </h4>
              <div className="space-y-2 text-sm text-white/60">
                <div className="flex items-center gap-2">
                  <MessageCircle className="w-4 h-4 text-green-400" />
                  <a
                    href={`https://wa.me/${WHATSAPP_NUMBER}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    WhatsApp Chat
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 pt-6 text-xs text-white/40">
            <span>
              © {new Date().getFullYear()} Rajput's Manpower Services. All
              rights reserved.
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
