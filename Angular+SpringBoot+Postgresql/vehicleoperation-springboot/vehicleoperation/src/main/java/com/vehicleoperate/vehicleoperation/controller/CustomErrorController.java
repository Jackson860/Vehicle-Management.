package com.vehicleoperate.vehicleoperation.controller;

import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.RequestDispatcher;
import jakarta.servlet.http.HttpServletRequest;

@RestController
public class CustomErrorController implements ErrorController {

	private static final String ERROR_PATH = "/error";

	@RequestMapping(ERROR_PATH)
	public ResponseEntity<String> handleError(HttpServletRequest request) {
		Object status = request.getAttribute(RequestDispatcher.ERROR_STATUS_CODE);
		HttpStatus httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;

		if (status != null) {
			int statusCode = Integer.parseInt(status.toString());
			httpStatus = HttpStatus.valueOf(statusCode);
		}

		String errorMessage = "An unexpected error occurred";
		if (httpStatus == HttpStatus.NOT_FOUND) {
			errorMessage = "<h1>The requested resource was not found</h1>";
		} else if (httpStatus == HttpStatus.UNAUTHORIZED) {
			errorMessage = "Unauthorized access";
		}

		return ResponseEntity.status(httpStatus).body(errorMessage);
	}

}
