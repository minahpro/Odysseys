// pages/Blogs.js
"use client";
import WildlifeBanner from "@/components/banners/WildlifeBanner";
import { BlogCardPro } from "@/components/cards";
import { findItTitle } from "@/components/Functions";
import ZanzibarTripsHome from "@/components/homeComponents/ZanzibarTrips";
import { InputField } from "@/components/inputField";
import { NoDataFound } from "@/components/Loadings/ErrorComp";
import { PageLoading } from "@/components/Loadings/LoadingComp";
import PaginationSet from "@/components/paginationSet";
import TitleHeader from "@/components/titleHeader";
import useFetchAll from "@/lib/hooks/useFetchAll";
import useFetchMultipleDocsByFieldNames from "@/lib/hooks/useFetchMultipleDocsByFieldNames";
import { PenBox } from "lucide-react";
import moment from "moment";
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
    let filteredBlogs = blogsData || [];

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
      filteredBlogs = filteredBlogs.filter(
        (blog) =>
          blog?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          blog?.overview?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setBlogs(filteredBlogs);
    setCurrentPage(1); // Reset to first page when filters change
  }, [blogsData, selectedCategory, searchTerm, blogCategoriesdata]);

  // ************ PAGINATION VARIABLES *************
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = blogs?.slice(firstPostIndex, lastPostIndex);

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle category selection
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  return (
    <>
      <TitleHeader
        first={"Travel "}
        last={"News."}
        image={"/images/bg/7.png"}
        sub={
          " Discover insider tips, travel guides, and inspiring stories from our  adventures across Tanzania's most incredible destinations."
        }
      />

      <section className="sm:py-28 py-10 bg-accent/40">
        <div className="respons flex-all flex-col">
          <span
            data-aos="fade-up"
            className={`bg-primary text-accent h-14 w-14 flex-all rounded-full text-xs font-bold border border-secondary/20 inline-block mb-6`}
          >
            <PenBox />
          </span>
          <h2
            data-aos="fade-up"
            data-aos-delay="100"
            className="md:text-4xl text-3xl text-secondary font-jua mb-4"
          >
            All About Tanzania
          </h2>

          <div className="grid w-full grid-cols-12 mt-12 gap-6">
            {/* Sidebar with Search and Categories */}
            <div
              data-aos="fade-right"
              className="col-span-12 lg:col-span-3 space-y-6"
            >
              {/* Search Section */}
              <div className="bg-white border border-secondary/20 rounded-xl p-6">
                <h3 className="font-bold text-primary mb-4">Search Blogs</h3>
                <InputField
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="!border-accent/30"
                />
              </div>

              {/* Categories Section */}
              <div className="bg-white rounded-xl p-6 border border-secondary/20">
                <h3 className="font-bold text-primary mb-4">Categories</h3>
                <div className="space-y-2">
                  {isFetchingBlogCategories ? (
                    <div className="space-y-2">
                      {[...Array(5)].map((_, index) => (
                        <div
                          key={index}
                          className="h-10 bg-accent/20 rounded animate-pulse"
                        />
                      ))}
                    </div>
                  ) : (
                    blogCategories.map((category, index) => (
                      <button
                        key={index}
                        onClick={() => handleCategoryChange(category.title)}
                        className={`${
                          selectedCategory === category.title
                            ? "bg-primary text-accent"
                            : "bg-accent/15 text-primary hover:bg-accent/25"
                        } border text-start border-accent/30 text-sm font-bold w-full py-3 rounded transitions capitalize`}
                      >
                        {category.title}
                        {category.title !== "all" && (
                          <span className="ml-2 text-xs opacity-70">
                            (
                            {blogsData?.filter(
                              (blog) =>
                                blog?.category ===
                                findItTitle({
                                  data: blogCategoriesdata,
                                  title: category.title,
                                })
                            ).length || 0}
                            )
                          </span>
                        )}
                        {category.title === "all" && (
                          <span className="ml-2 text-xs opacity-70">
                            ({blogsData?.length || 0})
                          </span>
                        )}
                      </button>
                    ))
                  )}
                </div>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="col-span-12 lg:col-span-9">
              {/* Results Header */}
              <div className="bg-secondary rounded p-6 mb-6 border border-secondary/20">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      {selectedCategory === "all"
                        ? "All Blogs"
                        : selectedCategory}
                    </h3>
                    <p className="text-accent text-sm">
                      {blogs.length} {blogs.length === 1 ? "blog" : "blogs"}{" "}
                      found
                      {searchTerm && ` for "${searchTerm}"`}
                    </p>
                  </div>

                  <button
                    onClick={() => setSearchTerm("")}
                    className="text-sm bg-accent py-2 px-4 font-bold text-primary hover:text-secondary transition-colors"
                  >
                    Clear search
                  </button>
                </div>
              </div>

              {/* Blog Grid */}
              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[...Array(6)].map((_, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-2xl p-6 shadow-sm animate-pulse"
                    >
                      <div className="h-48 bg-accent/20 rounded-xl mb-6" />
                      <div className="space-y-4">
                        <div className="flex justify-between">
                          <div className="h-4 bg-accent/20 rounded w-20" />
                          <div className="h-4 bg-accent/20 rounded w-16" />
                        </div>
                        <div className="h-6 bg-accent/20 rounded w-3/4" />
                        <div className="space-y-2">
                          <div className="h-4 bg-accent/20 rounded" />
                          <div className="h-4 bg-accent/20 rounded w-5/6" />
                        </div>
                        <div className="h-8 bg-accent/20 rounded w-24" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : blogs.length === 0 ? (
                <NoDataFound
                  message={
                    searchTerm
                      ? `No blogs found for "${searchTerm}"`
                      : selectedCategory === "all"
                        ? "No blogs available"
                        : `No blogs found in "${selectedCategory}" category`
                  }
                />
              ) : (
                <>
                  <div
                    data-aos="fade-up"
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                  >
                    {currentPosts?.map((blog, index) => (
                      <div
                        key={blog.id || index}
                        data-aos="fade-up"
                        data-aos-delay={index * 100}
                      >
                        <BlogCardPro
                          item={{
                            ...blog,
                            category: blogCategoriesdata?.find(
                              (cat) => cat?.id === blog?.category
                            )?.title,
                            date: moment(
                              blog?.createdAt?.seconds * 1000
                            ).format("ll"),
                          }}
                        />
                      </div>
                    ))}
                  </div>

                  {/* Pagination */}
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
                </>
              )}
            </div>
          </div>
        </div>
      </section>
      <WildlifeBanner />
      <ZanzibarTripsHome />
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
