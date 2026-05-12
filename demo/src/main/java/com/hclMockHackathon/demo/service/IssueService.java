package com.hclMockHackathon.demo.service;

import com.hclMockHackathon.demo.dto.IssueRequest;
import com.hclMockHackathon.demo.dto.IssueResponse;
import com.hclMockHackathon.demo.entity.Book;
import com.hclMockHackathon.demo.entity.IssueRecord;
import com.hclMockHackathon.demo.entity.Member;
import com.hclMockHackathon.demo.exception.BusinessRuleException;
import com.hclMockHackathon.demo.exception.ResourceNotFoundException;
import com.hclMockHackathon.demo.repository.IssueRecordRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class IssueService {

    private static final int MAX_ACTIVE_ISSUES = 3;

    private final IssueRecordRepository issueRecordRepository;
    private final BookService bookService;
    private final MemberService memberService;

    public IssueService(IssueRecordRepository issueRecordRepository,
                        BookService bookService,
                        MemberService memberService) {
        this.issueRecordRepository = issueRecordRepository;
        this.bookService = bookService;
        this.memberService = memberService;
    }

    public IssueResponse issueBook(IssueRequest request) {
        Book book = bookService.getBookEntityById(request.getBookId());
        Member member = memberService.getMemberEntityById(request.getMemberId());

        if (!book.isAvailable()) {
            throw new BusinessRuleException(
                    "Book '" + book.getTitle() + "' is currently not available for issue.");
        }

        long activeCount = issueRecordRepository.countByMember_MemberIdAndActiveTrue(member.getMemberId());
        if (activeCount >= MAX_ACTIVE_ISSUES) {
            throw new BusinessRuleException(
                    "Member '" + member.getName() + "' already has " + MAX_ACTIVE_ISSUES +
                    " active book issues. Please return a book before issuing another.");
        }

        book.setAvailable(false);
        bookService.saveBook(book);

        IssueRecord record = IssueRecord.builder()
                .book(book)
                .member(member)
                .issueDate(LocalDateTime.now())
                .active(true)
                .build();

        return toResponse(issueRecordRepository.save(record));
    }

    public IssueResponse returnBook(Long issueId) {
        IssueRecord record = issueRecordRepository.findById(issueId)
                .orElseThrow(() -> new ResourceNotFoundException("IssueRecord", issueId));

        if (!record.isActive()) {
            throw new BusinessRuleException(
                    "Issue record #" + issueId + " is already closed (book was previously returned).");
        }

        record.setReturnDate(LocalDateTime.now());
        record.setActive(false);

        Book book = record.getBook();
        book.setAvailable(true);
        bookService.saveBook(book);

        return toResponse(issueRecordRepository.save(record));
    }

    @Transactional(readOnly = true)
    public List<IssueResponse> getIssuesByMember(Long memberId) {
        memberService.getMemberEntityById(memberId);
        return issueRecordRepository.findByMember_MemberId(memberId)
                .stream().map(this::toResponse).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<IssueResponse> getAllIssues() {
        return issueRecordRepository.findAll()
                .stream().map(this::toResponse).collect(Collectors.toList());
    }

    private IssueResponse toResponse(IssueRecord record) {
        return IssueResponse.builder()
                .issueId(record.getIssueId())
                .bookId(record.getBook().getBookId())
                .bookTitle(record.getBook().getTitle())
                .bookAuthor(record.getBook().getAuthor())
                .memberId(record.getMember().getMemberId())
                .memberName(record.getMember().getName())
                .issueDate(record.getIssueDate())
                .returnDate(record.getReturnDate())
                .active(record.isActive())
                .build();
    }
}
