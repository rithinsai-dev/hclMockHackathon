package com.hclMockHackathon.demo.dto;

public class MemberResponse {

    private Long memberId;
    private String name;
    private String email;

    public MemberResponse() {}
    public MemberResponse(Long memberId, String name, String email) {
        this.memberId = memberId; this.name = name; this.email = email;
    }

    public Long getMemberId()              { return memberId; }
    public void setMemberId(Long v)        { this.memberId = v; }
    public String getName()                { return name; }
    public void setName(String v)          { this.name = v; }
    public String getEmail()               { return email; }
    public void setEmail(String v)         { this.email = v; }

    public static Builder builder() { return new Builder(); }
    public static class Builder {
        private Long memberId; private String name; private String email;
        public Builder memberId(Long v)   { this.memberId = v; return this; }
        public Builder name(String v)     { this.name = v; return this; }
        public Builder email(String v)    { this.email = v; return this; }
        public MemberResponse build()     { return new MemberResponse(memberId, name, email); }
    }
}
