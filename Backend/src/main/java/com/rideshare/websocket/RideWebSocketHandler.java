package com.rideshare.websocket;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.Data;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.io.IOException;
import java.util.concurrent.ConcurrentHashMap;
import java.util.Map;

@Component
public class RideWebSocketHandler extends TextWebSocketHandler {

    private final ObjectMapper objectMapper = new ObjectMapper();
    private final Map<String, WebSocketSession> sessions = new ConcurrentHashMap<>();
    private final Map<Long, String> ridePassengerMap = new ConcurrentHashMap<>();

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        sessions.put(session.getId(), session);
        System.out.println("WebSocket connection established: " + session.getId());
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        sessions.remove(session.getId());
        System.out.println("WebSocket connection closed: " + session.getId());
        ridePassengerMap.values().removeIf(id -> id.equals(session.getId()));
    }

    @Override
    @SuppressWarnings("unchecked")
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        String payloadString = message.getPayload();
        System.out.println("Received message: " + payloadString);

        try {
            WsMessage wsMessage = objectMapper.readValue(payloadString, WsMessage.class);
            String event = wsMessage.getEvent();
            Map<String, Object> data = wsMessage.getData();

            if (event == null) return;

            switch (event) {
                case "registerPassenger":
                    if (data != null && data.containsKey("rideId")) {
                        Long rideId = Long.valueOf(data.get("rideId").toString());
                        ridePassengerMap.put(rideId, session.getId());
                        System.out.println("Passenger registered for ride: " + rideId + " with session: " + session.getId());
                    }
                    break;

                case "rideRequest":
                    broadcast("newRideRequest", data);
                    break;

                case "acceptRide":
                    broadcast("driverAccepted", data);
                    break;

                case "declineRide":
                    broadcast("driverDeclined", data);
                    break;

                case "rideStarted":
                    if (data != null && data.containsKey("rideId")) {
                        Long rideId = Long.valueOf(data.get("rideId").toString());
                        String passengerSessionId = ridePassengerMap.get(rideId);
                        if (passengerSessionId != null) {
                            sendToSession(passengerSessionId, "rideStarted", data);
                        } else {
                            System.out.println("Warning: Passenger session not found for ride ID: " + rideId);
                        }
                    }
                    break;

                case "driverLocationUpdate":
                    broadcast("driverLocation", data);
                    break;

                case "rideCompleted":
                    if (data != null && data.containsKey("rideId")) {
                        Long rideId = Long.valueOf(data.get("rideId").toString());
                        String passengerSessionId = ridePassengerMap.get(rideId);
                        if (passengerSessionId != null) {
                            sendToSession(passengerSessionId, "rideCompleted", data);
                        } else {
                            System.out.println("Warning: Passenger session not found for ride ID: " + rideId);
                        }
                    }
                    break;

                default:
                    System.out.println("Unknown event received: " + event);
                    break;
            }

        } catch (Exception e) {
            System.err.println("Error processing WebSocket message: " + e.getMessage());
            e.printStackTrace();
        }
    }

    @SuppressWarnings("unchecked")
    private void broadcast(String event, Object data) {
        WsMessage responseMessage = new WsMessage();
        responseMessage.setEvent(event);
        responseMessage.setData((Map<String, Object>) data);

        try {
            String jsonPayload = objectMapper.writeValueAsString(responseMessage);
            TextMessage textMessage = new TextMessage(jsonPayload);

            for (WebSocketSession session : sessions.values()) {
                if (session.isOpen()) {
                    session.sendMessage(textMessage);
                }
            }
        } catch (IOException e) {
            System.err.println("Error broadcasting message: " + e.getMessage());
        }
    }

    @SuppressWarnings("unchecked")
    private void sendToSession(String sessionId, String event, Object data) {
        WebSocketSession session = sessions.get(sessionId);
        if (session != null && session.isOpen()) {
            WsMessage responseMessage = new WsMessage();
            responseMessage.setEvent(event);
            responseMessage.setData((Map<String, Object>) data);

            try {
                String jsonPayload = objectMapper.writeValueAsString(responseMessage);
                session.sendMessage(new TextMessage(jsonPayload));
            } catch (IOException e) {
                System.err.println("Error sending message to session " + sessionId + ": " + e.getMessage());
            }
        }
    }

    @Data
    public static class WsMessage {
        private String event;
        private Map<String, Object> data;
    }
}
