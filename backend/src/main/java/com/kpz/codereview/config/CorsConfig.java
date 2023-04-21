package com.kpz.codereview.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.List;

@Configuration
@EnableWebMvc
public class CorsConfig implements WebMvcConfigurer {
    @Value("${security.cors.allowed.origins}")
    private List<String> ALLOWED_ORIGINS;

    @Value("${security.cors.allowed.methods}")
    private List<String> ALLOWED_METHODS;
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins(
                        ALLOWED_ORIGINS.toArray(new String[0])
                )
                .allowedMethods(
                        ALLOWED_METHODS.toArray(new String[0])
                );
    }
}