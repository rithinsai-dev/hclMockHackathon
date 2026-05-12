package com.hclMockHackathon.demo.service;

import com.hclMockHackathon.demo.dto.BookRequest;
import com.hclMockHackathon.demo.dto.BookResponse;
import com.hclMockHackathon.demo.entity.Book;
import com.hclMockHackathon.demo.exception.ResourceNotFoundException;
import com.hclMockHackathon.demo.repository.BookRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class BookService {

    private final BookRepository bookRepository;

    public BookService(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    public BookResponse addBook(BookRequest request) {
        Book book = Book.builder()
                .title(request.getTitle())
                .author(request.getAuthor())
                .available(true)
                .build();
        return toResponse(bookRepository.save(book));
    }

    @Transactional(readOnly = true)
    public List<BookResponse> getAllBooks() {
        return bookRepository.findAll().stream().map(this::toResponse).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<BookResponse> getAvailableBooks() {
        return bookRepository.findByAvailableTrue().stream().map(this::toResponse).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<BookResponse> searchBooks(String title, String author) {
        return bookRepository.searchByTitleAndOptionalAuthor(title, author)
                .stream().map(this::toResponse).collect(Collectors.toList());
    }

    public Book getBookEntityById(Long bookId) {
        return bookRepository.findById(bookId)
                .orElseThrow(() -> new ResourceNotFoundException("Book", bookId));
    }

    public void saveBook(Book book) {
        bookRepository.save(book);
    }

    private BookResponse toResponse(Book book) {
        return BookResponse.builder()
                .bookId(book.getBookId())
                .title(book.getTitle())
                .author(book.getAuthor())
                .available(book.isAvailable())
                .build();
    }
}
