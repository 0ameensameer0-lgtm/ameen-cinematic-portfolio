"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import Lenis from "lenis";
import * as Dialog from "@radix-ui/react-dialog";
import {
  ArrowRight,
  Award,
  BadgeCheck,
  BriefcaseBusiness,
  ChevronDown,
  Cpu,
  Download,
  ExternalLink,
  FolderKanban,
  Github,
  Globe,
  House,
  Languages,
  Linkedin,
  Mail,
  MessageCircle,
  MoonStar,
  Phone,
  Play,
  Route,
  SunMedium,
  UserRound,
  X,
} from "lucide-react";
import {
  certificates,
  contactLinks,
  focusAreas,
  heroSignals,
  labels,
  milestones,
  profile,
  projects,
  resumeTimeline,
  services,
  skillGroups,
  type Language,
  type Project,
} from "@/data/site-content";
import { useSite } from "@/components/providers/site-provider";
import { HeroScene } from "@/components/three/hero-scene";
import { cn } from "@/lib/utils";

type CursorState = { x: number; y: number };

const navTargets = ["hero", "about", "skills", "services", "certifications", "projects", "resume", "contact"] as const;
const navIcons = [House, UserRound, Cpu, BriefcaseBusiness, Award, FolderKanban, Route, Mail] as const;

