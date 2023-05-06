package com.kpz.codereview.notification.model;


public enum NotificationType {
    CODE_REVIEW("Code review"),
    LEADERBOARD("Leaderboard");

    private final String text;

    NotificationType(final String text) {
        this.text = text;
    }

    public String toString() {
        return text;
    }
}
