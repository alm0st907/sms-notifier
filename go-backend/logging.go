package main

import (
	"bytes"
	"io"
	"log"
	"net/http"
)

func NewLogggingMiddleware(msg string) func(http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		//this is whats actually run so put the client within that.
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			// Do stuff here
			log.Println(msg)
			log.Println(r.RequestURI)
			log.Println(r.Method)
			body, _ := io.ReadAll(r.Body)
			log.Println(string(body))
			//write body back to request
			r.Body = io.NopCloser(bytes.NewBuffer(body))
			// Call the next handler, which can be another middleware in the chain, or the final handler.
			next.ServeHTTP(w, r)
		})
	}
}
