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
      window.scrollTo({ top: 600, behavior: "smooth" });
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      // scroll to top of the page
      window.scrollTo({ top: 600, behavior: "smooth" });
    }
  };

  // Consistent button styles
  const baseButtonStyles =
    "transition-all duration-200 cursor-pointer border rounded-lg px-3 py-2 text-sm font-medium hover:shadow-md hover:scale-105 transform";
  const activeButtonStyles =
    "bg-primary text-accent hover:bg-secondary hover:text-white border-primary/10 shadow-lg scale-105";

  const inactiveButtonStyles =
    "bg-white text-primary border-accent/30 hover:bg-accent/20 hover:border-secondary";
  const disabledButtonStyles =
    "opacity-50 cursor-not-allowed bg-accent/10 border-accent/30 text-primary/50";

  // Function to render page numbers with ellipsis
  const renderPages = () => {
    const renderedPages = activePages.map((page, idx) => (
      <PaginationItem key={idx}>
        <PaginationLink
          onClick={() => {
            setCurrentPage(page);
            window.scrollTo({ top: 600, behavior: "smooth" });
          }}
          className={`${baseButtonStyles} ${
            currentPage === page ? activeButtonStyles : inactiveButtonStyles
          }`}
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
              setCurrentPage(activePages[0] - 1);
              window.scrollTo({ top: 600, behavior: "smooth" });
            }}
            className="cursor-pointer px-3 py-2 text-sm transition-all duration-200 text-primary hover:bg-accent/20 rounded-lg hover:scale-105"
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
              setCurrentPage(1);
              window.scrollTo({ top: 600, behavior: "smooth" });
            }}
            className={`${baseButtonStyles} ${inactiveButtonStyles}`}
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
              window.scrollTo({ top: 600, behavior: "smooth" });
            }}
            className="cursor-pointer px-3 py-2 text-sm transition-all duration-200 text-primary hover:bg-accent/20 rounded-lg hover:scale-105"
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
              setCurrentPage(totalPages);
              window.scrollTo({ top: 600, behavior: "smooth" });
            }}
            className={`${baseButtonStyles} ${inactiveButtonStyles}`}
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return renderedPages;
  };

  // Don't render pagination if there's only one page or no pages
  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="my-8 flex justify-center">
      <div className="inline-flex items-center">
        <Pagination>
          <PaginationContent className="gap-2 flex-wrap">
            <PaginationItem>
              <PaginationPrevious
                onClick={handlePrevPage}
                className={`${baseButtonStyles} px-4 ${
                  currentPage === 1
                    ? disabledButtonStyles
                    : inactiveButtonStyles
                }`}
                disabled={currentPage === 1}
              />
            </PaginationItem>

            {renderPages()}

            <PaginationItem>
              <PaginationNext
                onClick={handleNextPage}
                className={`${baseButtonStyles} px-4 ${
                  currentPage === totalPages
                    ? disabledButtonStyles
                    : inactiveButtonStyles
                }`}
                disabled={currentPage === totalPages}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
