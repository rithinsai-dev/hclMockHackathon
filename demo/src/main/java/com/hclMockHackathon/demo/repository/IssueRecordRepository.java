package com.hclMockHackathon.demo.repository;

import com.hclMockHackathon.demo.entity.IssueRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IssueRecordRepository extends JpaRepository<IssueRecord, Long> {

    List<IssueRecord> findByMember_MemberId(Long memberId);

    long countByMember_MemberIdAndActiveTrue(Long memberId);

    boolean existsByBook_BookIdAndActiveTrue(Long bookId);
}
