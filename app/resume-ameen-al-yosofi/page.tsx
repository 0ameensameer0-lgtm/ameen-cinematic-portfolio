import type { Metadata } from "next";
import Link from "next/link";
import {
  certificates,
  contactLinks,
  profile,
  projects,
  services,
  skillGroups,
} from "@/data/site-content";

export const metadata: Metadata = {
  title: "Ameen Al-Yosofi Resume",
  description: "Professional resume for Ameen Sameer Ameen Al-Yosofi.",
};

const featuredProjects = projects.filter((project) =>
  [
    "Rizq Wallet",
    "Hospital Management System",
    "Medical Consultation Booking System",
    "School Management System",
  ].includes(project.title.en),
);

const coreSkills = skillGroups.flatMap((group) => group.skills).slice(0, 10);

const email = contactLinks.find((item) => item.label === "Email")?.note.en ?? "0ameensameer0@gmail.com";
const phone = contactLinks.find((item) => item.label === "Phone")?.note.en ?? "778530052";

export default function ResumePage() {
  return (
    <main className="min-h-screen bg-[#f4f7fb] px-4 py-8 text-slate-900 md:px-8">
      <div className="mx-auto max-w-5xl rounded-[2rem] bg-white p-6 shadow-[0_20px_80px_rgba(15,23,42,0.08)] md:p-10 print:rounded-none print:p-0 print:shadow-none">
        <header className="border-b border-slate-200 pb-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-700">
                Information Technology Student
              </p>
              <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950">
                {profile.name.en}
              </h1>
              <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600">
                Programmer and Information Technology student seeking continuous growth through
                learning, applied practice, and real technical solution building. Aiming to create
                useful systems that serve the community and deliver real value with professionalism
                and discipline.
              </p>
            </div>

            <div className="grid gap-3 text-sm text-slate-700 md:min-w-[18rem]">
              <InfoLine label="Email" value={email} href={`mailto:${email}`} />
              <InfoLine label="Phone" value={phone} href={`tel:${phone}`} />
              <InfoLine label="Birthplace" value="Taiz, Yemen" />
              <InfoLine label="Current City" value="Sana'a, Yemen" />
              <InfoLine
                label="Portfolio"
                value="ameensameer-ameens-projects-e9d3be70.vercel.app"
                href="https://ameensameer-ameens-projects-e9d3be70.vercel.app"
              />
              <InfoLine label="University" value="Al-Saeed University - Sana'a" />
            </div>
          </div>
        </header>

        <section className="grid gap-8 py-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <SectionTitle title="Professional Summary" />
            <p className="text-sm leading-8 text-slate-700">
              Programmer and Information Technology student striving to continuously develop
              skills in programming and IT, relying on Allah and trusting Him in every step.
              Believes that knowledge is a path to progress and that excellence in work is a
              value that should always be upheld. Committed to continuous learning and keeping up
              with modern technologies. Passionate about building software solutions and turning
              ideas into practical applications that solve problems and provide real value to the
              community. Also working to strengthen logical thinking, teamwork, and responsibility,
              while maintaining professional ethics and honesty in performance. The goal is to
              become a distinguished programmer who balances technical competence with Islamic
              values and contributes to meaningful projects that serve people and leave a positive
              impact. Asking Allah for success, guidance, and blessing in every effort.
            </p>

            <div className="mt-8">
              <SectionTitle title="Education" />
              <article className="rounded-2xl border border-slate-200 p-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h3 className="text-lg font-semibold text-slate-900">
                    Bachelor of Information Technology
                  </h3>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-slate-600">
                    2023 - Present
                  </span>
                </div>
                <p className="mt-2 text-sm text-slate-700">Al-Saeed University - Sana'a</p>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  Currently preparing to begin the fourth academic year. Academic path focused on
                  Information Technology foundations, systems, networking, and practical technical
                  applications.
                </p>
              </article>
            </div>

            <div className="mt-8">
              <SectionTitle title="Selected Projects" />
              <div className="grid gap-4">
                {featuredProjects.map((project) => (
                  <article key={project.title.en} className="rounded-2xl border border-slate-200 p-4">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <h3 className="text-lg font-semibold text-slate-900">{project.title.en}</h3>
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-slate-600">
                        {project.category}
                      </span>
                    </div>
                    <p className="mt-3 text-sm leading-7 text-slate-600">{project.description.en}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {project.technologies.map((technology) => (
                        <span
                          key={technology}
                          className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs text-slate-700"
                        >
                          {technology}
                        </span>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <div className="mt-8">
              <SectionTitle title="Services" />
              <div className="grid gap-4 md:grid-cols-2">
                {services.map((service) => (
                  <article key={service.title.en} className="rounded-2xl border border-slate-200 p-4">
                    <h3 className="text-base font-semibold text-slate-900">{service.title.en}</h3>
                    <p className="mt-2 text-sm leading-7 text-slate-600">{service.description.en}</p>
                  </article>
                ))}
              </div>
            </div>

            <div className="mt-8">
              <SectionTitle title="Practical Readiness" />
              <article className="rounded-2xl border border-slate-200 p-4">
                <p className="text-sm leading-7 text-slate-600">
                  As a university student, the current strength lies in structured learning,
                  practical projects, technical training, and portfolio-based work rather than
                  full-time job history. This approach presents real capability honestly while
                  highlighting readiness for internships, junior roles, and technical collaborations.
                </p>
              </article>
            </div>
          </div>

          <div>
            <SectionTitle title="Core Skills" />
            <div className="grid gap-3">
              {coreSkills.map((skill) => (
                <div key={skill.name} className="rounded-2xl border border-slate-200 p-4">
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <span className="text-sm font-medium text-slate-800">{skill.name}</span>
                    <span className="text-xs font-semibold text-sky-700">{skill.level}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-100">
                    <div
                      className="h-2 rounded-full bg-gradient-to-r from-sky-500 to-cyan-400"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <SectionTitle title="Certifications" />
              <div className="grid gap-4">
                {certificates.map((certificate) => (
                  <article key={certificate.id} className="rounded-2xl border border-slate-200 p-4">
                    <h3 className="text-base font-semibold text-slate-900">{certificate.title.en}</h3>
                    <p className="mt-1 text-sm text-slate-600">{certificate.issuer.en}</p>
                    <p className="mt-2 text-sm text-slate-600">Issue Date: {certificate.date}</p>
                    <p className="mt-1 text-sm text-slate-600">Period: {certificate.period.en}</p>
                    <p className="mt-1 text-sm text-slate-600">Certificate No: {certificate.serialNo}</p>
                  </article>
                ))}
              </div>
            </div>

            <div className="mt-8">
              <SectionTitle title="Additional Courses" />
              <div className="grid gap-3">
                {[
                  "Advanced English Diploma",
                  "Excel Institute English Studies",
                  "Tech Zone Training",
                  "TIDY Institute Training",
                  "ICDL - Computer Driving License",
                  "Advanced PowerPoint - Sana'a University",
                  "Online Graphics Course",
                  "Online CCNA Course",
                ].map((course) => (
                  <div key={course} className="rounded-2xl border border-slate-200 p-4 text-sm text-slate-700">
                    {course}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8">
              <SectionTitle title="Languages" />
              <div className="grid gap-3">
                <div className="rounded-2xl border border-slate-200 p-4">
                  <p className="text-sm font-medium text-slate-800">Arabic</p>
                  <p className="mt-1 text-sm text-slate-600">Native / Fluent</p>
                </div>
                <div className="rounded-2xl border border-slate-200 p-4">
                  <p className="text-sm font-medium text-slate-800">English</p>
                  <p className="mt-1 text-sm text-slate-600">Good working proficiency</p>
                </div>
              </div>
            </div>

            <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <SectionTitle title="Career Objective" />
              <p className="text-sm leading-7 text-slate-600">
                Seeking opportunities that support growth in programming, systems, networking, and
                technical operations, while contributing to useful solutions that create measurable
                value and serve people effectively.
              </p>
            </div>
          </div>
        </section>

        <footer className="flex flex-wrap items-center justify-between gap-4 border-t border-slate-200 pt-6 text-sm text-slate-500">
          <span>Prepared for professional presentation and direct sharing.</span>
          <Link
            href="/"
            className="rounded-full border border-slate-200 px-4 py-2 text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
          >
            Back to Portfolio
          </Link>
        </footer>
      </div>
    </main>
  );
}

function SectionTitle({ title }: { title: string }) {
  return (
    <h2 className="mb-4 text-sm font-semibold uppercase tracking-[0.24em] text-sky-700">
      {title}
    </h2>
  );
}

function InfoLine({
  label,
  value,
  href,
}: {
  label: string;
  value: string;
  href?: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 px-4 py-3">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{label}</p>
      {href ? (
        <Link href={href} className="mt-1 block break-all text-sm font-medium text-slate-800">
          {value}
        </Link>
      ) : (
        <p className="mt-1 text-sm font-medium text-slate-800">{value}</p>
      )}
    </div>
  );
}
