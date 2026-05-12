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

    @Column(nullable = false)
    private String password;

    public Member() {}

    public Long getMemberId()                  { return memberId; }
    public void setMemberId(Long memberId)     { this.memberId = memberId; }
    public String getName()                    { return name; }
    public void setName(String name)           { this.name = name; }
    public String getEmail()                   { return email; }
    public void setEmail(String email)         { this.email = email; }
    public String getPassword()                { return password; }
    public void setPassword(String password)   { this.password = password; }

    public static Builder builder() { return new Builder(); }
    public static class Builder {
        private Long memberId;
        private String name;
        private String email;
        private String password;

        public Builder memberId(Long v)   { this.memberId = v; return this; }
        public Builder name(String v)     { this.name = v; return this; }
        public Builder email(String v)    { this.email = v; return this; }
        public Builder password(String v) { this.password = v; return this; }

        public Member build() {
            Member m = new Member();
            m.memberId = this.memberId;
            m.name     = this.name;
            m.email    = this.email;
            m.password = this.password;
            return m;
        }
    }
}
