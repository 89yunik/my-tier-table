const Pagination = ({ pageNum, hasNextPage, onPageChange }) => {
  return (
    <div>
      <button className="btn btn-primary" onClick={() => onPageChange(pageNum - 1)} disabled={pageNum === 1}>
        Prev
      </button>
      <button className="btn btn-primary" onClick={() => onPageChange(pageNum + 1)} disabled={!hasNextPage}>
        Next
      </button>
    </div>
  )
}

export default Pagination
