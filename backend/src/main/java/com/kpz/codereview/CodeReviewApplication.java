package com.kpz.codereview;

import com.kpz.codereview.config.model.AppProfiles;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.PropertySource;

@SpringBootApplication
@PropertySource("classpath:env.properties")
public class CodeReviewApplication {

	public static void main(String[] args) {
		SpringApplication application =
				new SpringApplication(CodeReviewApplication.class);

		//Current profiles = [DEV_PROFILE, TEST_PROFILE]
		application.setAdditionalProfiles(AppProfiles.TEST_PROFILE.toString());
		application.run(args);
	}
}