export function PortfolioExperience() {
  const { language, setLanguage, theme, setTheme, playSound } = useSite();
  const [loadingDone, setLoadingDone] = useState(false);
  const [loadingValue, setLoadingValue] = useState(0);
  const [activeNav, setActiveNav] = useState<(typeof navTargets)[number]>("hero");
  const [typedIndex, setTypedIndex] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [projectFilter, setProjectFilter] = useState("all");
  const [cursor, setCursor] = useState<CursorState>({ x: 0, y: 0 });
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [formMessage, setFormMessage] = useState("");
  const sceneRefs = useRef<Record<string, HTMLElement | null>>({});
  const lenisRef = useRef<Lenis | null>(null);

  const copy = labels[language];
  const isArabic = language === "ar";
  const navLabels = useMemo(
    () => [
      copy.nav[0],
      copy.nav[1],
      copy.nav[2],
      copy.nav[3],
      copy.certifications,
      copy.nav[4],
      copy.nav[5],
      copy.nav[6],
    ],
    [copy],
  );

  const filteredProjects = useMemo(() => {
    return projectFilter === "all"
      ? projects
      : projects.filter((project) => project.category === projectFilter);
  }, [projectFilter]);

  const skillNodes = useMemo(() => {
    return skillGroups.flatMap((group, groupIndex) =>
      group.skills.map((skill, skillIndex) => ({
        ...skill,
        group: group.title[language],
        icon: group.icon,
        angle:
          ((groupIndex * 7 + skillIndex * 11) / (skillGroups.length * 8)) * Math.PI * 2,
      })),
    );
  }, [language]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (prefersReducedMotion.matches) {
      setLoadingValue(100);
      setLoadingDone(true);
      return;
    }

    let progress = 0;
    const interval = window.setInterval(() => {
      progress += Math.random() * 16;
      const next = Math.min(100, progress);
      setLoadingValue(Math.round(next));
      if (next >= 100) {
        window.clearInterval(interval);
        window.setTimeout(() => setLoadingDone(true), 350);
      }
    }, 90);

    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    const lines = profile.heroLines.map((entry) => entry[language]);
    let timeoutId = 0;
    let charIndex = 0;
    let deleting = false;

    const tick = () => {
      const currentLine = lines[typedIndex % lines.length];
      if (!deleting) {
        charIndex += 1;
        setTypedText(currentLine.slice(0, charIndex));
        if (charIndex === currentLine.length) {
          deleting = true;
          timeoutId = window.setTimeout(tick, 1100);
          return;
        }
      } else {
        charIndex -= 1;
        setTypedText(currentLine.slice(0, charIndex));
        if (charIndex === 0) {
          deleting = false;
          setTypedIndex((prev) => (prev + 1) % lines.length);
        }
      }

      timeoutId = window.setTimeout(tick, deleting ? 35 : 60);
    };

    timeoutId = window.setTimeout(tick, 380);
    return () => window.clearTimeout(timeoutId);
  }, [language, typedIndex]);

  useEffect(() => {
    const lenis = new Lenis({
      smoothWheel: true,
      duration: 1.1,
    });
    lenisRef.current = lenis;

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

    gsap.utils.toArray<HTMLElement>("[data-scene]").forEach((scene) => {
      gsap.fromTo(
        scene.querySelectorAll("[data-reveal]"),
        {
          y: 40,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          stagger: 0.08,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: scene,
            start: "top 75%",
          },
        },
      );
    });

    return () => {
      lenis.destroy();
      lenisRef.current = null;
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  useEffect(() => {
    const updateActiveNav = () => {
      const readingLine = window.innerHeight * 0.32;
      const currentSection = navTargets.find((target) => {
        const element = document.getElementById(target);
        if (!element) return false;

        const { top, bottom } = element.getBoundingClientRect();
        return top <= readingLine && bottom > readingLine;
      });

      if (currentSection) {
        setActiveNav(currentSection);
      }
    };

    updateActiveNav();
    window.addEventListener("scroll", updateActiveNav, { passive: true });
    window.addEventListener("resize", updateActiveNav);

    return () => {
      window.removeEventListener("scroll", updateActiveNav);
      window.removeEventListener("resize", updateActiveNav);
    };
  }, []);

  useEffect(() => {
    const handleMove = (event: MouseEvent) => {
      setCursor({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  const handleContactSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    playSound("click");
    setFormMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      setFormState({ name: "", email: "", message: "" });
      setFormMessage(copy.formSuccess);
    } catch {
      setFormMessage(copy.formError);
    }
  };

  const scrollToSection = (id: string) => {
    if (navTargets.includes(id as (typeof navTargets)[number])) {
      setActiveNav(id as (typeof navTargets)[number]);
    }
    const target = document.getElementById(id);
    if (target && lenisRef.current) {
      lenisRef.current.scrollTo(target, {
        offset: -92,
        duration: 0.85,
        lock: true,
        easing: (value) => 1 - Math.pow(1 - value, 4),
      });
    } else {
      target?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    playSound("click");
  };

  return (
    <div
      dir={isArabic ? "rtl" : "ltr"}
      className={cn(
        "relative min-h-screen overflow-x-hidden selection:bg-cyan-400/20 selection:text-white",
        theme === "light" && "light",
      )}
    >
      <AnimatePresence>
        {!loadingDone && (
          <motion.div
            className="app-loader fixed inset-0 z-[120] flex flex-col items-center justify-center bg-[#020817]"
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="mb-8 flex h-24 w-24 items-center justify-center rounded-[2rem] border border-white/10 bg-white/5 p-2 shadow-[0_0_60px_rgba(77,216,255,0.22)]"
              animate={{ y: [0, -4, 0], scale: [1, 1.03, 1] }}
              transition={{ duration: 2.8, ease: "easeInOut", repeat: Number.POSITIVE_INFINITY }}
            >
              <Image
                src="/brand-logo-2026.png"
                alt="Ameen Logo"
                width={84}
                height={58}
                className="h-auto w-[4.25rem] object-contain"
                priority
              />
            </motion.div>
            <p className="mb-3 font-[var(--font-display)] text-sm uppercase tracking-[0.38em] text-cyan-200/75">
              {copy.loading}
            </p>
            <div className="glass-panel h-2 w-[min(22rem,78vw)] overflow-hidden rounded-full">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-emerald-300 via-teal-300 to-sky-300"
                style={{ width: `${loadingValue}%` }}
              />
            </div>
            <span className="mt-4 font-[var(--font-mono)] text-xs text-white/50">{loadingValue}%</span>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className="pointer-events-none fixed z-[110] hidden h-8 w-8 rounded-full border border-cyan-300/40 bg-cyan-300/8 mix-blend-screen md:block"
        animate={{ x: cursor.x - 16, y: cursor.y - 16 }}
        transition={{ type: "spring", stiffness: 260, damping: 22, mass: 0.25 }}
      />

      <div className="pointer-events-none fixed inset-0 z-0 opacity-60">
        <div className="grid-bg absolute inset-0" />
        <div className="absolute left-[-6rem] top-16 h-72 w-72 rounded-full bg-cyan-400/12 blur-3xl" />
        <div className="absolute right-[-5rem] top-40 h-72 w-72 rounded-full bg-violet-500/14 blur-3xl" />
        <div className="absolute bottom-12 left-1/3 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl" />
      </div>

      <div className="fixed left-0 right-0 top-0 z-[90] h-1 bg-white/5">
        <motion.div
          className="h-full bg-gradient-to-r from-emerald-300 via-teal-300 to-sky-300"
          style={{ scaleX: 0, transformOrigin: "0% 50%" }}
          animate={{ scaleX: loadingDone ? 1 : 0.12 }}
          transition={{ duration: 1.5 }}
        />
      </div>

      <header className={cn("fixed inset-x-0 top-0 z-[95] px-4 md:px-8", isArabic ? "py-4" : "py-2.5")}>
          <div className={cn(
            "glass-panel-strong mx-auto flex w-full max-w-7xl items-center justify-between rounded-full shadow-[0_18px_50px_rgba(0,0,0,0.25)]",
            isArabic ? "gap-4 px-4 py-3 md:px-6" : "gap-3 px-3 py-2 md:px-4",
          )}>
          <button
            className={cn("group flex items-center", isArabic ? "gap-3" : "gap-2")}
            onClick={() => scrollToSection("hero")}
            onMouseEnter={() => playSound("hover")}
          >
            <span className={cn(
              "flex items-center justify-center rounded-2xl border border-cyan-100/30 bg-cyan-100/15 p-1",
              isArabic ? "h-11 w-11" : "h-9 w-9",
            )}>
              <Image
                src="/brand-logo-2026.png"
                alt="Ameen Logo"
                width={34}
                height={24}
                className="h-auto w-full max-w-[2.3rem] object-contain"
                priority
              />
            </span>
            <span className={cn("hidden md:block", isArabic ? "text-right" : "text-left")}>
              <strong className={cn("block", isArabic ? "text-sm" : "text-[13px] leading-4")}>{profile.name[language]}</strong>
              <span className={cn("text-muted", isArabic ? "text-xs" : "text-[11px] leading-4")}>{profile.role[language]}</span>
            </span>
          </button>

          <nav className={cn("hidden items-center lg:flex", isArabic ? "gap-1" : "gap-1.5")} aria-label={isArabic ? "التنقل الرئيسي" : "Main navigation"}>
            {navTargets.map((sectionId, index) => {
              const item = navLabels[index];
              const Icon = navIcons[index];
              return (
                <button
                  key={sectionId}
                  onClick={() => scrollToSection(sectionId)}
                  onMouseEnter={() => playSound("hover")}
                  className={cn(
                    "portfolio-nav-item group relative flex min-w-[4.25rem] flex-col items-center justify-center gap-1 rounded-xl px-2 py-2 text-center",
                    isArabic ? "text-[11px]" : "text-[10px]",
                    activeNav === sectionId && "is-active",
                  )}
                  aria-current={activeNav === sectionId ? "page" : undefined}
                >
                  <Icon className="portfolio-nav-icon h-4 w-4" strokeWidth={1.8} />
                  <span className="portfolio-nav-label leading-none">{item}</span>
                  {activeNav === sectionId && <motion.span layoutId="active-navigation-indicator" className="portfolio-nav-indicator" transition={{ type: "spring", stiffness: 420, damping: 32, mass: 0.55 }} />}
                </button>
              );
            })}
          </nav>

          <div className={cn("flex items-center justify-end gap-2", isArabic ? "flex-wrap" : "flex-nowrap")}>
            <ControlPill
              icon={<Languages className="h-4 w-4" />}
              label={copy.language}
              value={language === "ar" ? "AR" : "EN"}
              compact={!isArabic}
              onClick={() => {
                setLanguage(language === "ar" ? "en" : "ar");
                playSound("click");
              }}
            />
            <SwitchPill
              label={copy.theme}
              checked={theme === "light"}
              compact={!isArabic}
              onCheckedChange={(checked) => {
                setTheme(checked ? "light" : "dark");
                playSound("click");
              }}
            />
          </div>
        </div>
      </header>

      <aside className="fixed right-3 top-1/2 z-[92] hidden -translate-y-1/2 flex-col gap-3 xl:flex">
        {navTargets.map((target) => (
          <button
            key={target}
            aria-label={target}
            className="group flex items-center gap-3"
            onClick={() => scrollToSection(target)}
            onMouseEnter={() => playSound("hover")}
          >
            <span
              className={cn(
                "h-2.5 w-2.5 rounded-full border transition-all",
                activeNav === target
                  ? "scale-125 border-cyan-300 bg-cyan-300 shadow-[0_0_14px_rgba(77,216,255,0.75)]"
                  : "border-white/30 bg-white/10 group-hover:border-cyan-200/50",
              )}
            />
          </button>
        ))}
      </aside>

      <main className="relative z-10">
        <section id="hero" data-scene className="relative min-h-screen px-4 pb-16 pt-28 md:px-8">
          <div className="mx-auto grid min-h-[calc(100vh-8rem)] max-w-7xl gap-8 lg:grid-cols-[1.08fr_0.92fr]">
            <div className="flex flex-col justify-between gap-8">
              <div className="space-y-6">
                <div data-reveal className="glass-panel inline-flex items-center gap-3 rounded-full px-5 py-3 text-xs uppercase tracking-[0.32em] text-cyan-200/80">
                  <Play className="h-3.5 w-3.5" />
                  {copy.heroTag}
                </div>

                <div data-reveal className="glass-panel overflow-hidden rounded-[2rem] p-5 md:p-7">
                  <div className="mb-5 flex flex-wrap gap-2 font-[var(--font-mono)] text-xs text-cyan-200/80">
                    {copy.introBoot.map((line) => (
                      <span key={line} className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
                        {line}
                      </span>
                    ))}
                  </div>

                  <div className="mb-6 inline-flex rounded-2xl border border-cyan-300/20 bg-cyan-300/10 p-2">
                    <Image
                      src="/brand-logo-2026.png"
                      alt="Ameen Logo"
                      width={120}
                      height={82}
                      className="h-auto w-20 object-contain md:w-24"
                      priority
                    />
                  </div>

                  <h1 className="font-[var(--font-display)] text-[clamp(2.6rem,6vw,6rem)] leading-[0.9] tracking-[0.03em]">
                    {isArabic ? profile.name.ar : profile.name.en}
                  </h1>

                  <p className="mt-4 max-w-2xl text-lg text-muted">{isArabic ? profile.subtitle.ar : profile.subtitle.en}</p>

                  <div className="mt-6 flex items-center gap-2 font-[var(--font-mono)] text-sm text-cyan-200">
                    <span className="text-white/40">&gt;</span>
                    <span>{typedText}</span>
                    <span className="h-5 w-px animate-pulse bg-cyan-300" />
                  </div>

                  <p className="mt-6 max-w-2xl text-base leading-8 text-white/75 md:text-lg">{copy.heroLead}</p>

                  <div className="mt-8 flex flex-wrap gap-3">
                    <PrimaryAction onClick={() => scrollToSection("projects")} icon={<ArrowRight className="h-4 w-4" />} text={copy.viewProjects} />
                    <SecondaryAction onClick={() => scrollToSection("contact")} icon={<Mail className="h-4 w-4" />} text={copy.contactMe} />
                    <LinkButton href={language === "ar" ? "/resume-ameen-al-yosofi-ar.pdf" : "/resume-ameen-al-yosofi-en.pdf"} download icon={<Download className="h-4 w-4" />} text={copy.downloadResume} />
                  </div>
                </div>

                <div data-reveal className="grid gap-4 md:grid-cols-3">
                  {heroSignals.map((signal) => (
                    <StatCard
                      key={signal.label}
                      label={signal.label}
                      title={signal.title[language]}
                      body={signal.body[language]}
                    />
                  ))}
                </div>
              </div>

              <button
                data-reveal
                className="inline-flex w-fit items-center gap-3 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm text-white/70 transition hover:text-white"
                onClick={() => scrollToSection("about")}
                onMouseEnter={() => playSound("hover")}
              >
                <ChevronDown className="h-4 w-4 animate-bounce" />
                {copy.scrollToExplore}
              </button>
            </div>

            <div data-reveal className="glass-panel section-edge relative self-start overflow-hidden rounded-[2.25rem] p-4 shadow-[0_30px_90px_rgba(0,0,0,0.35)] lg:mt-12">
              <div className="relative h-[32rem] overflow-hidden rounded-[1.8rem] bg-[#030915] lg:h-[53rem]">
                <HeroScene />
              </div>
              <div className="pointer-events-none absolute inset-x-10 bottom-8 hidden gap-3 md:grid md:grid-cols-2">
                <SceneBadge label={isArabic ? "الملف 01" : "Profile 01"} title={isArabic ? "الخبرة التقنية" : "Technical Expertise"} />
                <SceneBadge label={isArabic ? "الملف 02" : "Profile 02"} title={isArabic ? "حلول عملية" : "Practical Solutions"} />
              </div>
            </div>
          </div>
        </section>

        <section id="about" data-scene className="px-4 py-16 md:px-8">
          <SectionShell title={copy.aboutTitle} kicker="PROFILE OVERVIEW" description={copy.aboutBody} language={language}>
            <div className="grid gap-6 lg:grid-cols-[1fr_1.15fr]">
              <motion.div data-reveal className="glass-panel section-edge rounded-[2rem] p-6 shadow-[0_18px_60px_rgba(0,0,0,0.25)]">
                <div className="relative mx-auto mb-6 aspect-[0.887] w-full max-w-[25rem] overflow-hidden rounded-[1.5rem] border border-white/8 bg-gradient-to-br from-cyan-300/10 via-blue-500/10 to-violet-500/12 p-4">
                  <Image
                    src="/ameen-portrait-new.png"
                    alt={profile.name.en}
                    width={900}
                    height={900}
                    className="h-full w-full origin-bottom scale-[1.15] rounded-[1.2rem] object-contain object-bottom"
                  />
                </div>
                <p className="text-base leading-8 text-white/75">{copy.aboutBody2}</p>
              </motion.div>

              <div className="space-y-5">
                <motion.div data-reveal className="glass-panel rounded-[2rem] p-6">
                  <div className="mb-4 inline-flex rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 font-[var(--font-mono)] text-xs uppercase tracking-[0.28em] text-cyan-200">
                    {copy.timelineTitle}
                  </div>
                  <div className="space-y-4">
                    {milestones.map((item) => (
                      <div key={item.year} className="relative rounded-[1.5rem] border border-white/8 bg-white/[0.03] p-5">
                        <div className="mb-2 flex items-center justify-between gap-4">
                          <span className="font-[var(--font-display)] text-2xl text-cyan-300">{item.year}</span>
                          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
                            {item.type[language]}
                          </span>
                        </div>
                        <p className="text-sm leading-7 text-muted">{item.summary[language]}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>

                <motion.div data-reveal className="grid gap-4 md:grid-cols-3">
                  <GlassInfo title="01" text={isArabic ? "أنظمة" : "Systems"} />
                  <GlassInfo title="02" text={isArabic ? "شبكات" : "Networks"} />
                  <GlassInfo title="03" text={isArabic ? "حلول" : "Solutions"} />
                </motion.div>

                <motion.div data-reveal className="grid gap-4">
                  {focusAreas.map((item) => (
                    <div
                      key={item.title.en}
                      className="glass-panel section-edge rounded-[1.6rem] p-5"
                    >
                      <div className="mb-2 font-[var(--font-mono)] text-[11px] uppercase tracking-[0.24em] text-cyan-200">
                        {isArabic ? "تركيز" : "Focus"}
                      </div>
                      <h3 className="text-lg font-semibold">{item.title[language]}</h3>
                      <p className="mt-2 text-sm leading-7 text-muted">{item.body[language]}</p>
                    </div>
                  ))}
                </motion.div>
              </div>
            </div>
          </SectionShell>
        </section>

        <section id="skills" data-scene className="px-4 py-16 md:px-8">
          <SectionShell title={copy.skillsTitle} kicker="TECHNICAL EXPERTISE" description={copy.skillsLegend} language={language}>
            <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
              <motion.div data-reveal className="glass-panel section-edge relative overflow-hidden rounded-[2rem] p-6">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(45,212,191,0.13),transparent_54%)]" />
                <div className="relative mx-auto flex aspect-square max-w-[31rem] items-center justify-center">
                  <div className="absolute h-[74%] w-[74%] rounded-full border border-emerald-300/25" />
                  <div className="absolute h-[58%] w-[58%] rounded-full border border-sky-300/20" />
                  <div className="absolute h-[42%] w-[42%] rounded-full border border-white/10" />
                  <div className="absolute flex h-40 w-40 items-center justify-center rounded-full border border-emerald-200/15 bg-black/35 text-center shadow-[0_12px_36px_rgba(5,25,34,0.24)]">
                    <div>
                      <p className="font-[var(--font-display)] text-lg">{isArabic ? "مركز التقنية" : "Tech Core"}</p>
                      <p className="mt-1 text-xs text-muted">{profile.role[language]}</p>
                    </div>
                  </div>

                  {skillNodes.map((skill, index) => {
                    const radius = 26 + (index % 3) * 15;
                    const x = Math.cos(skill.angle) * radius;
                    const y = Math.sin(skill.angle) * radius;
                    return (
                      <motion.div
                        key={`${skill.name}-${skill.group}`}
                        className="glass-panel absolute flex w-28 -translate-x-1/2 -translate-y-1/2 flex-col items-center rounded-2xl px-3 py-3 text-center"
                        style={{ left: `calc(50% + ${x}%)`, top: `calc(50% + ${y}%)` }}
                        animate={{ y: [0, -8, 0] }}
                        transition={{ duration: 3 + index * 0.08, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                        whileHover={{ scale: 1.045, y: -5, boxShadow: "0 16px 32px rgba(5,25,34,0.22)" }}
                      >
                        <span className="mb-1 text-base">{skill.icon}</span>
                        <span className="text-[11px] font-medium leading-4">{skill.name}</span>
                        <span className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/8">
                          <span className="block h-full rounded-full bg-gradient-to-r from-emerald-400 via-teal-400 to-sky-400" style={{ width: `${skill.level}%` }} />
                        </span>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>

              <div className="grid gap-4 md:grid-cols-2">
                {skillGroups.map((group) => (
                  <motion.div key={group.title.en} data-reveal className="glass-panel rounded-[1.75rem] p-5">
                    <div className="mb-4 flex items-center gap-3">
                      <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-xl">
                        {group.icon}
                      </span>
                      <div>
                        <h3 className="text-lg font-semibold">{group.title[language]}</h3>
                        <p className="text-sm text-muted">{group.skills.length} skills</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      {group.skills.map((skill) => (
                        <div key={skill.name} className="rounded-2xl border border-white/8 bg-white/[0.03] p-3">
                          <div className="mb-2 flex items-center justify-between gap-4 text-sm">
                            <span>{skill.name}</span>
                            <span className="font-[var(--font-mono)] text-emerald-200">{skill.level}%</span>
                          </div>
                          <div className="h-2 overflow-hidden rounded-full bg-white/7">
                            <motion.div
                              className="h-full rounded-full bg-gradient-to-r from-emerald-400 via-teal-400 to-sky-400"
                              initial={{ width: 0 }}
                              whileInView={{ width: `${skill.level}%` }}
                              viewport={{ once: true, amount: 0.55 }}
                              transition={{ duration: 1.2, ease: "easeOut" }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </SectionShell>
        </section>

        <section id="services" data-scene className="px-4 py-16 md:px-8">
          <SectionShell title={copy.servicesTitle} kicker="PROFESSIONAL SERVICES" description={copy.servicesLead} language={language}>
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {services.map((service, index) => (
                <motion.article
                  key={service.title.en}
                  data-reveal
                  className="glass-panel section-edge rounded-[1.8rem] p-6"
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{ duration: 0.75, delay: index * 0.08 }}
                >
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-300/20 bg-cyan-300/10 font-[var(--font-mono)] text-sm text-cyan-200">
                    {service.icon === "systems" && "SYS"}
                    {service.icon === "network" && "NET"}
                    {service.icon === "database" && "DB"}
                    {service.icon === "consulting" && "ADV"}
                  </div>
                  <h3 className="text-xl font-semibold">{service.title[language]}</h3>
                  <p className="mt-3 text-sm leading-7 text-muted">{service.description[language]}</p>
                </motion.article>
              ))}
            </div>
          </SectionShell>
        </section>

        <section id="certifications" data-scene className="px-4 py-16 md:px-8">
          <SectionShell
            title={copy.certifications}
            kicker="CERTIFICATIONS"
            description={
              isArabic
                ? "مجموعة شهادات معتمدة توثق التدريب العملي والتأهيل المهني في الأنظمة المحاسبية المؤسسية."
                : "Verified certificates documenting hands-on training and professional readiness in enterprise accounting systems."
            }
            language={language}
          >
            <div className="grid gap-5 lg:grid-cols-2">
              {certificates.map((certificate, index) => (
                <motion.article
                  key={certificate.id}
                  data-reveal
                  className="group glass-panel section-edge overflow-hidden rounded-[2rem]"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{ duration: 0.8, delay: index * 0.08 }}
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={certificate.image}
                      alt={certificate.title[language]}
                      fill
                      className="object-cover transition duration-700 group-hover:scale-[1.03]"
                    />
                    <div className="certificate-image-overlay absolute inset-0" />
                    <div className="absolute left-4 top-4 rounded-full border border-white/10 bg-black/40 px-3 py-1 font-[var(--font-mono)] text-[11px] uppercase tracking-[0.2em] text-cyan-200">
                      #{certificate.serialNo}
                    </div>
                  </div>

                  <div className="space-y-4 p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-xl font-semibold">{certificate.title[language]}</h3>
                        <p className="mt-2 text-sm text-muted">{certificate.issuer[language]}</p>
                      </div>
                      <BadgeCheck className="h-5 w-5 shrink-0 text-cyan-300" />
                    </div>

                    <div className="grid gap-2 text-sm">
                      <div className="flex items-center justify-between rounded-xl border border-white/8 bg-white/[0.03] px-3 py-2">
                        <span className="text-white/75">{isArabic ? "تاريخ الشهادة" : "Issue Date"}</span>
                        <span className="font-[var(--font-mono)] text-cyan-200">{certificate.date}</span>
                      </div>
                      <div className="flex items-center justify-between rounded-xl border border-white/8 bg-white/[0.03] px-3 py-2">
                        <span className="text-white/75">{isArabic ? "الفترة" : "Period"}</span>
                        <span className="text-xs text-cyan-100">{certificate.period[language]}</span>
                      </div>
                    </div>

                    <Link
                      href={certificate.image}
                      target="_blank"
                      className="inline-flex items-center gap-2 rounded-full border border-cyan-300/30 bg-cyan-300/10 px-4 py-2 text-sm text-white transition hover:bg-cyan-300/20"
                    >
                      <ExternalLink className="h-4 w-4" />
                      {isArabic ? "عرض الشهادة" : "View Certificate"}
                    </Link>
                  </div>
                </motion.article>
              ))}
            </div>
          </SectionShell>
        </section>

        <section id="projects" data-scene className="px-4 py-16 md:px-8">
          <SectionShell title={copy.projectsTitle} kicker="FEATURED PROJECTS" description={copy.projectsLead} language={language}>
            <div data-reveal className="mb-6 flex flex-wrap items-center justify-between gap-3">
              <p className="font-[var(--font-mono)] text-[11px] uppercase tracking-[0.28em] text-cyan-200">
                {copy.filtersTitle}
              </p>
              <div className="flex flex-wrap gap-3">
                {[
                { key: "all", label: copy.all },
                { key: "education", label: isArabic ? "التعليم" : "Education" },
                { key: "network", label: isArabic ? "الشبكات" : "Network" },
                { key: "systems", label: isArabic ? "الأنظمة" : "Systems" },
                { key: "database", label: isArabic ? "قواعد البيانات" : "Database" },
              ].map((filter) => (
                <button
                  key={filter.key}
                  onClick={() => {
                    setProjectFilter(filter.key);
                    playSound("click");
                  }}
                  onMouseEnter={() => playSound("hover")}
                  className={cn(
                    "rounded-full border px-4 py-2 text-sm transition",
                    projectFilter === filter.key
                      ? "border-cyan-300/40 bg-cyan-300/10 text-white shadow-[0_0_20px_rgba(77,216,255,0.18)]"
                      : "border-white/10 bg-white/5 text-white/70 hover:border-white/20 hover:text-white",
                  )}
                >
                  {filter.label}
                </button>
                ))}
              </div>
            </div>

            <div className="grid gap-5 lg:grid-cols-2">
              {filteredProjects.map((project, index) => (
                <motion.article
                  key={project.title.en}
                  data-reveal
                  className="group glass-panel section-edge overflow-hidden rounded-[2rem]"
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{ duration: 0.8, delay: index * 0.08 }}
                  whileHover={{ y: -8 }}
                >
                  <div className="relative h-72 overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.title.en}
                      fill
                      className="object-cover transition duration-700 group-hover:scale-105"
                    />
                    <div className="project-image-overlay absolute inset-0" />
                    <div className="absolute left-5 top-5 rounded-full border border-white/10 bg-black/40 px-3 py-1 font-[var(--font-mono)] text-[11px] uppercase tracking-[0.22em] text-cyan-200">
                      {project.category === "education"
                        ? isArabic ? "التعليم" : "Education"
                        : project.category === "network"
                          ? isArabic ? "الشبكات" : "Network"
                          : project.category === "systems"
                            ? isArabic ? "الأنظمة" : "Systems"
                            : project.category === "database"
                              ? isArabic ? "قواعد البيانات" : "Database"
                              : isArabic ? "المخاطر" : "Risk"}
                    </div>
                  </div>
                  <div className="space-y-5 p-6">
                    <div>
                      <h3 className="text-2xl font-semibold">{project.title[language]}</h3>
                      <p className="mt-3 text-sm leading-7 text-muted">{project.description[language]}</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((technology) => (
                        <span key={technology} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80">
                          {technology}
                        </span>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-3">
                      <button
                        className="rounded-full border border-cyan-300/30 bg-cyan-300/10 px-4 py-2 text-sm text-white transition hover:bg-cyan-300/18"
                        onClick={() => {
                          setSelectedProject(project);
                          playSound("click");
                        }}
                      >
                        {copy.liveDemo}
                      </button>
                      <Link href={project.github} target="_blank" className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/75 transition hover:text-white">
                        {copy.sourceCode}
                      </Link>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </SectionShell>
        </section>

        <section id="resume" data-scene className="px-4 py-16 md:px-8">
          <SectionShell title={copy.resumeTitle} kicker="CAREER OVERVIEW" description={copy.resumeLead} language={language}>
            <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
              <div className="space-y-4">
                {resumeTimeline.map((item, index) => (
                  <motion.div
                    key={item.title.en}
                    data-reveal
                    className="glass-panel section-edge relative rounded-[1.8rem] p-5 md:p-6"
                    initial={{ opacity: 0, x: isArabic ? 30 : -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.35 }}
                    transition={{ duration: 0.8, delay: index * 0.08 }}
                  >
                    <div className="absolute top-6 h-4 w-4 rounded-full bg-cyan-300 shadow-[0_0_20px_rgba(77,216,255,0.8)] ltr:-left-2 rtl:-right-2" />
                    <div className="mb-3 inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-cyan-200">
                      {item.label[language]}
                    </div>
                    <h3 className="text-xl font-semibold">{item.title[language]}</h3>
                    <p className="mt-3 text-sm leading-7 text-muted">{item.body[language]}</p>
                  </motion.div>
                ))}
              </div>

              <motion.div data-reveal className="glass-panel section-edge flex flex-col justify-between rounded-[2rem] p-6">
                <div>
                  <div className="mb-5 rounded-[1.6rem] border border-white/10 bg-white/[0.03] p-5">
                    <p className="font-[var(--font-mono)] text-xs uppercase tracking-[0.28em] text-cyan-200">
                      {isArabic ? "ملخص مهني" : "Professional Summary"}
                    </p>
                    <h3 className="mt-4 font-[var(--font-display)] text-3xl">
                      {profile.name[language]}
                    </h3>
                    <p className="mt-3 text-muted">{profile.subtitle[language]}</p>
                  </div>

                  <div className="space-y-4">
                    {[copy.education, copy.certifications, copy.training, copy.growth].map((item) => (
                      <div key={item} className="flex items-center justify-between rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3">
                        <span>{item}</span>
                        <span className="font-[var(--font-mono)] text-cyan-300">{isArabic ? "متوفر" : "Included"}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 space-y-4">
                  <LinkButton href={language === "ar" ? "/resume-ameen-al-yosofi-ar.pdf" : "/resume-ameen-al-yosofi-en.pdf"} download icon={<Download className="h-4 w-4" />} text={copy.downloadResume} wide />
                </div>
              </motion.div>
            </div>
          </SectionShell>
        </section>

        <section id="contact" data-scene className="px-4 py-16 md:px-8">
          <SectionShell title={copy.contactTitle} kicker="CONTACT DETAILS" description={copy.contactLead} language={language}>
            <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
              <motion.div data-reveal className="glass-panel section-edge rounded-[2rem] p-6">
                <p className="mb-5 font-[var(--font-display)] text-2xl">{copy.socialTitle}</p>
                <div className="space-y-3">
                  {contactLinks.map((item) => (
                    <motion.div key={item.label} whileHover={{ x: isArabic ? -6 : 6 }}>
                      {item.href ? (
                        <Link
                          href={item.href}
                          target={item.href.startsWith("http") ? "_blank" : "_self"}
                          className="flex items-center justify-between rounded-[1.4rem] border border-white/10 bg-white/[0.03] px-4 py-4 text-white/80 transition hover:border-cyan-300/30 hover:text-white"
                        >
                          <div className="flex items-center gap-3">
                            {item.label === "GitHub" && <Github className="h-5 w-5" />}
                            {item.label === "LinkedIn" && <Linkedin className="h-5 w-5" />}
                            {item.label === "Email" && <Mail className="h-5 w-5" />}
                            {item.label === "WhatsApp" && <MessageCircle className="h-5 w-5" />}
                            {item.label === "Phone" && <Phone className="h-5 w-5" />}
                            <div>
                              <p>{item.label}</p>
                              {item.note[language] && <p className="text-xs text-muted">{item.note[language]}</p>}
                            </div>
                          </div>
                          <ExternalLink className="h-4 w-4" />
                        </Link>
                      ) : (
                        <div className="rounded-[1.4rem] border border-white/10 bg-white/[0.03] px-4 py-4 text-white/75">
                          <div className="flex items-center gap-3">
                            {item.label === "GitHub" && <Github className="h-5 w-5" />}
                            {item.label === "LinkedIn" && <Linkedin className="h-5 w-5" />}
                            {item.label === "Email" && <Mail className="h-5 w-5" />}
                            {item.label === "WhatsApp" && <MessageCircle className="h-5 w-5" />}
                            {item.label === "Phone" && <Phone className="h-5 w-5" />}
                            <div>
                              <p>{item.label}</p>
                              {item.note[language] && <p className="text-xs text-muted">{item.note[language]}</p>}
                            </div>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>

                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  <Link
                    href="tel:778530052"
                    className="inline-flex items-center justify-center gap-2 rounded-[1.2rem] border border-cyan-300/28 bg-cyan-300/10 px-4 py-3 text-sm font-medium text-white transition hover:bg-cyan-300/18"
                  >
                    <Phone className="h-4 w-4" />
                    {isArabic ? "اتصال مباشر" : "Direct Call"}
                  </Link>
                  <Link
                    href="https://wa.me/967778530052"
                    target="_blank"
                    className="inline-flex items-center justify-center gap-2 rounded-[1.2rem] border border-cyan-300/28 bg-cyan-300/10 px-4 py-3 text-sm font-medium text-white transition hover:bg-cyan-300/18"
                  >
                    <MessageCircle className="h-4 w-4" />
                    {isArabic ? "مراسلة واتساب" : "WhatsApp Chat"}
                  </Link>
                </div>

                <div className="mt-5 rounded-[1.5rem] border border-cyan-300/18 bg-cyan-300/8 p-4">
                  <p className="font-[var(--font-mono)] text-[11px] uppercase tracking-[0.24em] text-cyan-200">
                    {copy.responseTime}
                  </p>
                  <p className="mt-2 text-sm leading-7 text-muted">{copy.availability}</p>
                </div>
              </motion.div>

              <motion.form
                data-reveal
                onSubmit={handleContactSubmit}
                className="glass-panel section-edge rounded-[2rem] p-6"
              >
                <div className="grid gap-4 md:grid-cols-2">
                  <Field
                    label={isArabic ? "الاسم" : "Name"}
                    value={formState.name}
                    onChange={(value) => setFormState((prev) => ({ ...prev, name: value }))}
                  />
                  <Field
                    label={isArabic ? "البريد الإلكتروني" : "Email"}
                    type="email"
                    value={formState.email}
                    onChange={(value) => setFormState((prev) => ({ ...prev, email: value }))}
                  />
                </div>
                <div className="mt-4">
                  <Field
                    label={isArabic ? "الرسالة" : "Message"}
                    multiline
                    value={formState.message}
                    onChange={(value) => setFormState((prev) => ({ ...prev, message: value }))}
                  />
                </div>
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <PrimaryAction
                    submit
                    icon={<ArrowRight className="h-4 w-4" />}
                    text={copy.send}
                  />
                  {formMessage && <span className="text-sm text-cyan-200">{formMessage}</span>}
                </div>
              </motion.form>
            </div>
          </SectionShell>
        </section>
      </main>

      <Dialog.Root open={Boolean(selectedProject)} onOpenChange={(open) => !open && setSelectedProject(null)}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-[100] bg-black/75 backdrop-blur-md" />
          <Dialog.Content className="fixed left-1/2 top-1/2 z-[101] w-[min(92vw,56rem)] -translate-x-1/2 -translate-y-1/2 rounded-[2rem] border border-white/10 bg-[#07111f]/92 p-4 shadow-[0_40px_120px_rgba(0,0,0,0.6)] md:p-6">
            {selectedProject && (
              <>
                <div className="relative h-64 overflow-hidden rounded-[1.4rem]">
                  <Image
                    src={selectedProject.image}
                    alt={selectedProject.title.en}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#07111f] via-[#07111f]/15 to-transparent" />
                </div>

                <div className="mt-5 flex items-start justify-between gap-4">
                  <div>
                    <Dialog.Title className="text-2xl font-semibold">
                      {selectedProject.title[language]}
                    </Dialog.Title>
                    <Dialog.Description className="mt-3 text-sm leading-7 text-muted">
                      {selectedProject.description[language]}
                    </Dialog.Description>
                  </div>
                  <Dialog.Close className="rounded-full border border-white/10 bg-white/5 p-2 text-white/70 transition hover:text-white">
                    <X className="h-4 w-4" />
                  </Dialog.Close>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  {selectedProject.technologies.map((technology) => (
                    <span key={technology} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs">
                      {technology}
                    </span>
                  ))}
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  <LinkButton href={selectedProject.demo} icon={<Globe className="h-4 w-4" />} text={copy.liveDemo} />
                  <LinkButton href={selectedProject.github} icon={<Github className="h-4 w-4" />} text={copy.sourceCode} />
                </div>
              </>
            )}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}

function SectionShell({
  title,
  kicker,
  description,
  language,
  children,
}: {
  title: string;
  kicker: string;
  description: string;
  language: Language;
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-7xl">
      <div className="mb-9 grid gap-5 md:grid-cols-[0.9fr_1.1fr] md:items-end">
        <div data-reveal className="section-heading-block">
          <span className="inline-flex rounded-full border border-emerald-200/20 bg-emerald-300/10 px-4 py-2 font-[var(--font-mono)] text-[11px] uppercase tracking-[0.28em] text-emerald-200">
            {kicker}
          </span>
          <h2 className="mt-4 font-[var(--font-display)] text-[clamp(2.2rem,4.2vw,4.15rem)] leading-[0.98] tracking-[0.015em]">
            {title}
          </h2>
        </div>
        <div data-reveal className="section-description-card max-w-3xl md:justify-self-end">
          <span className="section-description-marker" aria-hidden="true" />
          <p className="text-[15px] font-medium leading-8 md:text-base">{description}</p>
        </div>
      </div>
      <div className={cn(language === "ar" ? "text-right" : "text-left")}>{children}</div>
    </div>
  );
}

function PrimaryAction({
  onClick,
  icon,
  text,
  submit,
}: {
  onClick?: () => void;
  icon: React.ReactNode;
  text: string;
  submit?: boolean;
}) {
  return (
    <button
      type={submit ? "submit" : "button"}
      onClick={onClick}
      className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-emerald-200/25 bg-gradient-to-r from-emerald-300 via-teal-300 to-sky-300 px-5 text-sm font-medium text-slate-950 shadow-[0_15px_38px_rgba(20,184,166,0.22)] transition hover:-translate-y-0.5 hover:brightness-105"
    >
      {text}
      {icon}
    </button>
  );
}

function SecondaryAction({
  onClick,
  icon,
  text,
}: {
  onClick?: () => void;
  icon: React.ReactNode;
  text: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 text-sm font-medium text-white/80 transition hover:border-white/20 hover:text-white"
    >
      {icon}
      {text}
    </button>
  );
}

function LinkButton({
  href,
  icon,
  text,
  wide,
  download = false,
}: {
  href: string;
  icon: React.ReactNode;
  text: string;
  wide?: boolean;
  download?: boolean;
}) {
  return (
    <Link
      href={href}
      target={download ? undefined : "_blank"}
      download={download ? true : undefined}
      className={cn(
        "inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 text-sm font-medium text-white/80 transition hover:border-white/20 hover:text-white",
        wide && "w-full",
      )}
    >
      {icon}
      {text}
    </Link>
  );
}

function StatCard({ label, title, body }: { label: string; title: string; body: string }) {
  return (
    <div className="glass-panel rounded-[1.5rem] p-5">
      <span className="font-[var(--font-mono)] text-xs uppercase tracking-[0.24em] text-cyan-200">{label}</span>
      <h3 className="mt-3 text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-sm leading-7 text-muted">{body}</p>
    </div>
  );
}

function SceneBadge({ label, title }: { label: string; title: string }) {
  return (
    <div className="glass-panel rounded-[1.4rem] px-4 py-3 shadow-[0_16px_40px_rgba(0,0,0,0.2)]">
      <p className="font-[var(--font-mono)] text-[10px] uppercase tracking-[0.28em] text-cyan-200/80">{label}</p>
      <p className="mt-1 text-sm text-white/85">{title}</p>
    </div>
  );
}

function GlassInfo({ title, text }: { title: string; text: string }) {
  return (
    <div className="glass-panel rounded-[1.35rem] p-4 text-center">
      <p className="font-[var(--font-display)] text-3xl text-cyan-300">{title}</p>
      <p className="mt-2 text-sm text-muted">{text}</p>
    </div>
  );
}

function ControlPill({
  icon,
  label,
  value,
  onClick,
  compact = false,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  onClick: () => void;
  compact?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 text-xs text-[color:var(--foreground)]/80 transition hover:border-white/20",
        compact ? "min-h-9 px-2 py-1 sm:px-2.5" : "min-h-10 px-3 py-1.5 sm:px-3.5",
      )}
    >
      <span className="shrink-0 text-cyan-300">{icon}</span>
      <span className={cn("hidden whitespace-nowrap", compact ? "xl:inline" : "md:inline")}>{label}</span>
      <span className={cn(
        "rounded-full bg-white/8 text-center font-[var(--font-mono)] text-[11px]",
        compact ? "min-w-8 px-1.5 py-0.5" : "min-w-9 px-2 py-0.5",
      )}>{value}</span>
    </button>
  );
}

function SwitchPill({
  label,
  checked,
  onCheckedChange,
  compact = false,
}: {
  label: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  compact?: boolean;
}) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 text-xs text-[color:var(--foreground)]/80",
        compact ? "min-h-9 min-w-[6rem] px-2 py-1 sm:min-w-[6.5rem] sm:px-2.5" : "min-h-10 min-w-[8.25rem] px-3 py-1.5 sm:min-w-[9.5rem] sm:px-3.5",
        checked ? "border-cyan-300/35 bg-cyan-300/10" : "border-white/10",
      )}
    >
      <span className={cn("hidden whitespace-nowrap", compact ? "xl:inline" : "md:inline")}>{label}</span>
      <div className="grid h-7 w-[4.15rem] grid-cols-2 rounded-full border border-white/10 bg-white/8 p-0.5">
        <button
          type="button"
          aria-label="Dark mode"
          onClick={() => onCheckedChange(false)}
          className={cn(
            "flex items-center justify-center rounded-full transition",
            !checked
              ? "bg-white text-slate-900 shadow-[0_1px_10px_rgba(255,255,255,0.18)]"
              : "text-white/65 hover:text-white",
          )}
        >
          <MoonStar className="h-3.5 w-3.5" />
        </button>
        <button
          type="button"
          aria-label="Light mode"
          onClick={() => onCheckedChange(true)}
          className={cn(
            "flex items-center justify-center rounded-full transition",
            checked
              ? "bg-cyan-300 text-slate-950 shadow-[0_1px_12px_rgba(77,216,255,0.35)]"
              : "text-white/65 hover:text-white",
          )}
        >
          <SunMedium className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  multiline = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  multiline?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm text-white/70">{label}</span>
      {multiline ? (
        <textarea
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="min-h-40 w-full rounded-[1.5rem] border border-white/10 bg-white/[0.03] px-4 py-4 text-sm outline-none transition focus:border-cyan-300/30 focus:bg-cyan-300/[0.04]"
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="h-14 w-full rounded-[1.5rem] border border-white/10 bg-white/[0.03] px-4 text-sm outline-none transition focus:border-cyan-300/30 focus:bg-cyan-300/[0.04]"
        />
      )}
    </label>
  );
}
