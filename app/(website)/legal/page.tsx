import Link from "next/link"
import type { Metadata } from "next"
import {
  ArrowLeft,
  ArrowRight,
  ChevronDown,
  ChevronRight,
  FileText,
  Repeat,
  RotateCcw,
  ShieldCheck,
} from "lucide-react"

import { legalDocs, defaultLegalSlug } from "./content"

type SearchParams = Promise<{ doc?: string }>

const icons = {
  "privacy-policy": ShieldCheck,
  "terms-and-conditions": FileText,
  "refund-and-return-policy": RotateCcw,
  "trade-in-policy": Repeat,
} as const

const findDoc = (slug?: string) =>
  legalDocs.find((d) => d.slug === (slug ?? defaultLegalSlug)) ?? legalDocs[0]

export async function generateMetadata({
  searchParams,
}: {
  searchParams: SearchParams
}): Promise<Metadata> {
  const { doc } = await searchParams
  const active = findDoc(doc)
  return {
    title: `${active.title} | Al Dana`,
    description: active.description,
  }
}

/* Renders **bold** markers inside a string */
function Rich({ text }: { text: string }) {
  return (
    <>
      {text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
        part.startsWith("**") ? (
          <strong key={i} className="font-semibold text-slate-900">
            {part.slice(2, -2)}
          </strong>
        ) : (
          part
        ),
      )}
    </>
  )
}

