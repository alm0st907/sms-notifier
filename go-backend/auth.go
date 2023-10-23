package main

import (
	"github.com/clerkinc/clerk-sdk-go/clerk"
	"net/http"
	"strings"
)

func NewAuthMiddleware(client clerk.Client) func(http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			sessionToken := r.Header.Get("Authorization")
			sessionToken = strings.TrimPrefix(sessionToken, "Bearer ")
			stuff, err := client.VerifyToken(sessionToken)
			if err != nil {
				w.WriteHeader(http.StatusUnauthorized)
				return
			}
			user, _ := client.Users().Read(stuff.Claims.Subject)
			println(user.FirstName)
			println(user.EmailAddresses[0].EmailAddress)
			next.ServeHTTP(w, r)
		})
	}
}
