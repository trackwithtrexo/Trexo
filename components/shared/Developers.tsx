"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin } from "react-icons/fa";

import { Button } from "@/components/ui/button";
import { MdEmail } from "react-icons/md";

type Developer = {
  name: string;
  role: string;
  description: string;
  social: {
    github: string;
    linkedin: string;
    email: string;
  };
};

const developers: Developer[] = [
  {
    name: "Harmin Kalathiya",
    role: "Full Stack Developer",
    description:
      "Expert in Next.js, React.js and Node.js development. Focuses on creating scalable database solutions and responsive web applications.",
    social: {
      email: "harminkalathiya@gmail.com",
      github: "https://github.com/harminK",
      linkedin: "https://www.linkedin.com/in/harmin-kalathiya-03058a297",
    },
  },
  {
    name: "Devansh Dholiya",
    role: "Frontend Developer",
    description:
      "Expert in React.js, Next.js, Tailwind CSS, and API integrations. Focused on crafting seamless user experiences, responsive layouts, and efficient web applications.",
    social: {
      email: "devanshdholiya2568@gmail.com",
      github: "https://github.com/DevanshDholiya",
      linkedin: "https://www.linkedin.com/in/devansh-dholiya-274017249/",
    },
  },
];

export default function Developers() {
  return (
    <section id="developers" className="w-full py-16 sm:py-20">
      <div className="mx-auto w-full max-w-7xl px-4 text-center sm:px-6">
        <p className="inline-flex rounded-full  px-4 py-1.5 text-xs font-semibold tracking-wide bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300">
       
          Meet the Team
        </p>

        <h2 className="mt-4 text-balance text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
          Built by Passionate
          <span className="block text-green-500">Developers</span>
        </h2>

        {/* Changed max-w-4xl to max-w-3xl to shrink the overall width of the cards */}
        <div className="mx-auto mt-12 grid max-w-3xl gap-6 md:grid-cols-2">
          {developers.map((dev, index) => (
            <motion.article
              key={dev.name}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex h-full aspect-square flex-col rounded-xl border border-border/70 bg-card/60 p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl"
            >
              {/* Tightened gap from gap-4 to gap-3 */}
              <div className="flex flex-col items-center gap-3 text-center">
                {/* Reduced Avatar size to h-20 w-20 and text-3xl */}
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-500 text-3xl font-bold text-white shadow-md">
                  {dev.name[0]}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground">
                    {dev.name}
                  </h3>
                  <p className="mt-1 text-sm font-semibold text-green-500">
                    {dev.role}
                  </p>
                </div>
              </div>

              {/* Reduced top margin to mt-4 */}
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground text-center line-clamp-4">
                {dev.description}
              </p>

              {/* Tightened padding to pt-5 */}
              <div className="mt-auto flex justify-center flex-wrap gap-3 pt-5">
                <Button asChild variant="outline" size="sm">
                  <Link href={`mailto:${dev.social.email}`} rel="noreferrer">
                    <MdEmail className="mr-2 h-4 w-4" />
                    Email
                  </Link>
                </Button>
                <Button asChild variant="outline" size="sm">
                  <Link
                    href={dev.social.github}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <FaGithub className="mr-2 h-4 w-4" />
                    GitHub
                  </Link>
                </Button>
                <Button asChild variant="outline" size="sm">
                  <Link
                    href={dev.social.linkedin}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <FaLinkedin className="mr-2 h-4 w-4" />
                    LinkedIn
                  </Link>
                </Button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
