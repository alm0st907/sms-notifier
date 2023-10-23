package main

import (
	"io"
	"net/http"
)

func HealthCheckHandler(w http.ResponseWriter, r *http.Request) {
	// A very simple health check.
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)

	if r.Method == "POST" {
		body, _ := io.ReadAll(r.Body)
		_, err := io.WriteString(w, string(body))
		if err != nil {
			print("Error writing response")
			return
		}
		return
	}
	// In the future we could report back on the status of our DB, or our cache
	// (e.g. Redis) by performing a simple PING, and include them in the response.
	_, err := io.WriteString(w, `{"alive": true}`)
	if err != nil {
		print("Error writing response")
		return
	}
}
