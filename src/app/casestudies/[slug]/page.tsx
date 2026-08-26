import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogHero from "../components/Header";
import BlogBody from "../components/body1";
import CTASection from "../components/CTA";
import { getBlogBySlug, blogs } from "../../../../public/data/blogs";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return blogs.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const blog = getBlogBySlug(slug);
  if (!blog) return {};

  const title = `${blog.title} | Repeatless`;
  return {
    title,
    description: blog.excerpt,
    alternates: { canonical: `/casestudies/${blog.slug}` },
    openGraph: {
      title,
      description: blog.excerpt,
      url: `https://www.repeatless.in/casestudies/${blog.slug}`,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: blog.excerpt,
    },
  };
}

export default async function BlogPage({ params }: Props) {
  const { slug } = await params;
  const blog = getBlogBySlug(slug);
  if (!blog) return notFound();

  return (
    <div>
      <section className="w-full max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-[150px] pt-12">
        <BlogHero
          title={blog.hero.title}
          description={blog.hero.description}
          meta={blog.hero.meta}
          video={blog.hero.video}
          image={blog.image}
        />
        <BlogBody sections={blog.body.sections} solution={blog.hero.meta.solution} />
      </section>
      <CTASection />
    </div>
  );
}



