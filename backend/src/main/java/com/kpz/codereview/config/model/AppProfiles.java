package com.kpz.codereview.config.model;

public enum AppProfiles {
    DEV_PROFILE("dev"),
    TEST_PROFILE("test");

    private final String text;

    AppProfiles(final String text) {
        this.text = text;
    }

    @Override
    public String toString() {
        return text;
    }
}
