import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Link } from "@/i18n/navigation";
import { getPost, getAllPosts } from "@/lib/blog";
import { SITE_URL } from "@/lib/constants";

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateStaticParams() {
  const locales = ["en", "bn"];
  return locales.flatMap((locale) =>
    getAllPosts(locale).map((post) => ({ locale, slug: post.slug }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = getPost(slug, locale);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `${SITE_URL}/${locale}/blog/${slug}` },
    openGraph: { title: post.title, description: post.description },
  };
}

const mdxComponents = {
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1 {...props} className="text-3xl font-bold text-neutral-900 mt-8 mb-4" />
  ),
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 {...props} className="text-2xl font-bold text-neutral-800 mt-8 mb-3 pb-2 border-b border-neutral-100" />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 {...props} className="text-xl font-semibold text-neutral-800 mt-6 mb-2" />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p {...props} className="text-neutral-600 leading-relaxed mb-4" />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul {...props} className="list-disc list-outside ml-6 mb-4 space-y-2 text-neutral-600" />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol {...props} className="list-decimal list-outside ml-6 mb-4 space-y-2 text-neutral-600" />
  ),
  li: (props: React.HTMLAttributes<HTMLLIElement>) => (
    <li {...props} className="leading-relaxed" />
  ),
  strong: (props: React.HTMLAttributes<HTMLElement>) => (
    <strong {...props} className="font-semibold text-neutral-800" />
  ),
  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote {...props} className="border-l-4 border-brand-400 pl-4 italic text-neutral-500 my-6" />
  ),
  hr: () => <hr className="border-neutral-200 my-8" />,
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a {...props} className="text-brand-600 hover:text-brand-700 underline" />
  ),
};

export default async function BlogPostPage({ params }: Props) {
  const { locale, slug } = await params;
  const post = getPost(slug, locale);
  if (!post) notFound();

  const t = await getTranslations({ locale, namespace: "blog" });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    author: { "@type": "Person", name: post.author },
    datePublished: post.date,
    url: `${SITE_URL}/${locale}/blog/${slug}`,
  };

  return (
    <div className="pt-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Banner */}
      <div className="bg-gradient-to-br from-brand-800 to-brand-900 py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full bg-brand-600/40 text-brand-100 text-xs font-semibold"
              >
                {tag}
              </span>
            ))}
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight mb-4">
            {post.title}
          </h1>
          <div className="flex items-center gap-3 text-brand-200 text-sm">
            <span>{post.author}</span>
            <span>·</span>
            <span>
              {new Date(post.date).toLocaleDateString(
                locale === "bn" ? "bn-BD" : "en-GB",
                { year: "numeric", month: "long", day: "numeric" }
              )}
            </span>
          </div>
        </div>
      </div>

      {/* Article */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1 text-brand-600 text-sm font-medium hover:text-brand-700 mb-8 block"
        >
          {t("backToBlog")}
        </Link>

        <article>
          <MDXRemote source={post.content} components={mdxComponents} />
        </article>

        {/* Author card */}
        <div className="mt-12 p-6 rounded-2xl bg-brand-50 border border-brand-100 flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-brand-200 flex items-center justify-center shrink-0">
            <DoctorIcon />
          </div>
          <div>
            <p className="font-semibold text-neutral-900">{post.author}</p>
            <p className="text-sm text-neutral-500">BDS (DU) · PGT Oral & Maxillofacial Surgery, Dhaka Dental College</p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/appointment"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-brand-600 text-white font-semibold hover:bg-brand-700 transition-colors shadow"
          >
            Book an Appointment
          </Link>
        </div>
      </div>
    </div>
  );
}

function DoctorIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0d9488" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}
