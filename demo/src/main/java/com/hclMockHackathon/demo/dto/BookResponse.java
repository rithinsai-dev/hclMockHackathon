package com.hclMockHackathon.demo.dto;

public class BookResponse {

    private Long bookId;
    private String title;
    private String author;
    private boolean available;

    public BookResponse() {}
    public BookResponse(Long bookId, String title, String author, boolean available) {
        this.bookId = bookId; this.title = title; this.author = author; this.available = available;
    }

    public Long getBookId()                        { return bookId; }
    public void setBookId(Long bookId)             { this.bookId = bookId; }
    public String getTitle()                       { return title; }
    public void setTitle(String title)             { this.title = title; }
    public String getAuthor()                      { return author; }
    public void setAuthor(String author)           { this.author = author; }
    public boolean isAvailable()                   { return available; }
    public void setAvailable(boolean available)    { this.available = available; }

    public static Builder builder() { return new Builder(); }
    public static class Builder {
        private Long bookId; private String title; private String author; private boolean available;
        public Builder bookId(Long v)          { this.bookId = v; return this; }
        public Builder title(String v)         { this.title = v; return this; }
        public Builder author(String v)        { this.author = v; return this; }
        public Builder available(boolean v)    { this.available = v; return this; }
        public BookResponse build()            { return new BookResponse(bookId, title, author, available); }
    }
}
