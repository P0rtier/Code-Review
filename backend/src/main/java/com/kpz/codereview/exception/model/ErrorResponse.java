package com.kpz.codereview.exception.model;

import lombok.Builder;

/**
 * This record is used to represent errors in our API and should be always used with
 * ResponseEntity in @ExceptionHandler method. Example of a good ErrorResponse:
 * <pre>
 * 	var timeStamp = LocalDateTime.now();
 * 	var type = "/errors/not-found/user-not-found";
 * 	var title = "User was not found";
 * 	var status = HttpStatus.NOT_FOUND;
 * 	var detail = ex.getMessage();
 * 	var instance = request.getRequest().getRequestURI();
 *
 * 	var error =  ErrorResponse.builder()
 * 			.timestamp(timeStamp)
 * 			.type(type)
 * 			.title(title)
 * 			.status(status.value())
 * 			.detail(detail)
 * 			.instance(instance)
 * 			.build();
 * </pre>
 *
 * @param timestamp Always LocalDateTime.now(), timestamp of the moment when error occurred
 * @param type      A URI which represents type of the error
 * @param title     General, short description of the error
 * @param status    int HttpStatus code
 * @param detail    More detailed description of the code, might be the message of thrown exception
 * @param instance  A URI which led to an error
 */
@Builder
public record ErrorResponse(
        String timestamp,
        String type,
        String title,
        int status,
        String detail,
        String instance
) {
}
