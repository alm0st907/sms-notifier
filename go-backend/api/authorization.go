package handler

import (
	"net/http"
)

func AuthorizedCall(w http.ResponseWriter, r *http.Request) {
	if r.Method == "GET" {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		_, _ = w.Write([]byte(`{"message": "This endpoint should be called as a post for authorization"}`))
		return
	}
	if r.Method == "POST" {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		_, _ = w.Write([]byte(`{"message": "You are authorized to call this endpoint"}`))
		return
	}
}
