package com.hclMockHackathon.demo.service;

import com.hclMockHackathon.demo.dto.AuthLoginRequest;
import com.hclMockHackathon.demo.dto.AuthLoginResponse;
import com.hclMockHackathon.demo.entity.Member;
import com.hclMockHackathon.demo.exception.UnauthorizedException;
import com.hclMockHackathon.demo.repository.MemberRepository;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private static final String ADMIN_EMAIL    = "admin";
    private static final String ADMIN_PASSWORD = "admin123";

    private final MemberRepository memberRepository;

    public AuthService(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

    public AuthLoginResponse login(AuthLoginRequest request) {
        // ── Admin check ───────────────────────────────────────────────────────
        if (ADMIN_EMAIL.equals(request.getEmail()) && ADMIN_PASSWORD.equals(request.getPassword())) {
            return AuthLoginResponse.builder()
                    .role("ADMIN")
                    .name("Library Admin")
                    .build();
        }

        // ── Member check ──────────────────────────────────────────────────────
        Member member = memberRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new UnauthorizedException("Invalid email or password."));

        if (!member.getPassword().equals(request.getPassword())) {
            throw new UnauthorizedException("Invalid email or password.");
        }

        return AuthLoginResponse.builder()
                .role("MEMBER")
                .memberId(member.getMemberId())
                .name(member.getName())
                .email(member.getEmail())
                .build();
    }
}
