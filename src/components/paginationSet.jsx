"use client";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function PaginationSet({
  totalPosts,
  postsPerPage,
  currentPage,
  setCurrentPage,
}) {
  // Pagination logic
  const pageNumbers = [];
  const totalPages = Math.ceil(totalPosts / postsPerPage);

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const maxPageNum = 5; // Maximum page numbers to display at once
  const pageNumLimit = Math.floor(maxPageNum / 2); // Current page should be in the middle if possible

  const activePages = pageNumbers.slice(
    Math.max(0, currentPage - 1 - pageNumLimit),
    Math.min(currentPage - 1 + pageNumLimit + 1, pageNumbers.length)
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      // scroll to top of the page
      window.scrollTo({ top: 400, behavior: "smooth" });
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      // scroll to top of the page
      window.scrollTo({ top: 400, behavior: "smooth" });
    }
  };

  // Function to render page numbers with ellipsis
  const renderPages = () => {
    const renderedPages = activePages.map((page, idx) => (
      <PaginationItem key={idx}>
        <PaginationLink
          onClick={() => {
            setCurrentPage(page); // scroll to top of the page
            window.scrollTo({ top: 400, behavior: "smooth" });
          }}
          className={`
            transition-all duration-200 cursor-pointer border rounded-lg px-3 py-2 text-sm font-medium
            hover:shadow-md hover:scale-105 transform
            ${
              currentPage === page
                ? "bg-primary text-white border-primary shadow-lg scale-105"
                : "bg-white text-textcolor border-accent hover:bg-accent hover:border-primary"
            }
          `}
        >
          {page}
        </PaginationLink>
      </PaginationItem>
    ));

    // Add ellipsis at the start if necessary
    if (activePages[0] > 2) {
      renderedPages.unshift(
        <PaginationItem key="ellipsis-start">
          <PaginationEllipsis
            onClick={() => {
              setCurrentPage(activePages[0] - 1); // scroll to top of the page
              window.scrollTo({ top: 400, behavior: "smooth" });
            }}
            className="cursor-pointer px-3 py-2 text-sm transition-colors duration-200 text-secondary hover:bg-accent rounded-lg"
          />
        </PaginationItem>
      );
    }

    // Show the first page if it's not in the activePages
    if (activePages[0] > 1) {
      renderedPages.unshift(
        <PaginationItem key="page-1">
          <PaginationLink
            onClick={() => {
              setCurrentPage(1); // scroll to top of the page
              window.scrollTo({ top: 400, behavior: "smooth" });
            }}
            className="transition-all duration-200 cursor-pointer border rounded-lg px-3 py-2 text-sm font-medium bg-white border-accent text-textcolor hover:bg-accent hover:border-primary hover:shadow-md hover:scale-105 transform"
          >
            1
          </PaginationLink>
        </PaginationItem>
      );
    }

    // Add ellipsis at the end if necessary
    if (activePages[activePages.length - 1] < totalPages - 1) {
      renderedPages.push(
        <PaginationItem key="ellipsis-end">
          <PaginationEllipsis
            onClick={() => {
              setCurrentPage(activePages[activePages.length - 1] + 1);
              // scroll to top of the page
              window.scrollTo({ top: 400, behavior: "smooth" });
            }}
            className="cursor-pointer px-3 py-2 text-sm transition-colors duration-200 text-secondary hover:bg-accent rounded-lg"
          />
        </PaginationItem>
      );
    }

    // Show the last page if it's not in the activePages
    if (activePages[activePages.length - 1] < totalPages) {
      renderedPages.push(
        <PaginationItem key={`page-${totalPages}`}>
          <PaginationLink
            onClick={() => {
              setCurrentPage(totalPages); // scroll to top of the page
              window.scrollTo({ top: 400, behavior: "smooth" });
            }}
            className="transition-all duration-200 cursor-pointer border rounded-lg px-3 py-2 text-sm font-medium bg-white border-accent text-textcolor hover:bg-accent hover:border-primary hover:shadow-md hover:scale-105 transform"
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return renderedPages;
  };

  return (
    <div className="my-8 flex justify-center">
      <div className="inline-flex items-center">
        <Pagination>
          <PaginationContent className="gap-1 flex-wrap">
            <PaginationItem>
              <PaginationPrevious
                onClick={handlePrevPage}
                className={`
                  transition-all duration-200 cursor-pointer border rounded-lg px-4 py-2 text-sm font-medium
                  ${
                    currentPage === 1
                      ? "opacity-50 cursor-not-allowed bg-gray-100 border-accent text-gray-400"
                      : "bg-white border-accent text-textcolor hover:bg-accent hover:border-primary hover:shadow-md hover:scale-105 transform"
                  }
                `}
              />
            </PaginationItem>

            {renderPages()}

            <PaginationItem>
              <PaginationNext
                onClick={handleNextPage}
                className={`
                  transition-all duration-200 cursor-pointer border rounded-lg px-4 py-2 text-sm font-medium
                  ${
                    currentPage === totalPages
                      ? "opacity-50 cursor-not-allowed bg-gray-100 border-accent text-gray-400"
                      : "bg-white border-accent text-textcolor hover:bg-accent hover:border-primary hover:shadow-md hover:scale-105 transform"
                  }
                `}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
