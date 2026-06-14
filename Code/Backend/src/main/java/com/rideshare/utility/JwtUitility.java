//package com.rideshare.utility;
//
//import java.util.Date;
//
//import io.jsonwebtoken.Jwts;
//import io.jsonwebtoken.SignatureAlgorithm;
//import io.jsonwebtoken.security.Keys;
//
//public class JwtUitility {
//	private final String SECRET = "mySecretKeymySecretKeymySecretKeymySecretKey";
//
//// generating token
//	public String generateToken(String username) {
//		return Jwts.builder().setSubject(username).setIssuedAt(new Date())
//				.setExpiration(new Date(System.currentTimeMillis() + 86400000))
//				.signWith(Keys.hmacShaKeyFor(SECRET.getBytes()), SignatureAlgorithm.HS256).compact();
//	}
//
//	// extracting username
//	public String extractUsername(String token) {
//		return Jwts.parserBuilder().setSigningKey(Keys.hmacShaKeyFor(SECRET.getBytes())).build().parseClaimsJws(token)
//				.getBody().getSubject();
//	}
//
//	public boolean validateToken(String token, String username) {
//		return extractUsername(token).equals(username);
//	}
//}
