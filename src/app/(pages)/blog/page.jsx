// pages/Blogs.js
"use client";
import { BlogCardPro } from "@/components/cards";
import { findItTitle } from "@/components/Functions";
import TrekkingTours from "@/components/homeComponents/TrekkingHome";
import { InputField } from "@/components/inputField";
import { NoDataFound } from "@/components/Loadings/ErrorComp";
import { PageLoading, TourLoading } from "@/components/Loadings/LoadingComp";
import PaginationSet from "@/components/paginationSet";
import { PlainTitle } from "@/components/texties";
import TitleHeader from "@/components/titleHeader";
import useFetchAll from "@/lib/hooks/useFetchAll";
import useFetchMultipleDocsByFieldNames from "@/lib/hooks/useFetchMultipleDocsByFieldNames";
import React, { Suspense, useEffect, useState } from "react";

function Blogs() {
  // ************* STATES *************
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 12;
  const [blogs, setBlogs] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // **************** FETCH DATAS ****************
  const { data: blogsData, isLoading } = useFetchMultipleDocsByFieldNames(
    "blogs",
    [{ fieldName: "isPublished", value: true }],
    {
      fieldName: "createdAt",
      value: "desc",
    }
  );
  const { data: blogCategoriesdata, isLoading: isFetchingBlogCategories } =
    useFetchAll("blog-categories");

  const blogCategories = [
    {
      id: 1,
      title: "all",
    },
    ...blogCategoriesdata,
  ];

  // *************** FILTERED BLOGS ***************
  useEffect(() => {
    let filteredBlogs = blogsData;

    // Filter by category
    if (selectedCategory !== "all") {
      filteredBlogs = filteredBlogs?.filter(
        (blog) =>
          blog?.category ===
          findItTitle({ data: blogCategoriesdata, title: selectedCategory })
      );
    }
    // Filter by search term
    if (searchTerm) {
      filteredBlogs = filteredBlogs.filter((blog) =>
        blog?.title?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setBlogs(filteredBlogs);
  });

  // ************ PAGINATION VARIABLES *************
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = blogs?.slice(firstPostIndex, lastPostIndex);
  return (
    <>
      <TitleHeader
        first={"Travel "}
        last={"Blog."}
        image={"/images/tourImages/manya.jpg"}
      />
      <main className="respons lg:py-20 py-10">
        {/* Page Introduction */}

        <div className="text-center mb-12">
          <PlainTitle first={"Stories from"} last={"Tanzania"} />
          <p className="text-lg text-textcolor max-w-3xl mx-auto mb-8 mt-4">
            Discover insider tips, travel guides, and inspiring stories from our
            adventures across Tanzania's most incredible destinations.
          </p>
        </div>
        {/* Search and Categories */}
        <div className="mb-12 flex justify-between md:flex-nowrap flex-wrap items-center gap-6">
          <InputField
            placeholder="Search articles..."
            name="search"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
            className="w-96"
          />

          {/* Category Filter */}
          <div className="flex sm:flex-nowrap flex-wrap justify-center gap-3">
            {blogCategories?.map((category, index) => (
              <button
                key={index}
                onClick={() => setSelectedCategory(category?.title)}
                className={`px-6 py-2 rounded-full capitalize font-medium transition-all duration-300 ${
                  selectedCategory === category?.title
                    ? "bg-primary"
                    : "bg-highlight/40 text-textcolor hover:bg-highlight border border-gray-800"
                }`}
              >
                {category?.title}
              </button>
            ))}
          </div>
        </div>

        {/* blogs */}
        {
          // loading
          isLoading || isFetchingBlogCategories ? (
            <div className="grid w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
              {[...Array(6)].map((_, i) => (
                <TourLoading key={i} />
              ))}
            </div>
          ) : currentPosts?.length > 0 ? (
            <div className="grid w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
              {currentPosts?.map((item, index) => (
                <BlogCardPro item={item} key={index} />
              ))}
            </div>
          ) : (
            <NoDataFound text="No Blog Post Found" />
          )
        }
        {/* Paginations */}
        {blogs?.length > postsPerPage && (
          <div className="mt-12">
            <PaginationSet
              totalPosts={blogs?.length}
              postsPerPage={postsPerPage}
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
            />
          </div>
        )}
      </main>
      <TrekkingTours />
    </>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<PageLoading />}>
      <Blogs />
    </Suspense>
  );
}
