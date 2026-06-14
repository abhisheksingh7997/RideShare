package com.rideshare.controller;

import com.rideshare.model.User;
import com.rideshare.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/profile")
public class ProfileController {
	  private final UserRepository userRepository;

	    public ProfileController(UserRepository userRepository) {
	        this.userRepository = userRepository;
	    }
   

  @GetMapping
    public ResponseEntity<?> getProfile() {
    	 System.out.println("Repository Injected = " + userRepository);
        String email = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Map<String, Object> response = new HashMap<>();
        response.put("message", "Welcome!");

        Map<String, Object> userData = new HashMap<>();
        userData.put("id", user.getId());
        userData.put("username", user.getUsername());
        userData.put("email", user.getEmail());
        userData.put("role", user.getRole());
        userData.put("phoneNo", user.getPhoneNo());

        response.put("user", userData);
        
        return ResponseEntity.ok(response);
    }
}
