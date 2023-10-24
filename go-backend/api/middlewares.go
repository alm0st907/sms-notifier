package handler

import "net/http"

func middleware1(w http.ResponseWriter, r *http.Request) {
	println("PUT CALL PUTS LOGS")
	//randomly return unauthorized
	if r.Method == "PUT" {
		w.WriteHeader(http.StatusUnauthorized)
		return
	}
	w.WriteHeader(http.StatusOK)
}

func Middlewares(w http.ResponseWriter, r *http.Request) {
	if r.Method == "GET" {
		w.Header().Set("Content-Type", "application/json")
		_, _ = w.Write([]byte(`{"message": "This endpoint should be called as a post for authorization"}`))
		return
	}
	if r.Method == "POST" {
		w.Header().Set("Content-Type", "application/json")
		_, _ = w.Write([]byte(`{"message": "You are authorized to call this endpoint"}`))
		return
	}
	if r.Method == "PUT" {
		middleware1(w, r)
		w.Header().Set("Content-Type", "application/json")
		_, _ = w.Write([]byte(`{"message": "You did a put on the endpoint and we intercepted the stuff"}`))
		return
	}
}
