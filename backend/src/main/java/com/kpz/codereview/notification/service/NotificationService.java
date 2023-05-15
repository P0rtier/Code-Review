package com.kpz.codereview.notification.service;

import com.kpz.codereview.notification.model.Notification;

import java.util.List;

public interface NotificationService {
    List<Notification> getAllUserNotifications(String userUUID);

    void deleteNotificationById(Long id);

    void deleteAll(List<Long> ids);

    void deleteAllForUser(String userUUID);

    void saveNotification(Notification notification);
}
