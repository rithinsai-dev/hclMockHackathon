package com.hclMockHackathon.demo.service;

import com.hclMockHackathon.demo.dto.MemberRequest;
import com.hclMockHackathon.demo.dto.MemberResponse;
import com.hclMockHackathon.demo.entity.Member;
import com.hclMockHackathon.demo.exception.BusinessRuleException;
import com.hclMockHackathon.demo.exception.ResourceNotFoundException;
import com.hclMockHackathon.demo.repository.MemberRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class MemberService {

    private final MemberRepository memberRepository;

    public MemberService(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

    public MemberResponse registerMember(MemberRequest request) {
        if (memberRepository.existsByEmail(request.getEmail())) {
            throw new BusinessRuleException("A member with email '" + request.getEmail() + "' already exists.");
        }
        Member member = Member.builder()
                .name(request.getName())
                .email(request.getEmail())
                .build();
        return toResponse(memberRepository.save(member));
    }

    @Transactional(readOnly = true)
    public MemberResponse getMemberById(Long memberId) {
        return toResponse(getMemberEntityById(memberId));
    }

    public Member getMemberEntityById(Long memberId) {
        return memberRepository.findById(memberId)
                .orElseThrow(() -> new ResourceNotFoundException("Member", memberId));
    }

    private MemberResponse toResponse(Member member) {
        return MemberResponse.builder()
                .memberId(member.getMemberId())
                .name(member.getName())
                .email(member.getEmail())
                .build();
    }
}
