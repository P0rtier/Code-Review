package com.kpz.codereview.notification.controller;

import com.kpz.codereview.auth.service.JwtService;
import com.kpz.codereview.notification.model.IdQuery;
import com.kpz.codereview.notification.model.Notification;
import com.kpz.codereview.notification.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/notifications")
public class NotificationController {
    private final NotificationService notificationService;
    private final JwtService jwtService;

    @GetMapping
    List<Notification> getAllNotifications(@RequestHeader(HttpHeaders.AUTHORIZATION) String token) {
        var userUUID = jwtService.getSubjectWithoutPrefix(token);

        return notificationService.getAllUserNotifications(userUUID);
    }

    @DeleteMapping("/{id}")
    void deleteNotificationById(@PathVariable Long id) {
        notificationService.deleteNotificationById(id);
    }

    @DeleteMapping
    void deleteAllUserNotifications(@RequestHeader(HttpHeaders.AUTHORIZATION) String token) {
        var userUUID = jwtService.getSubjectWithoutPrefix(token);
        notificationService.deleteAllForUser(userUUID);
    }

    @DeleteMapping("/list")
    void deleteAllSpecifiedNotifications(@RequestBody IdQuery query) {
        notificationService.deleteAll(query.getIds());
    }
}
