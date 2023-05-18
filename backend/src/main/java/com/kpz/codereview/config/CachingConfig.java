package com.kpz.codereview.config;

import com.github.benmanes.caffeine.cache.Caffeine;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.Cache;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.cache.caffeine.CaffeineCache;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.concurrent.TimeUnit;


@Configuration
@EnableCaching
public class CachingConfig {
    @Value("${caching.review.stats.ttl.minutes}")
    private Long REVIEW_STATS_CACHE_TTL_MINUTES;

    @Value("${caching.review.stats.max.size}")
    private Long REVIEW_STATS_CACHE_MAX_SIZE;

    @Bean
    public Cache createReviewStatsCache() {
        var cacheProperties = Caffeine.newBuilder()
                .expireAfterWrite(REVIEW_STATS_CACHE_TTL_MINUTES, TimeUnit.MINUTES)
                .maximumSize(REVIEW_STATS_CACHE_MAX_SIZE)
                .build();

        return new CaffeineCache("reviewStats", cacheProperties);
    }
}
