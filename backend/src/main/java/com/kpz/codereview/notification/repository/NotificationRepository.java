package com.kpz.codereview.notification.repository;

import com.kpz.codereview.notification.model.Notification;
import org.springframework.data.repository.ListCrudRepository;

import java.util.List;

public interface NotificationRepository extends ListCrudRepository<Notification, Long> {
    List<Notification> findByUserEmail(String userEmail);
}
