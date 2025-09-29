"use client";
import React from "react";
import { Title } from "../texties";
import useFetchMultipleDocsByFieldNames from "@/lib/hooks/useFetchMultipleDocsByFieldNames";
import { NoDataFound } from "../Loadings/ErrorComp";
import { BlogCardPro } from "../cards";
import { TourLoading } from "../Loadings/LoadingComp";
import { LuUserRoundPen } from "react-icons/lu";
import { NotebookPen } from "lucide-react";
import useFetchAll from "@/lib/hooks/useFetchAll";
import { findItName } from "../Functions";
import moment from "moment";
import SmallScreenSwipers from "../SmallScreenSwiper";

function BlogsHome() {
  const { data: blogs, isLoading } = useFetchMultipleDocsByFieldNames(
    "blogs",
    [
      { fieldName: "isPublished", value: true },
      // { fieldName: "isFeatured", value: true },
    ],
    {
      fieldName: "createdAt",
      value: "desc",
    }
  );
  const { data: blogCategoriesdata, isLoading: isFetchingBlogCategories } =
    useFetchAll("blog-categories");

  return (
    <section className="sm:py-28 py-10 bg-highlight/50">
      <div className="respons">
        <Title
          badge={<NotebookPen />}
          title={"Our Articles"}
          subHeading={
            "Explore our latest articles, insights, and updates on Tanzania's wildlife, nature, and adventure."
          }
        />

        <div className="relative mt-12">
          <div className="sm:block hidden w-full">
            {
              // loading
              isLoading || isFetchingBlogCategories ? (
                <div className="grid w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {[...Array(3)].map((_, i) => (
                    <TourLoading key={i} />
                  ))}
                </div>
              ) : blogs?.length > 0 ? (
                <div className="grid w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {blogs?.slice(0, 3).map((item, index) => (
                    <div
                      className="w-full"
                      data-aos="fade-up"
                      data-aos-delay={index * 200}
                      key={index}
                    >
                      <BlogCardPro
                        item={{
                          ...item,
                          category: blogCategoriesdata?.find(
                            (cat) => cat?.id === item?.category
                          )?.title,
                          date: moment(item.createdAt?.seconds * 1000).format(
                            "ll"
                          ),
                        }}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <NoDataFound text="No Blog Post Found" />
              )
            }
          </div>
          {/* small screen */}
          <div className="sm:hidden block w-full">
            <SmallScreenSwipers
              datas={blogs}
              Children={({ item, index }) => (
                <BlogCardPro
                  item={{
                    ...item,
                    category: blogCategoriesdata?.find(
                      (cat) => cat?.id === item?.category
                    )?.title,
                    date: moment(item.createdAt?.seconds * 1000).format("ll"),
                  }}
                />
              )}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default BlogsHome;
