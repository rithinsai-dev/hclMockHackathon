package com.hclMockHackathon.demo.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;

@Entity
@Table(name = "books")
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long bookId;

    @NotBlank(message = "Title is required")
    @Column(nullable = false)
    private String title;

    @NotBlank(message = "Author is required")
    @Column(nullable = false)
    private String author;

    @Column(nullable = false)
    private boolean available = true;

    public Book() {}

    public Book(Long bookId, String title, String author, boolean available) {
        this.bookId = bookId;
        this.title = title;
        this.author = author;
        this.available = available;
    }

    public Long getBookId()              { return bookId; }
    public void setBookId(Long bookId)   { this.bookId = bookId; }

    public String getTitle()             { return title; }
    public void setTitle(String title)   { this.title = title; }

    public String getAuthor()            { return author; }
    public void setAuthor(String author) { this.author = author; }

    public boolean isAvailable()                   { return available; }
    public void setAvailable(boolean available)    { this.available = available; }

    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private Long bookId;
        private String title;
        private String author;
        private boolean available = true;

        public Builder bookId(Long bookId)         { this.bookId = bookId; return this; }
        public Builder title(String title)         { this.title = title; return this; }
        public Builder author(String author)       { this.author = author; return this; }
        public Builder available(boolean available){ this.available = available; return this; }

        public Book build() {
            Book b = new Book();
            b.bookId    = this.bookId;
            b.title     = this.title;
            b.author    = this.author;
            b.available = this.available;
            return b;
        }
    }
}