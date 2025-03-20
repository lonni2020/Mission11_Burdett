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
        public IActionResult GetBooks(int pageHowMany=5, int pageNum=1, string sortOrder ="asc" )
        {
            IQueryable<Book> query = _bookContext.Books;

            // Apply sorting based on the title
            if (sortOrder.ToLower() == "desc")
            {
                query = query.OrderByDescending(b => b.Title);
            }
            else
            {
                query = query.OrderBy(b => b.Title);
            }

            var bookList = query
                .Skip((pageNum-1)* pageHowMany)
                .Take(pageHowMany)
                .ToList();

            var totalNumBooks = _bookContext.Books.Count();

            var bookObject = new
            {
                Book = bookList,
                totalNumBooks = totalNumBooks,
            };

            return Ok(bookObject);
        }
    }
}
