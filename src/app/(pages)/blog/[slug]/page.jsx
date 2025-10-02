"use client";
import { useEffect, useState } from "react";
import { Calendar, Eye, Clock, Folder } from "lucide-react";
import { PlainTitle } from "@/components/texties";
import { getSingleDocByFieldName } from "@/firebase/databaseOperations";
import useFetchAll from "@/lib/hooks/useFetchAll";
import { useParams } from "next/navigation";
import { NoDataFound } from "@/components/Loadings/ErrorComp";
import { SingleDetailsLoading } from "@/components/Loadings/LoadingComp";
import BlogsHome from "@/components/homeComponents/BlogsHome";
import { PrimaryButton } from "@/components/buttons";
import moment from "moment";

export default function BlogDetailsPage() {
  const params = useParams();
  const slug = params.slug;
  const [blog, setBlog] = useState(null);
  const [didSucceed, setDidSucceed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // *********** FETCH DATA ***********
  const { data: blogTags, isLoading: isFetchingBlogTags } =
    useFetchAll("blog-tags");
  const { data: blogCategories, isLoading: isFetchingBlogCategories } =
    useFetchAll("blog-categories");

  // *********** FETCH BLOG ***********
  const fetchBlog = async () => {
    const rs = await getSingleDocByFieldName(
      "blogs",
      [
        { fieldName: "isPublished", value: true },
        { fieldName: "slug", value: slug },
      ],
      { fieldName: "createdAt", value: "asc" }
    );

    if (rs.didSucceed) {
      setDidSucceed(true);
      setBlog(rs.document);
    } else {
      console.log(rs.error);

      setDidSucceed(false);
      return;
    }
    setIsLoading(false);
  };

  // *********** USE EFFECT ***********
  useEffect(() => {
    fetchBlog();
  }, [slug]);

  // *********** GET BLOG WITH TAGS AND CATEGORIES TITLES ***********
  const getBlogWithTagsAndCategories = () => {
    if (blog) {
      const tags = blogTags?.filter((tag) => blog?.tags?.includes(tag?.id));
      const category = blogCategories?.find(
        (category) => blog?.category === category?.id
      );

      return {
        ...blog,
        tags: tags?.map((tag) => tag?.title),
        category: category?.title,
      };
    }
  };

  // *********** RENDER ***********
  const blogData = getBlogWithTagsAndCategories();

  return (
    <>
      {isLoading || isFetchingBlogTags || isFetchingBlogCategories ? (
        <SingleDetailsLoading />
      ) : blogData?.id ? (
        <div className="space-y-8">
          {/* Main Content */}
          <div>
            {/* Hero Section */}
            <section className="md:pt-52 pt-24 pb-24 md:pb-32 rounded-xl bg-gradient-to-r from-primary via-primary to-black relative overflow-hidden">
              <div className="absolute inset-0 opacity-20">
                <img
                  src={
                    blogData?.featuredImage ||
                    "/placeholder.svg?height=600&width=1200&query=travel blog"
                  }
                  alt={blogData?.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="max-w-4xl mx-auto">
                <div className="flex-all flex-wrap flex-col gap-4">
                  <h2
                    data-aos="fade-up"
                    data-aos-delay="100"
                    className="md:text-4xl text-3xl text-center text-accent font-jua"
                  >
                    {blogData?.title}
                  </h2>
                  <div className="flex-all flex-wrap gap-4">
                    {blogData?.tags?.slice(0, 3).map((tag, index) => (
                      <span
                        key={index}
                        className="border-secondary/30 bg-accent border text-primary text-xs font-semibold py-1 px-3 rounded-full"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </section>
            <div className="bg-accent/40 py-8">
              <div className="respons flex-wrap flex gap-4 justify-between items-center">
                <div className="flex flex-wrap items-center gap-6 text-primary">
                  <div className="flex items-center gap-2">
                    <span className="w-10 h-10 flex-all bg-primary rounded-full flex-all">
                      <Calendar className="w-4 h-4 text-accent" />
                    </span>
                    <span>
                      {moment(blogData?.createdAt?.seconds * 1000).format(
                        "lll"
                      )}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-10 h-10 flex-all bg-primary rounded-full flex-all">
                      <Clock className="w-4 h-4 text-accent" />
                    </span>
                    <span>6 Mins read</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-10 h-10 flex-all bg-primary rounded-full flex-all">
                      <Folder className="w-4 h-4 text-accent" />
                    </span>
                    <span>{blogData?.category || "---"}</span>
                  </div>
                </div>

                <PrimaryButton className="bg-secondary py-4 text-sm text-white hover:bg-primary hover:text-accent">
                  Book Tour With Us
                </PrimaryButton>
              </div>
            </div>
            {/* Article Header */}
            <main className="respons lg:pb-10 pb-6 sm:pt-10 pt-2">
              <div className="prose prose-lg max-w-none">
                <div
                  className="text-primary leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: blogData?.overview }}
                />
              </div>
            </main>
          </div>
        </div>
      ) : (
        <NoDataFound text={"Blog not found"} />
      )}

      <BlogsHome />
    </>
  );
}
