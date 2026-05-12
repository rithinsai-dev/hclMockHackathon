package com.hclMockHackathon.demo.controller;

import com.hclMockHackathon.demo.dto.IssueRequest;
import com.hclMockHackathon.demo.dto.IssueResponse;
import com.hclMockHackathon.demo.service.IssueService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/issues")
public class IssueController {

    private final IssueService issueService;

    public IssueController(IssueService issueService) {
        this.issueService = issueService;
    }

   
    @PostMapping("/issue")
    public ResponseEntity<IssueResponse> issueBook(@Valid @RequestBody IssueRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(issueService.issueBook(request));
    }

    
    @PutMapping("/return/{issueId}")
    public ResponseEntity<IssueResponse> returnBook(@PathVariable Long issueId) {
        return ResponseEntity.ok(issueService.returnBook(issueId));
    }
}
