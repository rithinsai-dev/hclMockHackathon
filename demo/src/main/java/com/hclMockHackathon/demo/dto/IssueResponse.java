package com.hclMockHackathon.demo.dto;

import java.time.LocalDateTime;

public class IssueResponse {

    private Long issueId;
    private Long bookId;
    private String bookTitle;
    private String bookAuthor;
    private Long memberId;
    private String memberName;
    private LocalDateTime issueDate;
    private LocalDateTime returnDate;
    private boolean active;

    public IssueResponse() {}

    public Long getIssueId()                           { return issueId; }
    public void setIssueId(Long v)                     { this.issueId = v; }
    public Long getBookId()                            { return bookId; }
    public void setBookId(Long v)                      { this.bookId = v; }
    public String getBookTitle()                       { return bookTitle; }
    public void setBookTitle(String v)                 { this.bookTitle = v; }
    public String getBookAuthor()                      { return bookAuthor; }
    public void setBookAuthor(String v)                { this.bookAuthor = v; }
    public Long getMemberId()                          { return memberId; }
    public void setMemberId(Long v)                    { this.memberId = v; }
    public String getMemberName()                      { return memberName; }
    public void setMemberName(String v)                { this.memberName = v; }
    public LocalDateTime getIssueDate()                { return issueDate; }
    public void setIssueDate(LocalDateTime v)          { this.issueDate = v; }
    public LocalDateTime getReturnDate()               { return returnDate; }
    public void setReturnDate(LocalDateTime v)         { this.returnDate = v; }
    public boolean isActive()                          { return active; }
    public void setActive(boolean v)                   { this.active = v; }

    public static Builder builder() { return new Builder(); }
    public static class Builder {
        private Long issueId, bookId, memberId;
        private String bookTitle, bookAuthor, memberName;
        private LocalDateTime issueDate, returnDate;
        private boolean active;

        public Builder issueId(Long v)            { this.issueId = v; return this; }
        public Builder bookId(Long v)             { this.bookId = v; return this; }
        public Builder bookTitle(String v)        { this.bookTitle = v; return this; }
        public Builder bookAuthor(String v)       { this.bookAuthor = v; return this; }
        public Builder memberId(Long v)           { this.memberId = v; return this; }
        public Builder memberName(String v)       { this.memberName = v; return this; }
        public Builder issueDate(LocalDateTime v) { this.issueDate = v; return this; }
        public Builder returnDate(LocalDateTime v){ this.returnDate = v; return this; }
        public Builder active(boolean v)          { this.active = v; return this; }

        public IssueResponse build() {
            IssueResponse r = new IssueResponse();
            r.issueId    = this.issueId;
            r.bookId     = this.bookId;
            r.bookTitle  = this.bookTitle;
            r.bookAuthor = this.bookAuthor;
            r.memberId   = this.memberId;
            r.memberName = this.memberName;
            r.issueDate  = this.issueDate;
            r.returnDate = this.returnDate;
            r.active     = this.active;
            return r;
        }
    }
}
