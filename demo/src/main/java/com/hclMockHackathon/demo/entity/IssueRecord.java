package com.hclMockHackathon.demo.entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "issue_records")
public class IssueRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long issueId;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "book_id", nullable = false)
    private Book book;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "member_id", nullable = false)
    private Member member;

    @Column(nullable = false)
    private LocalDateTime issueDate;

    private LocalDateTime returnDate;

   
    @Column(nullable = false)
    private boolean active = true;

    public IssueRecord() {}

    public Long getIssueId()                       { return issueId; }
    public void setIssueId(Long issueId)           { this.issueId = issueId; }

    public Book getBook()                          { return book; }
    public void setBook(Book book)                 { this.book = book; }

    public Member getMember()                      { return member; }
    public void setMember(Member member)           { this.member = member; }

    public LocalDateTime getIssueDate()                  { return issueDate; }
    public void setIssueDate(LocalDateTime issueDate)    { this.issueDate = issueDate; }

    public LocalDateTime getReturnDate()                 { return returnDate; }
    public void setReturnDate(LocalDateTime returnDate)  { this.returnDate = returnDate; }

    public boolean isActive()                      { return active; }
    public void setActive(boolean active)          { this.active = active; }

    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private Book book;
        private Member member;
        private LocalDateTime issueDate;
        private LocalDateTime returnDate;
        private boolean active = true;

        public Builder book(Book book)                       { this.book = book; return this; }
        public Builder member(Member member)                 { this.member = member; return this; }
        public Builder issueDate(LocalDateTime issueDate)    { this.issueDate = issueDate; return this; }
        public Builder returnDate(LocalDateTime returnDate)  { this.returnDate = returnDate; return this; }
        public Builder active(boolean active)                { this.active = active; return this; }

        public IssueRecord build() {
            IssueRecord r = new IssueRecord();
            r.book       = this.book;
            r.member     = this.member;
            r.issueDate  = this.issueDate;
            r.returnDate = this.returnDate;
            r.active     = this.active;
            return r;
        }
    }
}