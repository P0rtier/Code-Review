package com.kpz.codereview;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.PropertySource;

@SpringBootApplication
@PropertySource("classpath:env.properties")
public class CodeReviewApplication {

	public static void main(String[] args) {
		SpringApplication application =
				new SpringApplication(CodeReviewApplication.class);

		//Current profiles = [dev, test]
		application.setAdditionalProfiles("dev");
		application.run(args);
	}
}
