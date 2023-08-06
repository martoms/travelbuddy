import React, { useEffect, useRef } from 'react';
import $ from 'jquery';

const Pagination = ({ items, perPage }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    // Initialize pagination when the component mounts
    const paginate = {
      startPos: function (pageNumber, perPage) {
        // determine what array position to start from
        // based on the current page and # per page
        return pageNumber * perPage;
      },

      getPage: function (items, startPos, perPage) {
        // declare an empty array to hold our page items
        var page = [];

        // only get items after the starting position
        items = items.slice(startPos, items.length);

        // loop remaining items until max per page
        for (var i = 0; i < perPage; i++) {
          page.push(items[i]);
        }

        return page;
      },

      totalPages: function (items, perPage) {
        // determine the total number of pages
        return Math.ceil(items.length / perPage);
      },

      createBtns: function (totalPages, currentPage) {
        // create buttons to manipulate the current page
        var pagination = $('<div class="pagination" />');

        // add a "first" button
        pagination.append('<span class="pagination-button">&#10094;</span>');

        // add pages in between
        for (var i = 1; i <= totalPages; i++) {
          // truncate list when too large
          if (totalPages > 5 && currentPage !== i) {
            // if on the first two pages
            if (currentPage === 1 || currentPage === 2) {
              // show the first 5 pages
              if (i > 5) continue;
              // if on the last two pages
            } else if (currentPage === totalPages || currentPage === totalPages - 1) {
              // show the last 5 pages
              if (i < totalPages - 4) continue;
              // otherwise show 5 pages w/ the current in the middle
            } else {
              if (i < currentPage - 2 || i > currentPage + 2) {
                continue;
              }
            }
          }

          // markup for the page button
          var pageBtn = $('<span class="pagination-button page-num" />');

          // add the active class for the current page
          if (i === currentPage) {
            pageBtn.addClass('active');
          }

          // set text to the page number
          pageBtn.text(i);

          // add the button to the container
          pagination.append(pageBtn);
        }

        // add a "last" button
        pagination.append($('<span class="pagination-button">&#10095;</span>'));

        return pagination;
      },

      createPage: function (items, currentPage, perPage) {
        // remove pagination from the page
        $('.pagination').remove();

        // set context for the items
        var container = items.parent(),
          // detach items from the page and cast as an array
          items = items.detach().toArray(),
          // get the start position and select items for the page
          startPos = this.startPos(currentPage - 1, perPage),
          page = this.getPage(items, startPos, perPage);

        // loop items and re-add them to the page
        $.each(page, function () {
          // prevent empty items that return as Window
          if (this.window === undefined) {
            container.append($(this));
          }
        });

        // prep pagination buttons and add them to the page
        var totalPages = this.totalPages(items, perPage),
          pageButtons = this.createBtns(totalPages, currentPage);

        container.after(pageButtons);
      },
    };

    const itemsContainer = $(containerRef.current);
    itemsContainer.paginate(perPage);

    // Clean up pagination when the component unmounts
    return () => {
      $('.pagination-button').off('click');
    };
  }, [items, perPage]);

  return (
    <>
      <div ref={containerRef}>
        {/* Render your items here (e.g., a list) */}
        {items}
      </div>
    </>
  );
};

export default Pagination;
