// main.go
package main

import (
	"encoding/json"
	"fmt"
	"net/http"
)

// Event represents a calendar event
type Event struct {
	ID          string `json:"id"`
	Title       string `json:"title"`
	Description string `json:"description"`
	Start       string `json:"start"`
	End         string `json:"end"`
}

var events = []Event{
	{ID: "1", Title: "Meeting 1", Description: "Discuss project", Start: "2023-01-15T10:00", End: "2023-01-15T11:00"},
	{ID: "2", Title: "Meeting 2", Description: "Review tasks", Start: "2023-01-16T14:00", End: "2023-01-16T15:00"},
}

func homeHandler(w http.ResponseWriter, r *http.Request) {
	http.ServeFile(w, r, "static/html/calendar.html")
}

func getEventsHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(events)
}

func createEventHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var event Event
	json.NewDecoder(r.Body).Decode(&event)
	events = append(events, event)

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(event)
}

func updateEventHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPut {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var updatedEvent Event
	json.NewDecoder(r.Body).Decode(&updatedEvent)

	for i, event := range events {
		if event.ID == updatedEvent.ID {
			events[i] = updatedEvent
			break
		}
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(updatedEvent)
}

func deleteEventHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodDelete {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var deletedEvent Event
	json.NewDecoder(r.Body).Decode(&deletedEvent)

	for i, event := range events {
		if event.ID == deletedEvent.ID {
			events = append(events[:i], events[i+1:]...)
			break
		}
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(nil)
}
func main() {
	http.HandleFunc("/", homeHandler)
	http.Handle("/static/", http.StripPrefix("/static/", http.FileServer(http.Dir("static"))))
	http.HandleFunc("/events", getEventsHandler)
	http.HandleFunc("/events/create", createEventHandler)
	http.HandleFunc("/events/update", updateEventHandler)
	http.HandleFunc("/events/delete", deleteEventHandler)

	fmt.Println("Server started on :8080")
	http.ListenAndServe("127.0.0.1:8080", nil)
}
