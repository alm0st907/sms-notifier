package main

import (
	"github.com/clerkinc/clerk-sdk-go/clerk"
	"github.com/gorilla/mux"
	"github.com/rs/cors"
	"log"
	"net/http"
	"os"
)

func main() {

	//this is how a dependency is injected
	clerkSecret := os.Getenv("CLERK_SECRET")
	client, _ := clerk.NewClient(clerkSecret)
	println("Clerk client created")

	r := mux.NewRouter()
	r.HandleFunc("/health", HealthCheckHandler).Methods("GET", "POST")
	//inject the client in the use statement via the wrapper
	r.Use(NewAuthMiddleware(client))
	r.Use(NewLogggingMiddleware("test"))

	c := cors.New(cors.Options{
		AllowedOrigins:   []string{"http://localhost:5173", "http://localhost:8080"},
		AllowCredentials: true,
		AllowedHeaders:   []string{"Authorization", "Content-Type", "Access-Control-Allow-Origin"},
		Debug:            false,
	})

	handler := c.Handler(r)
	log.Fatal(http.ListenAndServe("localhost:8080", handler))
}
