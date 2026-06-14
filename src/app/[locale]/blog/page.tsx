import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { getAllPosts } from "@/lib/blog";
import { SITE_URL } from "@/lib/constants";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    title: t("blogTitle"),
    alternates: { canonical: `${SITE_URL}/${locale}/blog` },
  };
}

export default async function BlogListPage({ params }: Props) {
  const { locale } = await params;
  const posts = getAllPosts(locale);
  const t = await getTranslations({ locale, namespace: "blog" });

  return (
    <div className="pt-16">
      <div className="bg-gradient-to-br from-brand-800 to-brand-900 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3">
            {t("title")}
          </h1>
          <p className="text-brand-200 text-lg">{t("subtitle")}</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {posts.length === 0 ? (
          <p className="text-center text-neutral-500">No posts yet.</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="bg-white rounded-2xl border border-neutral-100 shadow-sm card-hover overflow-hidden"
              >
                {/* Placeholder image header */}
                <div className="h-40 bg-gradient-to-br from-brand-100 to-brand-200 flex items-center justify-center">
                  <BlogIllustration />
                </div>
                <div className="p-5">
                  {post.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="inline-block px-2 py-0.5 rounded-full bg-brand-50 text-brand-600 text-[11px] font-semibold mr-1 mb-2"
                    >
                      {tag}
                    </span>
                  ))}
                  <h2 className="text-neutral-900 font-bold text-base leading-snug mb-2">
                    <Link href={`/blog/${post.slug}`} className="hover:text-brand-600 transition-colors">
                      {post.title}
                    </Link>
                  </h2>
                  <p className="text-neutral-500 text-sm leading-relaxed line-clamp-2 mb-4">
                    {post.description}
                  </p>
                  <div className="flex items-center justify-between text-xs text-neutral-400">
                    <span>
                      {t("postedOn")} {new Date(post.date).toLocaleDateString(locale === "bn" ? "bn-BD" : "en-GB", {
                        year: "numeric", month: "long", day: "numeric"
                      })}
                    </span>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="text-brand-600 font-semibold hover:text-brand-700 transition-colors"
                    >
                      {t("readMore")} →
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function BlogIllustration() {
  return (
    <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="8" y="6" width="44" height="48" rx="6" fill="#0d9488" opacity="0.2" />
      <rect x="14" y="14" width="32" height="4" rx="2" fill="#0d9488" opacity="0.6" />
      <rect x="14" y="22" width="26" height="3" rx="1.5" fill="#0d9488" opacity="0.4" />
      <rect x="14" y="29" width="30" height="3" rx="1.5" fill="#0d9488" opacity="0.4" />
      <rect x="14" y="36" width="20" height="3" rx="1.5" fill="#0d9488" opacity="0.3" />
    </svg>
  );
}
