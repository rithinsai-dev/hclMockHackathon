package com.hclMockHackathon.demo.dto;

public class AuthLoginRequest {
    private String email;
    private String password;

    public AuthLoginRequest() {}

    public String getEmail()             { return email; }
    public void setEmail(String email)   { this.email = email; }
    public String getPassword()          { return password; }
    public void setPassword(String p)    { this.password = p; }
}
