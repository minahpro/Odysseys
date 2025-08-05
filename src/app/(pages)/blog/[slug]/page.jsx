"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Calendar,
  Share2,
  Phone,
  Mail,
  MapPin,
  Eye,
  Clock,
} from "lucide-react";
import { ActionButton } from "@/components/buttons";
import { PlainTitle, SingleHeader } from "@/components/texties";
import { SideBanner3, SideBanner4 } from "@/components/banners/SidebarBanners";
import { getSingleDocByFieldName } from "@/firebase/databaseOperations";
import useFetchAll from "@/lib/hooks/useFetchAll";
import { useParams } from "next/navigation";
import moment from "moment";
import { NoDataFound } from "@/components/Loadings/ErrorComp";
import { SingleDetailsLoading } from "@/components/Loadings/LoadingComp";
import BlogsHome from "@/components/homeComponents/BlogsHome";

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
      <main className="respons lg:pb-10 pb-6 sm:pt-10 pt-2">
        {isLoading || isFetchingBlogTags || isFetchingBlogCategories ? (
          <SingleDetailsLoading />
        ) : blogData?.id ? (
          <div className="space-y-8">
            {/* Main Content */}
            <div>
              {/* Hero Section */}
              <section className="md:py-40 py-20 rounded-xl bg-gradient-to-r from-black via-gray-900 to-black relative overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                  <img
                    src={
                      blogData?.photos[0] ||
                      "/placeholder.svg?height=600&width=1200&query=travel blog"
                    }
                    alt={blogData?.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="max-w-4xl mx-auto">
                  <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
                    <span className="bg-primary rounded-full text-black font-semibold px-4 py-1">
                      {blogData?.category}
                    </span>
                    {blogData?.tags?.slice(0, 3).map((tag, index) => (
                      <span
                        key={index}
                        variant="outline"
                        className="border-gray-600 border text-textcolor text-sm py-1 px-4 rounded-full"
                      >
                        #{tag}
                      </span>
                    ))}

                    <div className="text-center mt-4 mb-8">
                      <PlainTitle first={blogData?.title} />
                    </div>

                    <div
                      data-aos="fade-up"
                      className="flex flex-wrap items-center justify-center gap-6 text-textcolor"
                    >
                      <div className="flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-primary" />
                        <span>
                          {new Date(
                            blogData?.createdAt?.seconds * 1000
                          ).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-5 h-5 text-primary" />
                        <span>6 Mins read</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Eye className="w-5 h-5 text-primary" />
                        <span>455 views</span>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              {/* Article Header */}
              <article className="overflow-hidden">
                {/* Article Content */}
                <div className="md:p-12 py-6">
                  <div className="prose prose-lg max-w-none">
                    <div
                      className="text-white leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: blogData?.overview }}
                    />
                  </div>
                </div>
              </article>
            </div>
          </div>
        ) : (
          <NoDataFound text={"Blog not found"} />
        )}
      </main>
      <BlogsHome />
    </>
  );
}