export default async function LegalPage({
  searchParams,
}: {
  searchParams: SearchParams
}) {
  const { doc } = await searchParams
  const active = findDoc(doc)

  const index = legalDocs.findIndex((d) => d.slug === active.slug)
  const prev = legalDocs[index - 1]
  const next = legalDocs[index + 1]

  const docHref = (slug: string) => `/legal?doc=${slug}`

  return (
    <main className="w-full bg-white text-slate-900">
      {/* ============================ HEADER ============================ */}
      <section className="border-b border-slate-200 bg-slate-50">
        <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
          <nav
            aria-label="Breadcrumb"
            className="mb-4 flex items-center gap-1.5 text-xs font-medium text-slate-500"
          >
            <Link href="/" className="hover:text-slate-900">
              Home
            </Link>
            <ChevronRight className="size-3.5 text-slate-300" />
            <Link href="/legal" className="hover:text-slate-900">
              Legal
            </Link>
            <ChevronRight className="size-3.5 text-slate-300" />
            <span className="text-slate-900">{active.title}</span>
          </nav>

          <h1 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
            Legal
          </h1>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-slate-600">
            Our policies for using the Al Dana website and our repair,
            trade-in, and shop services.
          </p>
        </div>
      </section>

      {/* ============================ BODY ============================ */}
      <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-12 lg:px-8 lg:py-12">
        {/* ---------------- LEFT MENU ---------------- */}
        <aside className="lg:sticky lg:top-28 lg:self-start">
          {/* Mobile: document tabs */}
          <div className="-mx-4 overflow-x-auto px-4 pb-1 lg:hidden">
            <div className="flex w-max gap-2">
              {legalDocs.map((d) => (
                <Link
                  key={d.slug}
                  href={docHref(d.slug)}
                  className={`rounded-md border px-3.5 py-2 text-xs font-semibold transition-colors ${
                    d.slug === active.slug
                      ? "border-slate-900 bg-slate-900 text-white"
                      : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {d.menuLabel}
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile: sections of the active document */}
          <details className="mt-4 rounded-md border border-slate-200 lg:hidden">
            <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3 text-sm font-semibold text-slate-900 [&::-webkit-details-marker]:hidden">
              On this page
              <ChevronDown className="size-4 text-slate-400" />
            </summary>
            <ul className="border-t border-slate-100 px-4 py-2">
              {active.sections.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="block py-2 text-sm text-slate-600 hover:text-violet-600"
                  >
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </details>

          {/* Desktop: contents menu */}
          <nav aria-label="Legal contents" className="hidden lg:block">
            <p className="mb-3 text-[11px] font-bold uppercase tracking-widest text-slate-400">
              Contents
            </p>

            <ul className="space-y-1">
              {legalDocs.map((d) => {
                const isActive = d.slug === active.slug
                const Icon = icons[d.slug as keyof typeof icons] ?? FileText

                return (
                  <li key={d.slug}>
                    <Link
                      href={docHref(d.slug)}
                      aria-current={isActive ? "page" : undefined}
                      className={`flex items-center gap-3 rounded-md border-l-2 px-3 py-2.5 text-sm font-semibold transition-colors ${
                        isActive
                          ? "border-violet-600 bg-violet-50 text-violet-700"
                          : "border-transparent text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                      }`}
                    >
                      <Icon className="size-4 shrink-0" />
                      {d.menuLabel}
                    </Link>

                    {isActive && (
                      <ul className="mb-2 ml-[22px] mt-1 space-y-0.5 border-l border-slate-200 pl-3">
                        {d.sections.map((s) => (
                          <li key={s.id}>
                            <a
                              href={`#${s.id}`}
                              className="block py-1 text-[13px] text-slate-500 transition-colors hover:text-violet-600"
                            >
                              {s.title}
                            </a>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                )
              })}
            </ul>
          </nav>
        </aside>

        {/* ---------------- CONTENT ---------------- */}
        <article className="min-w-0 max-w-3xl">
          <header className="border-b border-slate-200 pb-6">
            <h2 className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
              {active.title}
            </h2>
            {active.updated && (
              <p className="mt-1.5 text-xs font-medium text-slate-500">
                Last updated: {active.updated}
              </p>
            )}
            <div className="mt-4 space-y-3">
              {active.intro.map((text, i) => (
                <p key={i} className="text-[15px] leading-7 text-slate-600">
                  <Rich text={text} />
                </p>
              ))}
            </div>
          </header>

          <div className="divide-y divide-slate-100">
            {active.sections.map((section) => (
              <section
                key={section.id}
                id={section.id}
                className="scroll-mt-28 py-7"
              >
                <h3 className="mb-3 text-lg font-extrabold tracking-tight text-slate-900">
                  {section.title}
                </h3>

                <div className="space-y-3">
                  {section.content.map((block, i) =>
                    Array.isArray(block) ? (
                      <ul key={i} className="space-y-2">
                        {block.map((item, j) => (
                          <li
                            key={j}
                            className="flex gap-3 text-[15px] leading-7 text-slate-600"
                          >
                            <span className="mt-[11px] size-1.5 shrink-0 rounded-full bg-violet-500" />
                            <span>
                              <Rich text={item} />
                            </span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p key={i} className="text-[15px] leading-7 text-slate-600">
                        <Rich text={block} />
                      </p>
                    ),
                  )}
                </div>
              </section>
            ))}
          </div>

          {active.closing && (
            <div className="mt-2 rounded-md border border-violet-100 bg-violet-50 p-5">
              {active.closing.map((text, i) => (
                <p key={i} className="text-sm leading-6 text-violet-900">
                  <Rich text={text} />
                </p>
              ))}
            </div>
          )}

          {/* Prev / next document */}
          <div className="mt-10 grid gap-3 sm:grid-cols-2">
            {prev ? (
              <Link
                href={docHref(prev.slug)}
                className="group rounded-md border border-slate-200 p-4 transition-colors hover:border-violet-300 hover:bg-violet-50"
              >
                <span className="flex items-center gap-1.5 text-xs font-semibold text-slate-500">
                  <ArrowLeft className="size-3.5" /> Previous
                </span>
                <span className="mt-1 block text-sm font-bold text-slate-900 group-hover:text-violet-700">
                  {prev.title}
                </span>
              </Link>
            ) : (
              <span />
            )}

            {next && (
              <Link
                href={docHref(next.slug)}
                className="group rounded-md border border-slate-200 p-4 text-right transition-colors hover:border-violet-300 hover:bg-violet-50 sm:col-start-2"
              >
                <span className="flex items-center justify-end gap-1.5 text-xs font-semibold text-slate-500">
                  Next <ArrowRight className="size-3.5" />
                </span>
                <span className="mt-1 block text-sm font-bold text-slate-900 group-hover:text-violet-700">
                  {next.title}
                </span>
              </Link>
            )}
          </div>

          {/* Contact */}
          <div className="mt-6 flex flex-col gap-3 rounded-md bg-slate-50 p-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-slate-600">
              Questions about our policies? We're happy to help.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-violet-600 px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-violet-700"
            >
              Contact Us <ArrowRight className="size-4" />
            </Link>
          </div>
        </article>
      </div>
    </main>
  )
}
