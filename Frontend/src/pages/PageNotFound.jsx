
function PageNotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white text-center p-6">
  <h2 className="text-6xl font-bold text-red-600 mb-4">Error 404</h2>
  <h3 className="text-2xl text-gray-700">Page Not Found</h3>
  <a
    href="/"
    className="mt-6 inline-block bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600 transition hover:bg-blue-500 "
  >
    Go to Homepage
  </a>
</div>

  )
}

export default PageNotFound
