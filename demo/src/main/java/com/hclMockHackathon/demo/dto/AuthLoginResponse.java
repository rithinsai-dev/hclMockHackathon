package com.hclMockHackathon.demo.dto;

public class AuthLoginResponse {
    private String role;      // "ADMIN" or "MEMBER"
    private Long memberId;    // null for admin
    private String name;
    private String email;     // null for admin

    public AuthLoginResponse() {}

    public String getRole()              { return role; }
    public void setRole(String role)     { this.role = role; }
    public Long getMemberId()            { return memberId; }
    public void setMemberId(Long v)      { this.memberId = v; }
    public String getName()              { return name; }
    public void setName(String name)     { this.name = name; }
    public String getEmail()             { return email; }
    public void setEmail(String email)   { this.email = email; }

    public static Builder builder() { return new Builder(); }
    public static class Builder {
        private String role; private Long memberId; private String name; private String email;
        public Builder role(String v)     { this.role = v; return this; }
        public Builder memberId(Long v)   { this.memberId = v; return this; }
        public Builder name(String v)     { this.name = v; return this; }
        public Builder email(String v)    { this.email = v; return this; }
        public AuthLoginResponse build() {
            AuthLoginResponse r = new AuthLoginResponse();
            r.role = this.role; r.memberId = this.memberId;
            r.name = this.name; r.email = this.email;
            return r;
        }
    }
}
