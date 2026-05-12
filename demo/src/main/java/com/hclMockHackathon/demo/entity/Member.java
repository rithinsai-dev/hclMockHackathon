package com.hclMockHackathon.demo.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

@Entity
@Table(name = "members")
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memberId;

    @NotBlank(message = "Name is required")
    @Column(nullable = false)
    private String name;

    @Email(message = "Invalid email format")
    @NotBlank(message = "Email is required")
    @Column(nullable = false, unique = true)
    private String email;

    public Member() {}

    public Member(Long memberId, String name, String email) {
        this.memberId = memberId;
        this.name = name;
        this.email = email;
    }

    public Long getMemberId()              { return memberId; }
    public void setMemberId(Long memberId) { this.memberId = memberId; }

    public String getName()              { return name; }
    public void setName(String name)     { this.name = name; }

    public String getEmail()             { return email; }
    public void setEmail(String email)   { this.email = email; }

    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private Long memberId;
        private String name;
        private String email;

        public Builder memberId(Long memberId) { this.memberId = memberId; return this; }
        public Builder name(String name)       { this.name = name; return this; }
        public Builder email(String email)     { this.email = email; return this; }

        public Member build() {
            Member m = new Member();
            m.memberId = this.memberId;
            m.name     = this.name;
            m.email    = this.email;
            return m;
        }
    }
}