package com.kpz.codereview.notification.service.impl;

import com.kpz.codereview.exception.model.EntityNotFoundException;
import com.kpz.codereview.notification.model.Notification;
import com.kpz.codereview.notification.repository.NotificationRepository;
import com.kpz.codereview.notification.service.NotificationService;
import com.kpz.codereview.user.account.service.AccountService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@RequiredArgsConstructor
@Service
public class NotificationServiceImpl implements NotificationService {
    private final NotificationRepository notificationRepository;
    private final AccountService accountService;


    @Override
    public List<Notification> getAllUserNotifications(String userUUID) {
        var user = accountService.findById(UUID.fromString(userUUID))
                .orElseThrow(EntityNotFoundException::new);

        return notificationRepository.findByUserEmail(user.getEmail());
    }

    @Override
    public void deleteNotificationById(Long id) {
        notificationRepository.deleteById(id);
    }

    @Override
    public void deleteAll(List<Long> ids) {
        notificationRepository.deleteAllById(ids);
    }

    @Override
    public void saveNotification(Notification notification) {
        notificationRepository.save(notification);
    }

    @Transactional
    @Override
    public void deleteAllForUser(String userUUID) {
        var user = accountService.findById(UUID.fromString(userUUID))
                .orElseThrow(EntityNotFoundException::new);

        notificationRepository.deleteAllByUserEmail(user.getEmail());
    }
}
