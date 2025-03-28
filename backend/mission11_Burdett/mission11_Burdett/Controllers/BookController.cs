using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using mission11_Burdett.Data;

namespace mission11_Burdett.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {
        private BookDbContext _bookContext;

        public BookController(BookDbContext temp)
        {
            _bookContext = temp;
        }

        [HttpGet(Name = "GetBooks")]
        public IActionResult GetBooks(int pageHowMany = 5, int pageNum = 1, string sortOrder = "asc", [FromQuery] List<string>? categories = null)
        {
            IQueryable<Book> query = _bookContext.Books.AsQueryable();

            // Apply category filtering
            if (categories != null && categories.Any())
            {
                query = query.Where(b => categories.Contains(b.Category));
            }

            // Apply sorting based on the title
            query = sortOrder.ToLower() == "desc" ? query.OrderByDescending(b => b.Title) : query.OrderBy(b => b.Title);

            // Apply pagination
            var bookList = query
                .Skip((pageNum - 1) * pageHowMany)
                .Take(pageHowMany)
                .ToList();

            var totalNumBooks = query.Count(); // Count after filtering

            var bookObject = new
            {
                Books = bookList,
                TotalNumBooks = totalNumBooks
            };

            return Ok(bookObject);
        }

        [HttpGet("GetCategory")]
        public IActionResult GetCategory()
        {
            var categories = _bookContext.Books
                .Select(p => p.Category)
                .Distinct()
                .ToList();

            return Ok(categories);
        }
    }
}
