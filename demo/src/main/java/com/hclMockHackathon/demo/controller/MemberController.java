package com.hclMockHackathon.demo.controller;

import com.hclMockHackathon.demo.dto.IssueResponse;
import com.hclMockHackathon.demo.dto.MemberRequest;
import com.hclMockHackathon.demo.dto.MemberResponse;
import com.hclMockHackathon.demo.service.IssueService;
import com.hclMockHackathon.demo.service.MemberService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/members")
public class MemberController {

    private final MemberService memberService;
    private final IssueService issueService;

    public MemberController(MemberService memberService, IssueService issueService) {
        this.memberService = memberService;
        this.issueService = issueService;
    }

    @PostMapping
    public ResponseEntity<MemberResponse> registerMember(@Valid @RequestBody MemberRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(memberService.registerMember(request));
    }

    @GetMapping("/{memberId}")
    public ResponseEntity<MemberResponse> getMemberById(@PathVariable Long memberId) {
        return ResponseEntity.ok(memberService.getMemberById(memberId));
    }

   
    @GetMapping("/{memberId}/issues")
    public ResponseEntity<List<IssueResponse>> getMemberIssues(@PathVariable Long memberId) {
        return ResponseEntity.ok(issueService.getIssuesByMember(memberId));
    }
}
