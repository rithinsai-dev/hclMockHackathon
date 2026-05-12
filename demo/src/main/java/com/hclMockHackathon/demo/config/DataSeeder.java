package com.hclMockHackathon.demo.config;

import com.hclMockHackathon.demo.entity.Book;
import com.hclMockHackathon.demo.entity.IssueRecord;
import com.hclMockHackathon.demo.entity.Member;
import com.hclMockHackathon.demo.repository.BookRepository;
import com.hclMockHackathon.demo.repository.IssueRecordRepository;
import com.hclMockHackathon.demo.repository.MemberRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
public class DataSeeder implements CommandLineRunner {

    private static final Logger log = LoggerFactory.getLogger(DataSeeder.class);

    private final BookRepository bookRepository;
    private final MemberRepository memberRepository;
    private final IssueRecordRepository issueRecordRepository;

    public DataSeeder(BookRepository bookRepository,
                      MemberRepository memberRepository,
                      IssueRecordRepository issueRecordRepository) {
        this.bookRepository = bookRepository;
        this.memberRepository = memberRepository;
        this.issueRecordRepository = issueRecordRepository;
    }

    @Override
    public void run(String... args) {
        log.info("=== Seeding sample data ===");

        Book b1 = bookRepository.save(Book.builder().title("Clean Code").author("Robert C. Martin").available(true).build());
        Book b2 = bookRepository.save(Book.builder().title("Effective Java").author("Joshua Bloch").available(true).build());
        Book b3 = bookRepository.save(Book.builder().title("The Pragmatic Programmer").author("Andrew Hunt").available(true).build());
        Book b4 = bookRepository.save(Book.builder().title("Design Patterns").author("Gang of Four").available(true).build());
        bookRepository.save(Book.builder().title("Spring Boot in Action").author("Craig Walls").available(true).build());
        bookRepository.save(Book.builder().title("Java Concurrency in Practice").author("Brian Goetz").available(true).build());
        bookRepository.save(Book.builder().title("Head First Design Patterns").author("Eric Freeman").available(true).build());
        bookRepository.save(Book.builder().title("Refactoring").author("Martin Fowler").available(true).build());
        log.info("Seeded {} books", bookRepository.count());

        Member m1 = memberRepository.save(Member.builder().name("Alice Johnson").email("alice@library.com").password("alice123").build());
        Member m2 = memberRepository.save(Member.builder().name("Bob Smith").email("bob@library.com").password("bob123").build());
        memberRepository.save(Member.builder().name("Carol White").email("carol@library.com").password("carol123").build());
        memberRepository.save(Member.builder().name("David Brown").email("david@library.com").password("david123").build());
        log.info("Seeded {} members", memberRepository.count());

        b1.setAvailable(false); bookRepository.save(b1);
        issueRecordRepository.save(IssueRecord.builder().book(b1).member(m1).issueDate(LocalDateTime.now().minusDays(5)).active(true).build());

        b2.setAvailable(false); bookRepository.save(b2);
        issueRecordRepository.save(IssueRecord.builder().book(b2).member(m1).issueDate(LocalDateTime.now().minusDays(3)).active(true).build());

        b3.setAvailable(false); bookRepository.save(b3);
        issueRecordRepository.save(IssueRecord.builder().book(b3).member(m2).issueDate(LocalDateTime.now().minusDays(7)).active(true).build());

        issueRecordRepository.save(IssueRecord.builder().book(b4).member(m2)
                .issueDate(LocalDateTime.now().minusDays(14))
                .returnDate(LocalDateTime.now().minusDays(7))
                .active(false).build());

        log.info("Seeded {} issue records", issueRecordRepository.count());
        log.info("=== Seeding complete ===");
        log.info("Admin login → email: admin | password: admin123");
        log.info("Member login → email: alice@library.com | password: alice123");
    }
}
