import React from 'react';
import '../index.css'

function Pagination({ currentPage, totalPages, goToNextPage, goToPreviousPage }) {




    return (
        <div className="pagination">
            <button className="paginationBtn" onClick={goToPreviousPage} disabled={currentPage === 1}>
                Previous
            </button>
            <span>{`Page ${currentPage} of ${totalPages}`}</span>
            <button className="paginationBtn" onClick={goToNextPage} disabled={currentPage === totalPages}>
                Next
            </button>
        </div>
    );
}

export default Pagination;