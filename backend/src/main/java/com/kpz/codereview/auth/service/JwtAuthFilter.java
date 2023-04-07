package com.kpz.codereview.auth.service;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.NoSuchElementException;

@Component
@RequiredArgsConstructor
public class JwtAuthFilter extends OncePerRequestFilter {
    private final JwtService jwtService;
    private final UserDetailsService userService;

    @Override
    protected void doFilterInternal(@NotNull HttpServletRequest request, @NotNull HttpServletResponse response,
                                    @NotNull FilterChain filterChain) throws ServletException, IOException {

        final String authHeader = request.getHeader("Authorization");

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        String token = authHeader.substring(7);

        if (jwtService.isTokenInvalid(token)) {
            filterChain.doFilter(request, response);
            return;
        }

        if (jwtService.isTokenExpired(token)) {
            filterChain.doFilter(request, response);
            return;
        }

        String subject = jwtService.getSubject(token);

        if (subject != null && subject.startsWith("Access") &&
                SecurityContextHolder.getContext().getAuthentication() == null) {

            subject = subject.substring(6);
            UserDetails user;

            try {
                user = userService.loadUserByUsername(subject);

            } catch (NoSuchElementException e) {
                filterChain.doFilter(request, response);
                return;
            }

            var authToken = new UsernamePasswordAuthenticationToken(user, null, null);
            authToken.setDetails(
                    new WebAuthenticationDetailsSource().buildDetails(request)
            );

            SecurityContextHolder.getContext().setAuthentication(authToken);
        }

        filterChain.doFilter(request, response);
    }
}
